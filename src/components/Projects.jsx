import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <div className="text-center py-10 text-gray-300 bg-slate-900">Loading projects...</div>;
  if (error) return <div className="text-center py-10 text-red-400 bg-slate-900">{error}</div>;

  return (
    <section id="projects" className="py-20 scroll-mt-5 relative overflow-hidden" style={{
      background: 'linear-gradient(180deg, #1e3a5f 0%, #0f172a 50%, #1a1a3e 100%)',
    }}>
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <h2 className="text-4xl font-bold text-center mb-4 text-white">My Projects</h2>
        <p className="text-gray-400 text-center mb-10 max-w-3xl mx-auto">
          Due to data confidentiality and data privacy, I have not been able to display the projects that benefited my former and existing clients. I may be able to talk about it in a separate meeting and give my prospects a brief description of those projects.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div key={project.id || index} className="bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 transform hover:-translate-y-1 group">
              {project.id && (
                <Link
                  to={`/projects/${project.id}`}
                  className="block mb-4"
                >
                  <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300">{project.title}</h3>
                </Link>
              )}
              {project.id ? (
                <Link to={`/projects/${project.id}`}>
                  <img
                    src={project.thumbnail || project.image}
                    alt={project.title}
                    className="w-full h-40 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity duration-300"
                  />
                </Link>
              ) : (
                <img
                  src={project.thumbnail || project.image}
                  alt={project.title}
                  className="w-full h-40 object-cover rounded-lg"
                />
              )}
              <p className="text-sm text-gray-400 mt-3">{project.company_name}</p>
              <span className="inline-block bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-xs px-3 py-1 rounded-full mt-2">
                {project.type}
              </span>
              <p className="text-gray-300 mt-3 line-clamp-3">{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
