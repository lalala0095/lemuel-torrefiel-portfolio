import { useState, useRef } from "react";
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub } from "react-icons/fa";
import emailjs from "emailjs-com";

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [terminalHistory, setTerminalHistory] = useState([
    { type: 'system', content: 'Contact terminal initialized...' },
    { type: 'system', content: 'Type your details below to send a message.' },
  ]);
  const [currentField, setCurrentField] = useState('name');
  const inputRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add to terminal history
    setTerminalHistory(prev => [
      ...prev,
      { type: 'command', content: `$ send-message --to torrefiellemuel@gmail.com` },
      { type: 'output', content: '> Establishing connection...' },
    ]);

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        e.target,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )
      .then(
        (result) => {
          console.log("Success:", result.text);
          setTerminalHistory(prev => [
            ...prev,
            { type: 'success', content: '> Message sent successfully! ✓' },
            { type: 'output', content: '> Response: I\'ll get back to you soon!' },
          ]);
          setSubmitted(true);
          setTimeout(() => setSubmitted(false), 5000);
        },
        (error) => {
          console.log("Failed:", error.text);
          setTerminalHistory(prev => [
            ...prev,
            { type: 'error', content: `> Error: ${error.text}` },
          ]);
        }
      );
  };

  const contactLinks = [
    {
      icon: <FaEnvelope className="text-xl" />,
      label: 'Email',
      value: 'torrefiellemuel@gmail.com',
      href: 'mailto:torrefiellemuel@gmail.com',
      command: 'echo $EMAIL'
    },
    {
      icon: <FaPhone className="text-xl" />,
      label: 'Phone',
      value: '+63 906 920 4648',
      href: 'tel:+639069204648',
      command: 'cat phone.txt'
    },
    {
      icon: <FaLinkedin className="text-xl" />,
      label: 'LinkedIn',
      value: 'lemuel-torrefiel',
      href: 'https://www.linkedin.com/in/lemuel-torrefiel/',
      command: 'open linkedin.url'
    },
    {
      icon: <FaGithub className="text-xl" />,
      label: 'GitHub',
      value: 'lalala0095',
      href: 'https://github.com/lalala0095',
      command: 'git remote -v'
    },
  ];

  return (
    <section id="contact" className="py-12 relative overflow-hidden min-h-screen" style={{
      background: 'linear-gradient(180deg, #1e1b4b 0%, #1e3a5f 50%, #1e1b4b 100%)',
    }}>
      {/* Background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Terminal Window Frame */}
        <div className="bg-slate-900/90 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl shadow-purple-500/10 overflow-hidden">

          {/* Terminal Title Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-slate-800/80 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="ml-4 text-gray-400 text-sm font-mono">
                contact@lemuel-portfolio ~ bash
              </span>
            </div>
            <div className="text-gray-500 text-xs font-mono">
              ⌘ + Enter to send
            </div>
          </div>

          {/* Terminal Content */}
          <div className="p-6 font-mono">

            {/* Section Header */}
            <div className="mb-6">
              <p className="text-green-400 text-sm">$ cat contact_info.md</p>
              <h2 className="text-3xl font-bold text-white mt-2">
                <span className="text-cyan-400">{"# "}</span>
                Contact Me
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                {"// "} Let's build something amazing together
              </p>
            </div>

            {/* Contact Links - Command Output Style */}
            <div className="mb-8 p-4 bg-slate-800/50 rounded-lg border border-white/10">
              <p className="text-green-400 text-sm mb-3">$ ./show_contact_links.sh</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {contactLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-3 p-3 rounded-lg bg-slate-700/30 border border-white/5 hover:border-purple-400/30 hover:bg-slate-700/50 transition-all duration-300 group"
                  >
                    <span className="text-purple-400 group-hover:text-cyan-400 transition-colors">
                      {link.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500">{link.command}</p>
                      <p className="text-gray-300 group-hover:text-white transition-colors truncate text-sm">
                        {">"} {link.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Terminal Form */}
            <div className="bg-slate-800/50 rounded-lg border border-white/10 p-4">
              <p className="text-green-400 text-sm mb-4">$ ./send_message.sh --interactive</p>

              {/* Terminal History */}
              <div className="mb-4 text-sm space-y-1 max-h-32 overflow-y-auto">
                {terminalHistory.map((line, index) => (
                  <p key={index} className={
                    line.type === 'system' ? 'text-gray-500' :
                      line.type === 'command' ? 'text-cyan-400' :
                        line.type === 'success' ? 'text-green-400' :
                          line.type === 'error' ? 'text-red-400' :
                            'text-gray-400'
                  }>
                    {line.content}
                  </p>
                ))}
              </div>

              {submitted ? (
                <div className="text-center py-8">
                  <p className="text-green-400 text-lg">✓ Message transmitted successfully!</p>
                  <p className="text-gray-500 mt-2">{">"} Awaiting response from server...</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name Input */}
                  <div className="flex items-start gap-2">
                    <span className="text-green-400 mt-2.5">$</span>
                    <div className="flex-1">
                      <label className="block text-gray-400 text-xs mb-1">contact --name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full p-2.5 bg-slate-700/50 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all duration-300 font-mono text-sm"
                        placeholder='"Your Name"'
                      />
                    </div>
                  </div>

                  {/* Email Input */}
                  <div className="flex items-start gap-2">
                    <span className="text-green-400 mt-2.5">$</span>
                    <div className="flex-1">
                      <label className="block text-gray-400 text-xs mb-1">contact --email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full p-2.5 bg-slate-700/50 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all duration-300 font-mono text-sm"
                        placeholder='"your@email.com"'
                      />
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="flex items-start gap-2">
                    <span className="text-green-400 mt-2.5">$</span>
                    <div className="flex-1">
                      <label className="block text-gray-400 text-xs mb-1">contact --message</label>
                      <textarea
                        name="message"
                        rows="4"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="w-full p-2.5 bg-slate-700/50 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all duration-300 font-mono text-sm resize-none"
                        placeholder='"Your message here..."'
                      ></textarea>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex items-center gap-2 pt-2">
                    <span className="text-green-400">$</span>
                    <button
                      type="submit"
                      disabled={submitted}
                      className={`flex-1 py-3 rounded-lg font-mono text-sm font-medium transition-all duration-300 ${submitted
                          ? "bg-gray-700 cursor-not-allowed text-gray-500"
                          : "bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-400/30 text-white hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/20"
                        }`}
                    >
                      {submitted ? (
                        <span className="flex items-center justify-center gap-2">
                          <span className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"></span>
                          Sending...
                        </span>
                      ) : (
                        <span>./send_message.sh <span className="text-cyan-400">--execute</span></span>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Footer command */}
            <div className="mt-6 text-gray-600 text-sm">
              <p>$ echo "Looking forward to hearing from you!"</p>
              <p className="text-purple-400 mt-1">{">"} Looking forward to hearing from you!</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;