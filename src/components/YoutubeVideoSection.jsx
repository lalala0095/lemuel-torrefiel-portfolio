import YouTubeVideo from "./YoutubeVideo";

const YouTubeSection = () => {
  return (
    <section id="youtube-section" className="flex flex-col items-center justify-center min-h-screen text-center px-6 py-20 relative overflow-hidden" style={{
      background: 'linear-gradient(180deg, #0f172a 0%, #1a1a3e 50%, #1e1b4b 100%)',
    }}>
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-4xl relative z-10">
        <h2 className="text-4xl font-bold mb-8 text-white">My Video Introduction</h2>
        <div className="rounded-xl overflow-hidden shadow-2xl shadow-purple-500/20 border border-white/10">
          <YouTubeVideo videoId="ZaZvA1BBPlk" />
        </div>
      </div>
    </section>
  );
};

export default YouTubeSection;
