import { useEffect, useState } from 'react';
import TypeWriter from './TypeWriter';
import MatrixRain from './MatrixRain';

const Hero = ({ isOpen }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [commandIndex, setCommandIndex] = useState(0);
  const [showOutput, setShowOutput] = useState([false, false, false, false]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Sequential command typing
  useEffect(() => {
    if (commandIndex < 4) {
      const timer = setTimeout(() => {
        const newShowOutput = [...showOutput];
        newShowOutput[commandIndex] = true;
        setShowOutput(newShowOutput);
        setCommandIndex(prev => prev + 1);
      }, 1500 + commandIndex * 1200);
      return () => clearTimeout(timer);
    }
  }, [commandIndex]);

  return (
    <section
      id="home"
      className={`relative flex flex-col-reverse md:flex-row items-center justify-center min-h-screen text-center md:text-left px-4 sm:px-6 lg:px-12 transition-all duration-500 overflow-hidden ${isOpen ? "pt-32" : "pt-20"
        }`}
      style={{
        background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a3e 25%, #2d1b4e 50%, #1e3a5f 75%, #0f172a 100%)',
      }}
    >
      {/* Matrix Rain Background */}
      <MatrixRain opacity={0.06} speed={0.8} />

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
        {/* Terminal Window */}
        <div className="w-full bg-slate-900/90 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl shadow-purple-500/20 overflow-hidden mb-6">
          {/* Terminal Title Bar */}
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/80 border-b border-white/10">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="ml-3 text-gray-400 text-sm font-mono">lemuel@portfolio:~</span>
          </div>

          {/* Terminal Content */}
          <div className="p-4 md:p-6 font-mono text-sm md:text-base space-y-3">
            {/* Command 1: whoami */}
            <div>
              <span className="text-green-400">$</span>
              <span className="text-gray-300 ml-2">whoami</span>
            </div>
            {showOutput[0] && (
              <div className="text-cyan-400 animate-in fade-in slide-in-from-left-2 duration-300">
                {">"} <span className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">Lemuel Torrefiel</span>
              </div>
            )}

            {/* Command 2: cat role.txt */}
            {commandIndex >= 1 && (
              <div className="mt-4">
                <span className="text-green-400">$</span>
                <span className="text-gray-300 ml-2">cat role.txt</span>
              </div>
            )}
            {showOutput[1] && (
              <div className="flex items-center gap-2 text-purple-400 animate-in fade-in slide-in-from-left-2 duration-300">
                <span>{">"}</span>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-purple-500/20 border border-purple-400/30 rounded text-xs md:text-sm">🧠 AI Specialist</span>
                  <span className="px-2 py-1 bg-cyan-500/20 border border-cyan-400/30 rounded text-xs md:text-sm text-cyan-400">⚙️ Data Engineer</span>
                  <span className="px-2 py-1 bg-pink-500/20 border border-pink-400/30 rounded text-xs md:text-sm text-pink-400">📊 Data Analyst</span>
                </div>
              </div>
            )}

            {/* Command 3: export SKILLS */}
            {commandIndex >= 2 && (
              <div className="mt-4">
                <span className="text-green-400">$</span>
                <span className="text-yellow-400 ml-2">export</span>
                <span className="text-gray-300 ml-1">SKILLS=</span>
                <span className="text-cyan-400">"Python, OpenAI, Gemini, SQL, RAG"</span>
              </div>
            )}
            {showOutput[2] && (
              <div className="text-gray-400 animate-in fade-in slide-in-from-left-2 duration-300">
                {">"} <span className="text-green-400">✓</span> Environment variable set
              </div>
            )}

            {/* Command 4: ./start_portfolio.sh */}
            {commandIndex >= 3 && (
              <div className="mt-4">
                <span className="text-green-400">$</span>
                <span className="text-gray-300 ml-2">./initialize_portfolio.sh</span>
              </div>
            )}
            {showOutput[3] && (
              <div className="animate-in fade-in slide-in-from-left-2 duration-300">
                <div className="flex items-center gap-2 text-gray-300">
                  <span className="text-cyan-400">{">"}</span>
                  <div className="flex-1 bg-slate-700 rounded-full h-2 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 animate-pulse" style={{ width: '100%' }}></div>
                  </div>
                  <span className="text-green-400 text-xs">100%</span>
                </div>
                <p className="text-green-400 mt-2">{">"} Portfolio initialized successfully! ✨</p>
              </div>
            )}
          </div>
        </div>

        {/* Subtitle - outside terminal */}
        <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-xl mb-6 font-mono">
          <span className="text-purple-400">//</span> Transforming complex data into{' '}
          <span className="text-cyan-400 font-medium">intelligent applications</span> that think, learn, and adapt.
        </p>

        {/* CTA Buttons - Terminal Style */}
        <div className="flex flex-wrap justify-center md:justify-start gap-4">
          <a
            href="/Lemuel-Torrefiel-CV.pdf"
            download="Lemuel-Torrefiel-CV.pdf"
            className="group relative px-6 py-3 font-mono text-sm font-medium text-white rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 bg-slate-800 border border-purple-400/30 hover:border-purple-400"
          >
            <span className="relative z-10 flex items-center gap-2">
              <span className="text-green-400">$</span>
              npm run download-cv
              <span className="text-gray-500 group-hover:text-purple-400 transition-colors">↓</span>
            </span>
          </a>
          <a
            href="/Lemuel-Torrefiel-Portfolio.pdf"
            download="Lemuel-Torrefiel-Portfolio.pdf"
            className="group px-6 py-3 font-mono text-sm font-medium text-gray-300 rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-cyan-400/30 hover:text-white hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            <span className="text-green-400">$</span>
            cat portfolio.pdf
            <span className="text-gray-500 group-hover:text-cyan-400 transition-colors">→</span>
          </a>
        </div>
      </div>

      {/* Profile Image with code-style frame */}
      <div
        className={`relative z-10 mb-8 md:mb-0 md:ml-12 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-full blur-2xl opacity-40 animate-pulse"></div>

        {/* Code-style frame */}
        <div className="relative">
          {/* Top code line */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-mono text-gray-500 whitespace-nowrap">
            <span className="text-purple-400">{"<"}</span>
            <span className="text-cyan-400">Developer</span>
            <span className="text-purple-400">{" />"}</span>
          </div>

          <div className="relative w-56 md:w-72 lg:w-80 h-56 md:h-72 lg:h-80 rounded-full p-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500">
            <div className="w-full h-full overflow-hidden rounded-full bg-gray-900 border-4 border-slate-800">
              <img
                src="/profile.png"
                alt="Lemuel Torrefiel"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

          {/* Bottom status */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            <span className="text-gray-400">status: <span className="text-green-400">available</span></span>
          </div>
        </div>
      </div>

      {/* Scroll indicator - terminal style */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white/50">
        <span className="text-xs font-mono mb-2">{"// scroll to explore"}</span>
        <div className="animate-bounce">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
