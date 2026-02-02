import { useState, useEffect, useRef } from "react";
import techStacks from "../techStacks.json";
import { FaStar, FaSearchengin, FaRegStar } from "react-icons/fa";
import {
  FaAws, FaReact, FaChartBar, FaRProject, FaGoogle, FaFolder, FaFolderOpen
} from "react-icons/fa";
import GoogleGeminiIcon from "./icons/GoogleGeminiIcon";
import { TbSearch } from "react-icons/tb";
import {
  SiMongodb, SiMysql, SiFlask, SiFastapi, SiPostgresql, SiTailwindcss,
  SiGooglesheets, SiApacheairflow, SiPython, SiGithubpages, SiGooglecloud,
  SiOpenai
} from "react-icons/si";
import { VscAzure } from "react-icons/vsc";
import { PiFileSql, PiMicrosoftExcelLogoFill } from "react-icons/pi";
import FloatingCode from "./FloatingCode";

const icons = {
  FaAws, FaReact, FaChartBar, FaRProject, FaGoogle,
  SiMongodb, SiMysql, SiFlask, SiFastapi, SiPostgresql, SiTailwindcss,
  SiGooglesheets, SiApacheairflow, SiPython, SiGithubpages,
  VscAzure, PiFileSql, PiMicrosoftExcelLogoFill, SiGooglecloud,
  SiOpenai, GoogleGeminiIcon, TbSearch, FaSearchengin
};

// Folder emoji mapping for categories
const folderEmojis = {
  "ai-api": "🧠",
  "web": "🌐",
  "data-analytics": "📊",
  "data-eng": "🔧",
  "deploy": "🚀"
};

