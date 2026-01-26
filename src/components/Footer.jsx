const Footer = () => {
  return (
    <footer className="py-8 border-t border-white/10 text-center relative" style={{
      background: 'linear-gradient(180deg, #1e1b4b 0%, #0f0f23 100%)',
    }}>
      <p className="text-gray-400 text-sm">
        © {new Date().getFullYear()} <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent font-medium">Lemuel Torrefiel</span>. All rights reserved.
      </p>

      {/* Social Links */}
      <div className="flex justify-center space-x-6 mt-4">
        <a href="https://github.com/lalala0095" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
          <i className="fab fa-github text-2xl"></i>
        </a>
        <a href="mailto:torrefiellemuel@gmail.com" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
          <i className="fas fa-envelope text-2xl"></i>
        </a>
        <a href="https://www.linkedin.com/in/lemuel-torrefiel/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
          <i className="fab fa-linkedin text-2xl"></i>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
