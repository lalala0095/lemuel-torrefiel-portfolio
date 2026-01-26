import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const ProjectDetail = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    fetch("/public/projects.json")
      .then((response) => response.json())
      .then((data) => {
        const foundProject = data.find((p) => p.id === projectId);
        setProject(foundProject);
      })
      .catch((error) => console.error("Error loading project:", error));
  }, [projectId]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{
        background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #0f172a 100%)',
      }}>
        <p className="text-gray-300 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24 px-6 relative overflow-hidden" style={{
      background: 'linear-gradient(180deg, #0f0f23 0%, #1a1a3e 25%, #1e3a5f 50%, #1a1a3e 75%, #0f172a 100%)',
    }}>
      {/* Background glow */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{project.title}</h2>
        <p className="text-gray-400 text-lg mb-8">{project.description}</p>

        <div className="space-y-8">
          <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl p-6">
            <h3 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-cyan-400">🔗</span> Deployed URL
            </h3>
            <a href={project.deployed_link} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300 break-all">
              {project.deployed_link}
            </a>
          </div>

          <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl p-6">
            <h3 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-purple-400">🎯</span> The Challenge
            </h3>
            <p className="text-gray-300 leading-relaxed">{project.challenge}</p>
          </div>

          <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl p-6">
            <h3 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-pink-400">💡</span> My Approach
            </h3>
            <p className="text-gray-300 leading-relaxed">{project.approach}</p>
          </div>

          <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl p-6">
            <h3 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-green-400">📈</span> Impact
            </h3>
            <ul className="space-y-2">
              {Object.entries(project.impact).map(([key, value]) => (
                <li key={key} className="text-gray-300 flex items-start gap-2">
                  <span className="text-green-400">✅</span> {value}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {project.video && (
          <div className="mt-8 rounded-xl overflow-hidden shadow-2xl shadow-purple-500/20 border border-white/10">
            <iframe
              width="100%"
              height="400"
              src={project.video}
              title={project.title}
              allowFullScreen
              className="bg-black"
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;
