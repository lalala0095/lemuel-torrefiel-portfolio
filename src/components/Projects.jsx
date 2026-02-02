import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FloatingCode from "./FloatingCode";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [expandedTree, setExpandedTree] = useState(true);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`${import.meta.env.VITE_BACKEND_URL}/projects`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch projects");
        return res.json();
      })
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // File extension based on project type
  const getFileExtension = (type) => {
    const extensions = {
      'AI': '.py',
      'Data Analytics': '.ipynb',
      'Data Engineering': '.sql',
      'Web Development': '.jsx',
      'Automation': '.py',
      'default': '.js'
    };
    return extensions[type] || extensions.default;
  };

  // File icon based on extension
  const getFileIcon = (type) => {
    const icons = {
      'AI': '🐍',
      'Data Analytics': '📊',
      'Data Engineering': '🗄️',
      'Web Development': '⚛️',
      'Automation': '🤖',
      'default': '📄'
    };
    return icons[type] || icons.default;
  };

  if (loading) return (
    <div className="min-h-[400px] flex items-center justify-center bg-slate-900">
      <div className="text-center font-mono">
        <div className="text-green-400 mb-2">$ loading projects...</div>
        <div className="flex items-center gap-2 text-gray-400">
          <div className="w-4 h-4 border-2 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
          Fetching from API...
        </div>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-[400px] flex items-center justify-center bg-slate-900 font-mono">
      <div className="text-red-400">
        <span className="text-white">$</span> Error: {error}
      </div>
    </div>
  );

  return (
    <section id="projects" className="py-12 scroll-mt-5 relative overflow-hidden min-h-screen" style={{
      background: 'linear-gradient(180deg, #1e3a5f 0%, #0f172a 50%, #1a1a3e 100%)',
    }}>
      {/* Floating code background */}
      <FloatingCode density={8} speed={0.4} opacity={0.06} />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* IDE Window Frame */}
        <div className="bg-slate-900/90 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl shadow-purple-500/10 overflow-hidden">

          {/* IDE Title Bar */}
          <div className="flex items-center justify-between px-4 py-2 bg-slate-800/80 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="ml-4 text-gray-400 text-sm font-mono">
                <span className="text-purple-400">~/</span>projects<span className="text-cyan-400">/</span>
              </span>
            </div>
            <div className="text-gray-500 text-xs font-mono">
              {projects.length} files
            </div>
          </div>

          {/* IDE Content */}
          <div className="flex flex-col lg:flex-row">

            {/* File Explorer Sidebar */}
            <div className="lg:w-64 bg-slate-800/50 border-b lg:border-b-0 lg:border-r border-white/10 p-4">
              <div className="text-gray-500 text-xs font-mono uppercase tracking-wider mb-3 flex items-center justify-between">
                <span>Explorer</span>
                <span className="text-purple-400">⟳</span>
              </div>

              {/* Project Tree */}
              <div className="font-mono text-sm">
                <button
                  onClick={() => setExpandedTree(!expandedTree)}
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors w-full text-left mb-2"
                >
                  <span className={`text-xs transition-transform ${expandedTree ? 'rotate-90' : ''}`}>▶</span>
                  <span className="text-yellow-400">📁</span>
                  <span>projects</span>
                </button>

                {expandedTree && (
                  <div className="ml-4 space-y-1 border-l border-white/10 pl-3">
                    {projects.map((project, index) => (
                      <button
                        key={project.id || index}
                        onClick={() => setSelectedProject(project)}
                        className={`flex items-center gap-2 py-1 px-2 rounded text-left w-full transition-all duration-200 ${selectedProject?.id === project.id
                            ? 'bg-purple-500/20 text-white'
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                          }`}
                      >
                        <span>{getFileIcon(project.type)}</span>
                        <span className="truncate text-xs">
                          {project.title?.toLowerCase().replace(/\s+/g, '_').slice(0, 20)}{getFileExtension(project.type)}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-6">
              {/* Section Header */}
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-white mb-2 font-mono">
                  <span className="text-gray-500">{"// "}</span>
                  <span className="text-purple-400">My</span> Projects
                </h2>
                <p className="text-gray-500 text-sm font-mono">
                  {"/* "} Click on a file to view details {" */"}
                </p>
              </div>

              {/* Projects Grid - Code Card Style */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((project, index) => (
                  <div
                    key={project.id || index}
                    className={`bg-slate-800/50 rounded-lg border overflow-hidden transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/10 group cursor-pointer ${selectedProject?.id === project.id
                        ? 'border-purple-400/50 shadow-lg shadow-purple-500/20'
                        : 'border-white/10 hover:border-white/20'
                      }`}
                    onClick={() => setSelectedProject(project)}
                  >
                    {/* Code Window Title Bar */}
                    <div className="flex items-center justify-between px-3 py-2 bg-slate-700/50 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{getFileIcon(project.type)}</span>
                        <span className="text-gray-300 text-xs font-mono truncate">
                          {project.title?.toLowerCase().replace(/\s+/g, '_')}{getFileExtension(project.type)}
                        </span>
                      </div>
                      <div className="flex gap-1">
                        <span className="w-2 h-2 rounded-full bg-white/20"></span>
                        <span className="w-2 h-2 rounded-full bg-white/20"></span>
                      </div>
                    </div>

                    {/* Project Image */}
                    {project.id && (
                      <Link to={`/projects/${project.id}`} className="block">
                        <div className="relative overflow-hidden">
                          <img
                            src={project.thumbnail || project.image}
                            alt={project.title}
                            className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
                        </div>
                      </Link>
                    )}

                    {/* Code-style Content */}
                    <div className="p-4 font-mono text-sm">
                      {/* Line numbers style */}
                      <div className="space-y-1">
                        <div className="flex gap-3">
                          <span className="text-gray-600 text-xs w-4">1</span>
                          <span>
                            <span className="text-purple-400">const</span>
                            <span className="text-cyan-400"> project</span>
                            <span className="text-white"> = {"{"}</span>
                          </span>
                        </div>
                        <div className="flex gap-3">
                          <span className="text-gray-600 text-xs w-4">2</span>
                          <span className="ml-4">
                            <span className="text-gray-400">name:</span>
                            <span className="text-green-400"> "{project.title}"</span>
                          </span>
                        </div>
                        <div className="flex gap-3">
                          <span className="text-gray-600 text-xs w-4">3</span>
                          <span className="ml-4">
                            <span className="text-gray-400">type:</span>
                            <span className="text-yellow-400"> "{project.type}"</span>
                          </span>
                        </div>
                        <div className="flex gap-3">
                          <span className="text-gray-600 text-xs w-4">4</span>
                          <span className="text-white">{"}"};</span>
                        </div>
                      </div>

                      {/* Company badge */}
                      <div className="mt-3 pt-3 border-t border-white/10">
                        <span className="text-xs text-gray-500">
                          {"// "}{project.company_name}
                        </span>
                      </div>

                      {/* Type badge */}
                      <div className="mt-2">
                        <span className="inline-block px-2 py-1 text-xs rounded bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-400/20 text-purple-300 font-medium">
                          {project.type}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Disclaimer - Comment style */}
              <div className="mt-8 p-4 bg-slate-800/30 rounded-lg border border-white/5 font-mono text-sm">
                <p className="text-gray-500">
                  <span className="text-green-400">{"/**"}</span><br />
                  <span className="text-gray-400 ml-2">* Due to data confidentiality and privacy,</span><br />
                  <span className="text-gray-400 ml-2">* some projects cannot be displayed publicly.</span><br />
                  <span className="text-gray-400 ml-2">* Contact me for more details.</span><br />
                  <span className="text-green-400">{"*/"}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
