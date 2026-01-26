import { useState, useEffect, useRef } from "react";
import techStacks from "../techStacks.json";
import { FaStar, FaSearchengin, FaRegStar } from "react-icons/fa";
import {
  FaAws, FaReact, FaChartBar, FaRProject, FaGoogle
} from "react-icons/fa";
import GoogleGeminiIcon from "./icons/GoogleGeminiIcon";
import { TbSearch } from "react-icons/tb";
import {
  SiMongodb, SiMysql, SiFlask, SiFastapi, SiPostgresql, SiTailwindcss,
  SiGooglesheets, SiApacheairflow, SiPython, SiGithubpages, SiGooglecloud,
  SiOpenai
} from "react-icons/si";
import { VscAzure } from "react-icons/vsc";
import { PiFileSql, PiMicrosoftExcelLogoFill } from "react-icons/pi";

const icons = {
  FaAws, FaReact, FaChartBar, FaRProject, FaGoogle,
  SiMongodb, SiMysql, SiFlask, SiFastapi, SiPostgresql, SiTailwindcss,
  SiGooglesheets, SiApacheairflow, SiPython, SiGithubpages,
  VscAzure, PiFileSql, PiMicrosoftExcelLogoFill, SiGooglecloud,
  SiOpenai, GoogleGeminiIcon, TbSearch, FaSearchengin
};

const TechStackShowcase = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const [techCategories, setTechCategories] = useState([]);
  const [hoveredTech, setHoveredTech] = useState(null);

  useEffect(() => {
    setTechCategories(techStacks);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const getDisplayedTechnologies = () => {
    if (activeCategory === "all") {
      return techCategories;
    }
    return techCategories.filter(category => category.id === activeCategory);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <div id="tech-stacks" ref={sectionRef} className="py-20 relative overflow-hidden" style={{
      background: 'linear-gradient(180deg, #0f172a 0%, #1e1b4b 50%, #1e3a5f 100%)',
    }}>
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-4xl font-bold text-center mb-2 text-white">My Tech Stacks</h2>
          <p className="text-gray-400 text-center mb-10 max-w-2xl mx-auto">
            Technologies I've worked with throughout my journey in data and web development
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === "all"
                  ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg shadow-purple-500/25"
                  : "bg-white/10 text-gray-300 hover:bg-white/20 border border-white/10"
                }`}
            >
              All Technologies
            </button>
            {techCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === category.id
                    ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg shadow-purple-500/25"
                    : "bg-white/10 text-gray-300 hover:bg-white/20 border border-white/10"
                  }`}
              >
                {category.title.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-12">
          {getDisplayedTechnologies().map((category) => (
            <div key={category.id} className={`transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h3 className="text-2xl font-semibold mb-6 text-center sm:text-left text-white">{category.title}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                {category.technologies.map((tech) => (
                  <div
                    key={tech.name}
                    className="flex flex-col items-center justify-center p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/10 relative overflow-hidden group"
                    onMouseEnter={() => setHoveredTech(tech.name)}
                    onMouseLeave={() => setHoveredTech(null)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10 text-6xl mb-3 transform transition-transform duration-300 group-hover:scale-110">
                      {icons[tech.icon] && icons[tech.icon]({ className: tech.color })}
                    </div>
                    <span className="relative z-10 text-sm font-medium text-gray-300 group-hover:text-white">
                      {tech.name}
                    </span>
                    {/* Star Rating Display on Hover */}
                    {hoveredTech === tech.name && (
                      <div className="absolute bottom-2 flex gap-1">
                        {renderStars(tech.rating)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechStackShowcase;
