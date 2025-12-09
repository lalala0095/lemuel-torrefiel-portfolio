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

  if (loading) return <div className="text-center py-10">Loading projects...</div>;
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;

  return (
    <section id="projects" className="py-10 bg-gray-100 scroll-mt-5">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-4xl font-bold text-center mb-2">My Projects</h2>
        <h4 className="text-gray-800 mb-6">
          Due to data confidentiality and data privacy, I have not been able to display the projects that benefited my former and existing clients. I may be able to talk about it in a separate meeting and give my prospects a brief description of those projects.
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div key={project.id || index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              {project.id && (
                <Link
                  to={`/projects/${project.id}`}
                  className="m-4 block bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition hover:bg-green-200"
                >
                  <h3 className="text-xl font-bold">{project.title}</h3>
                </Link>
              )}
              {project.id ? (
                <Link to={`/projects/${project.id}`}>
                  <img
                    src={project.thumbnail || project.image}
                    alt={project.title}
                    className="w-full h-40 object-cover rounded-md cursor-pointer"
                  />
                </Link>
              ) : (
                <img
                  src={project.thumbnail || project.image}
                  alt={project.title}
                  className="w-full h-40 object-cover rounded-md"
                />
              )}
              <p className="text-sm text-gray-600">{project.company_name}</p>
              <span className="inline-block bg-blue-500 text-white text-xs px-2 py-1 rounded-full mt-2">
                {project.type}
              </span>
              <p className="text-gray-700 mt-3">{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
