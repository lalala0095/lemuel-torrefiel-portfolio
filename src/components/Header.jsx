import { useState, useEffect } from 'react';
import { FaReact } from 'react-icons/fa';

const Header = ({ isOpen, setIsOpen }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  // Track scroll position to change header style
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section based on scroll
  useEffect(() => {
    const sections = ['home', 'tech-stacks', 'projects', 'youtube-section', 'certificates', 'contact'];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const { offsetTop, offsetHeight } = section;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveTab(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const tabs = [
    { id: 'home', label: 'Home', filename: 'Home.jsx' },
    { id: 'tech-stacks', label: 'Tech Stacks', filename: 'TechStacks.jsx' },
    { id: 'projects', label: 'Projects', filename: 'Projects.jsx' },
    { id: 'youtube-section', label: 'Video', filename: 'Video.jsx' },
    { id: 'certificates', label: 'Certs', filename: 'Certs.jsx' },
    { id: 'contact', label: 'Contact', filename: 'Contact.jsx' },
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    const section = document.getElementById(tabId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    if (isOpen) setIsOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/95 backdrop-blur-xl shadow-lg shadow-purple-500/5' : 'bg-slate-900/80 backdrop-blur-xl'
      } border-b border-white/10`}>

      {/* VS Code style top bar */}
      <div className="hidden md:flex items-center justify-between px-4 py-1 bg-slate-800/50 border-b border-white/5 text-xs font-mono">
        <div className="flex items-center gap-4">
          {/* Traffic lights */}
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80 hover:bg-red-500 cursor-pointer transition-colors"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 hover:bg-yellow-500 cursor-pointer transition-colors"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80 hover:bg-green-500 cursor-pointer transition-colors"></div>
          </div>
          <span className="text-gray-500">
            <span className="text-purple-400">~/</span>lemuel-portfolio
          </span>
        </div>
        <div className="text-gray-500">
          <span className="text-cyan-400">git:</span> main <span className="text-green-400">✓</span>
        </div>
      </div>

      {/* Main nav with tabs */}
      <div className="container mx-auto flex justify-between items-center py-2 px-4">
        {/* Logo as file explorer icon */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 text-gray-400 text-sm font-mono">
            <span className="text-purple-400">{"<"}</span>
            <span className="text-white font-bold text-lg">LT</span>
            <span className="text-purple-400">{"/>"}</span>
          </div>
          {/* Mobile Logo */}
          <h1 className="md:hidden text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            LT
          </h1>
        </div>

        {/* Desktop File Tabs */}
        <nav className="hidden md:flex items-center">
          <div className="flex bg-slate-800/50 rounded-t-lg overflow-hidden">
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`relative group flex items-center gap-2 px-4 py-2 text-sm font-mono transition-all duration-200 ${activeTab === tab.id
                    ? 'bg-slate-900 text-white border-t-2 border-t-purple-400'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-slate-800/50 border-t-2 border-t-transparent'
                  } ${index > 0 ? 'border-l border-white/5' : ''}`}
              >
                {/* React icon for .jsx files */}
                <FaReact className={`text-xs ${activeTab === tab.id ? 'text-cyan-400' : 'text-gray-500 group-hover:text-cyan-400/50'} transition-colors`} />
                <span>{tab.filename}</span>

                {/* Close icon (decorative) */}
                <span className={`ml-1 text-xs opacity-0 group-hover:opacity-50 transition-opacity ${activeTab === tab.id ? 'opacity-50' : ''}`}>
                  ×
                </span>

                {/* Active indicator dot */}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-purple-400"></span>
                )}
              </button>
            ))}
          </div>
        </nav>

        {/* Line numbers indicator (desktop) */}
        <div className="hidden md:flex items-center gap-3 text-xs font-mono text-gray-500">
          <span>Ln 1, Col 1</span>
          <span className="text-purple-400">UTF-8</span>
          <span className="px-2 py-1 bg-purple-500/20 rounded text-purple-300">JSX</span>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-400 text-2xl hover:text-white transition-colors font-mono"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? '×' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-xl border-t border-white/10 animate-in slide-in-from-top duration-200">
          {/* File tree style menu */}
          <div className="p-4 font-mono text-sm">
            <div className="text-gray-500 text-xs mb-3 flex items-center gap-2">
              <span className="text-purple-400">📁</span> EXPLORER
            </div>
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`w-full flex items-center gap-3 py-2 px-3 rounded-lg transition-all duration-200 ${activeTab === tab.id
                    ? 'bg-purple-500/20 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
              >
                <span className="text-gray-600">{String(index + 1).padStart(2, '0')}</span>
                <FaReact className={`text-sm ${activeTab === tab.id ? 'text-cyan-400' : 'text-gray-500'}`} />
                <span>{tab.filename}</span>
              </button>
            ))}
          </div>

          {/* Terminal-style status */}
          <div className="px-4 py-3 bg-slate-800/50 border-t border-white/10 text-xs font-mono text-gray-500">
            <span className="text-green-400">$</span> viewing portfolio...
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
