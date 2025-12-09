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

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;
  if (!project) return null;

  return (
    <div className="container mx-auto px-6 py-10 mt-4">
      <h2 className="text-4xl font-bold text-center mb-6">{project.title}</h2>
      <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-60 object-cover rounded-md"
        />
        <h3 className="text-lg font-semibold text-gray-900 mt-4">Overview</h3>
        <p className="text-gray-700">{project.description}</p>
        {project.deployed_link && (
          <>
            <h3 className="text-lg font-semibold text-gray-900 mt-4">Deployed Link</h3>
            <a className="text-blue-600 underline" href={project.deployed_link} target="_blank" rel="noopener noreferrer">{project.deployed_link}</a>
          </>
        )}
        {project.challenge && (
          <>
            <h3 className="text-lg font-semibold text-gray-900 mt-4">Challenge</h3>
            <p className="text-gray-700">{project.challenge}</p>
          </>
        )}
        {project.approach && (
          <>
            <h3 className="text-lg font-semibold text-gray-900 mt-4">Approach</h3>
            <p className="text-gray-700">{project.approach}</p>
          </>
        )}

        {/* Impact Section */}
        {project.impact && (
          <>
            <h3 className="text-lg font-semibold text-gray-900 mt-4">Impact</h3>
            <ul className="list-disc list-inside text-gray-700">
              {Object.entries(project.impact).map(([key, value]) => (
                <li key={key}><strong>{key}:</strong> {value}</li>
              ))}
            </ul>
          </>
        )}
        
        {/* Youtube Video Section */}
        {project.video_url && getYouTubeEmbedUrl(project.video_url) && (
          <>
            <h3 className="text-lg font-semibold text-gray-900 mt-6">Demo Video</h3>
            <div className="aspect-w-16 aspect-h-9 mt-2">
              <iframe
                className="w-full h-64 md:h-96 rounded-md"
                src={getYouTubeEmbedUrl(project.video_url)}
                title="Demo Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </>
        )}

        {/* Gallery Section */}
        {project.gallery && project.gallery.length > 0 && (
          <>
            <h3 className="text-lg font-semibold text-gray-900 mt-6">Gallery</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {project.gallery.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Screenshot ${index + 1}`}
                  className="w-full h-32 object-cover rounded-md cursor-pointer hover:opacity-80 transition"
                  onClick={() => openModal(index)}
                />
              ))}
            </div>
          </>
        )}

        {/* PDF Section */}
        {project.pdf_links && project.pdf_links.length > 0 && (
          <>
            <h3 className="text-lg font-semibold text-gray-900 mt-6">Project PDFs</h3>
            <ul className="mb-4">
              {project.pdf_links.map((pdf, idx) => (
                <li key={idx} className="mb-2 flex items-center gap-2">
                  <span className="truncate">{pdf.split('/').pop()}</span>
                  <a
                    href={pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline ml-2"
                  >
                    View
                  </a>
                </li>
              ))}
            </ul>
            {/* Optionally embed the first PDF */}
            <div className="w-full h-96 mb-6">
              <iframe
                src={project.pdf_links[0]}
                title="PDF Preview"
                className="w-full h-full border rounded"
              ></iframe>
            </div>
          </>
        )}
      </div>
      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <button className="absolute top-4 right-4 text-white text-3xl" onClick={closeModal}><X /></button>
          <button className="absolute left-4 text-white text-3xl" onClick={prevImage}><ChevronLeft /></button>
          <img src={selectedImage} alt="Enlarged Screenshot" className="max-w-full max-h-[80vh] rounded-lg shadow-lg" />
          <button className="absolute right-4 text-white text-3xl" onClick={nextImage}><ChevronRight /></button>
        </div>
      )}
    </div>
  );
};

export default ProjectDetailDynamic;
