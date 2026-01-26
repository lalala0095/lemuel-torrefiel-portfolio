import { useEffect, useState } from 'react';

const Hero = ({ isOpen }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      id="home"
      className={`relative flex flex-col-reverse md:flex-row items-center justify-center min-h-screen text-center md:text-left px-4 sm:px-6 lg:px-12 transition-all duration-500 overflow-hidden ${isOpen ? "pt-32" : "pt-20"
        }`}
      style={{
        background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a3e 25%, #2d1b4e 50%, #1e3a5f 75%, #0f172a 100%)',
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Content container */}
      <div
        className={`relative z-10 max-w-2xl flex flex-col items-center md:items-start transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
      >
        {/* AI Badge */}
        <div className="mb-6 px-4 py-2 rounded-full border border-purple-400/30 bg-purple-500/10 backdrop-blur-sm">
          <span className="text-sm font-medium text-purple-300 flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-7-5zm0 2.18l5 3.57v4.93c0 4.12-2.86 7.99-5 8.89-2.14-.9-5-4.77-5-8.89V7.75l5-3.57z" />
            </svg>
            AI Specialist | Data Engineer | Data Analyst
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          <span className="text-white">Hi, I'm </span>
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-gradient">
            Lemuel
          </span>
        </h1>

        <h2 className="mt-4 text-2xl md:text-3xl lg:text-4xl font-semibold text-white/90">
          Building the Future with{' '}
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            AI-Powered Solutions
          </span>
        </h2>

        <p className="mt-6 text-lg md:text-xl text-gray-300/90 leading-relaxed max-w-xl">
          Transforming complex data into intelligent applications. I specialize in{' '}
          <span className="text-cyan-400 font-medium">Data Analytics</span>,{' '}
          <span className="text-purple-400 font-medium">AI Integration</span>, and{' '}
          <span className="text-pink-400 font-medium">Data Engineering</span> to create
          solutions that think, learn, and adapt.
        </p>

        {/* Tech stack pills */}
        <div className="mt-6 flex flex-wrap gap-2 justify-center md:justify-start">
          {['Python', 'OpenAI', 'Google Gemini', 'SQL', 'RAG'].map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-sm font-medium text-gray-300 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-wrap justify-center md:justify-start gap-4">
          <a
            href="/Lemuel-Torrefiel-CV.pdf"
            download="Lemuel-Torrefiel-CV.pdf"
            className="group relative px-8 py-4 font-semibold text-white rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
            style={{
              background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 50%, #3b82f6 100%)',
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download CV
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </a>
          <a
            href="/Lemuel-Torrefiel-Portfolio.pdf"
            download="Lemuel-Torrefiel-Portfolio.pdf"
            className="group px-8 py-4 font-semibold text-white rounded-xl border-2 border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/40 hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            View Portfolio
          </a>
        </div>
      </div>

      {/* Profile Image with glow effect */}
      <div
        className={`relative z-10 mb-8 md:mb-0 md:ml-12 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-full blur-2xl opacity-40 animate-pulse"></div>
        <div className="relative w-56 md:w-72 lg:w-80 h-56 md:h-72 lg:h-80 rounded-full p-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500">
          <div className="w-full h-full overflow-hidden rounded-full bg-gray-900">
            <img
              src="/profile.png"
              alt="Lemuel Torrefiel"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white/50 animate-bounce">
        <span className="text-xs mb-2">Scroll to explore</span>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
