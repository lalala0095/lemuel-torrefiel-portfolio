import { useState } from "react";
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub } from "react-icons/fa";
import emailjs from "emailjs-com";

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        e.target,            // The form itself
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )
      .then(
        (result) => {
          console.log("Success:", result.text);
          setSubmitted(true);
          setTimeout(() => setSubmitted(false), 5000);
        },
        (error) => {
          console.log("Failed:", error.text);
        }
      );
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden" style={{
      background: 'linear-gradient(180deg, #1e1b4b 0%, #1e3a5f 50%, #1e1b4b 100%)',
    }}>
      {/* Background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-4xl font-bold text-center mb-4 text-white">Contact Me</h2>
        <p className="text-center text-gray-400 mb-10">Feel free to reach out through any of my contact channels below.</p>

        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <a href="mailto:torrefiellemuel@gmail.com" className="flex items-center space-x-2 text-gray-300 hover:text-cyan-400 transition-colors duration-300">
            <FaEnvelope className="text-xl" />
            <span>torrefiellemuel@gmail.com</span>
          </a>
          <a href="tel:+69069204648" className="flex items-center space-x-2 text-gray-300 hover:text-cyan-400 transition-colors duration-300">
            <FaPhone className="text-xl" />
            <span>+63 906 920 4648</span>
          </a>
          <a href="https://www.linkedin.com/in/lemuel-torrefiel/" className="flex items-center space-x-2 text-gray-300 hover:text-cyan-400 transition-colors duration-300">
            <FaLinkedin className="text-xl" />
            <span>LinkedIn</span>
          </a>
          <a href="https://github.com/lalala0095" className="flex items-center space-x-2 text-gray-300 hover:text-cyan-400 transition-colors duration-300">
            <FaGithub className="text-xl" />
            <span>GitHub</span>
          </a>
        </div>

        <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl p-8 max-w-lg mx-auto w-full">
          {submitted ? (
            <p className="text-cyan-400 text-center font-medium text-lg">✓ Message sent! I'll get back to you soon.</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-300 font-medium mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all duration-300"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-gray-300 font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all duration-300"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label className="block text-gray-300 font-medium mb-2">Message</label>
                <textarea
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all duration-300 resize-none"
                  placeholder="Your message..."
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={submitted}
                className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${submitted
                    ? "bg-gray-600 cursor-not-allowed text-gray-400"
                    : "bg-gradient-to-r from-purple-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-purple-500/25 hover:scale-[1.02]"
                  }`}
              >
                {submitted ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;