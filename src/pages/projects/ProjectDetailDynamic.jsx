import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const ProjectDetailDynamic = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`${import.meta.env.VITE_BACKEND_URL}/projects/${projectId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Project not found");
        return res.json();
      })
      .then((data) => {
        setProject(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [projectId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectId]);

  const openModal = (index) => {
    setCurrentIndex(index);
    setSelectedImage(project.gallery[index]);
  };

  const closeModal = () => setSelectedImage(null);

  const nextImage = () => {
    const newIndex = (currentIndex + 1) % project.gallery.length;
    setCurrentIndex(newIndex);
    setSelectedImage(project.gallery[newIndex]);
  };

  const prevImage = () => {
    const newIndex = (currentIndex - 1 + project.gallery.length) % project.gallery.length;
    setCurrentIndex(newIndex);
    setSelectedImage(project.gallery[newIndex]);
  };

  const getYouTubeEmbedUrl = (url) => {
    try {
      const parsedUrl = new URL(url);
      const hostname = parsedUrl.hostname;

      if (hostname.includes("youtube.com")) {
        return `https://www.youtube.com/embed/${parsedUrl.searchParams.get("v")}`;
      }

      if (hostname.includes("youtu.be")) {
        return `https://www.youtube.com/embed/${parsedUrl.pathname.slice(1)}`;
      }

      return null;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    if (!selectedImage) return;
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight') nextImage();
      else if (event.key === 'ArrowLeft') prevImage();
      else if (event.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    if (project) console.log("Fetched project:", project);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, selectedImage, nextImage, prevImage]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{
      background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #0f172a 100%)',
    }}>
      <p className="text-gray-300 text-lg">Loading...</p>
    </div>
  );
  if (error) return (
    <div className="min-h-screen flex items-center justify-center" style={{
      background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #0f172a 100%)',
    }}>
      <p className="text-red-400 text-lg">{error}</p>
    </div>
  );
  if (!project) return null;

  return (
    <div className="min-h-screen py-24 px-6 relative overflow-hidden" style={{
      background: 'linear-gradient(180deg, #0f0f23 0%, #1a1a3e 25%, #1e3a5f 50%, #1a1a3e 75%, #0f172a 100%)',
    }}>
      {/* Background glow effects */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 text-white">{project.title}</h2>

        <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-8 space-y-8">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-60 object-cover rounded-xl border border-white/10"
          />

          <div>
            <h3 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
              <span className="text-cyan-400">📋</span> Overview
            </h3>
            <p className="text-gray-300 leading-relaxed">{project.description}</p>
          </div>

          {project.deployed_link && (
            <div>
              <h3 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
                <span className="text-cyan-400">🔗</span> Deployed Link
              </h3>
              <a className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300 break-all" href={project.deployed_link} target="_blank" rel="noopener noreferrer">{project.deployed_link}</a>
            </div>
          )}

          {project.challenge && (
            <div>
              <h3 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
                <span className="text-purple-400">🎯</span> Challenge
              </h3>
              <p className="text-gray-300 leading-relaxed">{project.challenge}</p>
            </div>
          )}

          {project.approach && (
            <div>
              <h3 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
                <span className="text-pink-400">💡</span> Approach
              </h3>
              <p className="text-gray-300 leading-relaxed">{project.approach}</p>
            </div>
          )}

          {/* Impact Section */}
          {project.impact && (
            <div>
              <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                <span className="text-green-400">📈</span> Impact
              </h3>
              <ul className="space-y-2">
                {Object.entries(project.impact).map(([key, value]) => (
                  <li key={key} className="text-gray-300 flex items-start gap-2">
                    <span className="text-green-400">✅</span>
                    <span><strong className="text-white">{key}:</strong> {value}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Youtube Video Section */}
          {project.video_url && getYouTubeEmbedUrl(project.video_url) && (
            <div>
              <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                <span className="text-red-400">🎬</span> Demo Video
              </h3>
              <div className="rounded-xl overflow-hidden border border-white/10 shadow-2xl shadow-purple-500/10">
                <iframe
                  className="w-full h-64 md:h-96"
                  src={getYouTubeEmbedUrl(project.video_url)}
                  title="Demo Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}

          {/* Gallery Section */}
          {project.gallery && project.gallery.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                <span className="text-yellow-400">🖼️</span> Gallery
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {project.gallery.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Screenshot ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg border border-white/10 cursor-pointer hover:opacity-80 hover:border-purple-400/50 transition-all duration-300"
                    onClick={() => openModal(index)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* PDF Section */}
          {project.pdf_links && project.pdf_links.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                <span className="text-orange-400">📄</span> Project PDFs
              </h3>
              <ul className="mb-4 space-y-2">
                {project.pdf_links.map((pdf, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-gray-300">
                    <span className="truncate">{pdf.split('/').pop()}</span>
                    <a
                      href={pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300 ml-2"
                    >
                      View
                    </a>
                  </li>
                ))}
              </ul>
              {/* Optionally embed the first PDF */}
              <div className="w-full h-96 rounded-xl overflow-hidden border border-white/10">
                <iframe
                  src={project.pdf_links[0]}
                  title="PDF Preview"
                  className="w-full h-full bg-white"
                ></iframe>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50">
          <button className="absolute top-4 right-4 text-white hover:text-purple-400 transition-colors duration-300" onClick={closeModal}><X size={32} /></button>
          <button className="absolute left-4 text-white hover:text-purple-400 transition-colors duration-300" onClick={prevImage}><ChevronLeft size={48} /></button>
          <img src={selectedImage} alt="Enlarged Screenshot" className="max-w-full max-h-[80vh] rounded-xl shadow-2xl border border-white/10" />
          <button className="absolute right-4 text-white hover:text-purple-400 transition-colors duration-300" onClick={nextImage}><ChevronRight size={48} /></button>
        </div>
      )}
    </div>
  );
};

export default ProjectDetailDynamic;