const TechStackShowcase = () => {
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [runningApps, setRunningApps] = useState([]);
  const [showAppModal, setShowAppModal] = useState(null);
  const [windowPosition, setWindowPosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);
  const [techCategories, setTechCategories] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    setTechCategories(techStacks);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleFolderClick = (categoryId) => {
    setSelectedFolder(selectedFolder === categoryId ? null : categoryId);
  };

  const handleAppClick = (tech) => {
    if (!runningApps.find(app => app.name === tech.name)) {
      setRunningApps([...runningApps, tech]);
    }
    setShowAppModal(tech);
  };

  const closeAppModal = () => {
    setShowAppModal(null);
  };

  const closeApp = (techName) => {
    setRunningApps(runningApps.filter(app => app.name !== techName));
    if (showAppModal?.name === techName) {
      setShowAppModal(null);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="text-yellow-400 text-sm" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-gray-500 text-sm" />);
      }
    }
    return stars;
  };

  const selectedCategory = techCategories.find(cat => cat.id === selectedFolder);

  return (
    <div id="tech-stacks" ref={sectionRef} className="py-12 relative overflow-hidden min-h-screen" style={{
      background: 'linear-gradient(180deg, #0f172a 0%, #1e1b4b 50%, #1e3a5f 100%)',
    }}>
      {/* Floating code background */}
      <FloatingCode density={10} speed={0.5} opacity={0.08} />

      {/* OS Window Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>

          {/* OS Window Frame */}
          <div className="bg-slate-900/90 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl shadow-purple-500/10 overflow-hidden">

            {/* Window Title Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-800/80 border-b border-white/10">
              <div className="flex items-center gap-2">
                {/* Traffic lights */}
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 cursor-pointer transition-colors"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 cursor-pointer transition-colors"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 cursor-pointer transition-colors"></div>
                </div>
                {/* Path */}
                <span className="ml-4 text-gray-400 text-sm font-mono">
                  <span className="text-purple-400">~/</span>lemuel<span className="text-cyan-400">/</span>skills
                </span>
              </div>
              <div className="text-gray-500 text-xs font-mono">
                {currentTime.toLocaleTimeString()}
              </div>
            </div>

            {/* Window Content */}
            <div className="p-6">
              {/* Section Header */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2 font-mono">
                  <span className="text-purple-400">&lt;</span>
                  TechStacks
                  <span className="text-purple-400">/&gt;</span>
                </h2>
                <p className="text-gray-400 text-sm font-mono">
                  // Double-click folders to explore • Click apps to launch
                </p>
              </div>

              {/* Desktop Grid - Folders */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 mb-8">
                {techCategories.map((category, index) => (
                  <div
                    key={category.id}
                    className={`flex flex-col items-center p-4 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105 group ${selectedFolder === category.id
                        ? 'bg-purple-500/20 border border-purple-400/30'
                        : 'hover:bg-white/5'
                      }`}
                    onClick={() => handleFolderClick(category.id)}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Folder Icon */}
                    <div className="relative mb-2">
                      {selectedFolder === category.id ? (
                        <FaFolderOpen className="text-5xl text-yellow-400 drop-shadow-lg transition-all duration-300" />
                      ) : (
                        <FaFolder className="text-5xl text-yellow-500 group-hover:text-yellow-400 drop-shadow-lg transition-all duration-300" />
                      )}
                      {/* Category emoji badge */}
                      <span className="absolute -top-1 -right-1 text-lg">
                        {folderEmojis[category.id]}
                      </span>
                    </div>
                    {/* Folder name */}
                    <span className="text-xs text-center text-gray-300 group-hover:text-white font-medium transition-colors line-clamp-2">
                      {category.title.split(" ").slice(1).join(" ")}
                    </span>
                    {/* Item count badge */}
                    <span className="mt-1 px-2 py-0.5 text-[10px] rounded-full bg-white/10 text-gray-400">
                      {category.technologies.length} apps
                    </span>
                  </div>
                ))}
              </div>

              {/* Apps Window (shown when folder is selected) */}
              {selectedCategory && (
                <div className="bg-slate-800/50 rounded-xl border border-white/10 overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
                  {/* Apps Window Title Bar */}
                  <div className="flex items-center justify-between px-4 py-2 bg-slate-700/50 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <FaFolderOpen className="text-yellow-400" />
                      <span className="text-gray-300 text-sm font-mono">{selectedCategory.title}</span>
                    </div>
                    <button
                      onClick={() => setSelectedFolder(null)}
                      className="text-gray-400 hover:text-white transition-colors text-lg"
                    >
                      ×
                    </button>
                  </div>

                  {/* Apps Grid */}
                  <div className="p-6 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                    {selectedCategory.technologies.map((tech, index) => (
                      <div
                        key={tech.name}
                        className="flex flex-col items-center p-3 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-110 hover:bg-white/10 group"
                        onClick={() => handleAppClick(tech)}
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        {/* App Icon */}
                        <div className={`text-4xl mb-2 p-3 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 group-hover:border-purple-400/30 group-hover:shadow-lg group-hover:shadow-purple-500/20 transition-all duration-300 ${tech.color}`}>
                          {icons[tech.icon] && icons[tech.icon]({ className: "" })}
                        </div>
                        {/* App name */}
                        <span className="text-[11px] text-center text-gray-400 group-hover:text-white font-medium transition-colors line-clamp-2">
                          {tech.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Show All Apps (when no folder selected) */}
              {!selectedFolder && (
                <div className="text-center py-8">
                  <p className="text-gray-500 text-sm font-mono animate-pulse">
                    {">"} Select a folder to view applications...
                  </p>
                </div>
              )}
            </div>

            {/* Dock / Taskbar */}
            <div className="px-4 py-3 bg-slate-800/80 border-t border-white/10">
              <div className="flex items-center justify-center gap-2">
                {runningApps.length > 0 ? (
                  runningApps.map((app) => (
                    <div
                      key={app.name}
                      className="relative group"
                    >
                      <div
                        className={`p-2 rounded-lg bg-white/10 border border-white/20 cursor-pointer transition-all duration-300 hover:bg-white/20 ${app.color}`}
                        onClick={() => setShowAppModal(app)}
                      >
                        {icons[app.icon] && icons[app.icon]({ className: "text-2xl" })}
                      </div>
                      {/* Running indicator */}
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan-400"></div>
                      {/* Close on hover */}
                      <button
                        className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                        onClick={(e) => { e.stopPropagation(); closeApp(app.name); }}
                      >
                        ×
                      </button>
                    </div>
                  ))
                ) : (
                  <span className="text-gray-500 text-xs font-mono">No running applications</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* App Modal */}
      {showAppModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={closeAppModal}>
          <div
            className="bg-slate-900 border border-white/20 rounded-xl shadow-2xl shadow-purple-500/20 max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Title Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className={`text-2xl ${showAppModal.color}`}>
                  {icons[showAppModal.icon] && icons[showAppModal.icon]({ className: "" })}
                </div>
                <span className="text-white font-medium">{showAppModal.name}</span>
              </div>
              <button
                onClick={closeAppModal}
                className="text-gray-400 hover:text-white transition-colors text-xl"
              >
                ×
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="flex items-center justify-center mb-4">
                <div className={`text-6xl p-4 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 ${showAppModal.color}`}>
                  {icons[showAppModal.icon] && icons[showAppModal.icon]({ className: "" })}
                </div>
              </div>

              <h3 className="text-xl font-bold text-white text-center mb-2">{showAppModal.name}</h3>

              {/* Skill Rating */}
              <div className="flex items-center justify-center gap-1 mb-4">
                <span className="text-gray-400 text-sm mr-2">Proficiency:</span>
                {renderStars(showAppModal.rating)}
              </div>

              {/* Terminal-style info */}
              <div className="bg-slate-800 rounded-lg p-4 font-mono text-sm">
                <p className="text-gray-400">
                  <span className="text-green-400">$</span> skill --info {showAppModal.name.toLowerCase().replace(/\s+/g, '-')}
                </p>
                <p className="text-cyan-400 mt-2">
                  {">"} Rating: {showAppModal.rating}/5 ⭐
                </p>
                <p className="text-purple-400">
                  {">"} Status: Active in portfolio
                </p>
              </div>

              <button
                onClick={closeAppModal}
                className="w-full mt-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
              >
                Close Application
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TechStackShowcase;
