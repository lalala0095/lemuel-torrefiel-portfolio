const Header = ({ isOpen, setIsOpen }) => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-slate-900/80 backdrop-blur-xl border-b border-white/10">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          LT
        </h1>

        <nav className="hidden md:flex space-x-8">
          <a href="#home" className="text-gray-300 hover:text-white font-medium transition-colors duration-300 relative group">
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400 group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="#tech-stacks" className="text-gray-300 hover:text-white font-medium transition-colors duration-300 relative group">
            Tech Stacks
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400 group-hover:w-full transition-all duration-300"></span>
          </a>
          <a
            href="#projects"
            className="text-gray-300 hover:text-white font-medium transition-colors duration-300 relative group"
            onClick={() => {
              const section = document.getElementById('projects');
              if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Projects
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400 group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="#youtube-section" className="text-gray-300 hover:text-white font-medium transition-colors duration-300 relative group">
            Video
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400 group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="#certificates" className="text-gray-300 hover:text-white font-medium transition-colors duration-300 relative group">
            Certificates
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400 group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="#contact" className="text-gray-300 hover:text-white font-medium transition-colors duration-300 relative group">
            Contact
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400 group-hover:w-full transition-all duration-300"></span>
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-xl border-t border-white/10 p-4 space-y-3">
          <a href="#home" className="block py-2 px-4 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300">
            Home
          </a>
          <a href="#tech-stacks" className="block py-2 px-4 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300">
            Tech Stacks
          </a>
          <a
            href="#projects"
            className="block py-2 px-4 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
            onClick={() => {
              const section = document.getElementById('projects');
              if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Projects
          </a>
          <a href="#youtube-section" className="block py-2 px-4 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300">
            Video
          </a>
          <a href="#certificates" className="block py-2 px-4 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300">
            Certificates
          </a>
          <a href="#contact" className="block py-2 px-4 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300">
            Contact
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;
