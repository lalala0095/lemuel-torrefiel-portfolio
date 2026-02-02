const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-white/10 relative" style={{
      background: 'linear-gradient(180deg, #1e1b4b 0%, #0f0f23 100%)',
    }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Terminal-style footer */}
        <div className="font-mono text-sm">
          {/* Command output style */}
          <div className="text-center space-y-2">
            <p className="text-gray-500">
              <span className="text-green-400">$</span> echo "Built with ❤️ by Lemuel Torrefiel"
            </p>
            <p className="text-purple-400">
              {">"} Built with <span className="text-red-400">❤️</span> by{' '}
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent font-bold">
                Lemuel Torrefiel
              </span>
            </p>
          </div>

          {/* Social Links - Git style */}
          <div className="flex justify-center gap-6 mt-6">
            <a
              href="https://github.com/lalala0095"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors group"
            >
              <i className="fab fa-github text-xl"></i>
              <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">git clone</span>
            </a>
            <a
              href="mailto:torrefiellemuel@gmail.com"
              className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors group"
            >
              <i className="fas fa-envelope text-xl"></i>
              <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">sendmail</span>
            </a>
            <a
              href="https://www.linkedin.com/in/lemuel-torrefiel/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors group"
            >
              <i className="fab fa-linkedin text-xl"></i>
              <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">connect</span>
            </a>
          </div>

          {/* Copyright - code comment style */}
          <div className="text-center mt-6 text-xs text-gray-600">
            <p>{"/* "} © {currentYear} Lemuel Torrefiel. All rights reserved. {" */"}</p>
          </div>

          {/* Version tag */}
          <div className="text-center mt-3">
            <span className="px-2 py-1 text-xs bg-slate-800 border border-white/10 rounded text-gray-500">
              v2.0.0-dev
            </span>
          </div>
        </div>
      </div>

      {/* Decorative code characters */}
      <div className="absolute bottom-2 left-4 text-gray-800 text-xs font-mono opacity-30">
        {"</portfolio>"}
      </div>
      <div className="absolute bottom-2 right-4 text-gray-800 text-xs font-mono opacity-30">
        {"// EOF"}
      </div>
    </footer>
  );
};

export default Footer;
