import { motion } from "framer-motion";
import React, { useState } from "react";
import {
  FaBriefcase,
  FaEnvelope,
  FaFacebook,
  FaGithub,
  FaLink,
  FaLinkedin,
} from "react-icons/fa";
import DeveloperImage from "../../images/about/VersaStore Developers croped.jpg";
import MainNav from "../Header/MainNav";

export default function About() {
  const [activeProfile, setActiveProfile] = useState(null);

  const handleMouseMove = (event) => {
    const { clientX, currentTarget } = event;
    const { left, width } = currentTarget.getBoundingClientRect();
    const mousePosition = (clientX - left) / width;

    if (mousePosition < 0.5) {
      setActiveProfile("Minhaz Sharif");
    } else {
      setActiveProfile("Abrar Fahim");
    }
  };

  const handleMouseLeave = () => {
    setActiveProfile(null);
  };

  return (
    <>
      <div className="dark:bg-gray">
        <MainNav />
      </div>

      <section className=" mx-auto  px-4 py-16  duration-300 dark:bg-gray bg-neutral-100">
        <p className="text-center -mt-12 text-xl md:text-3xl xl:text-4xl font-bold text-black dark:text-white mb-4">
          {" "}
          Meet the Developers
        </p>
        <div className="max-w-xl  mx-auto mb-12">
          <motion.div
            className="relative rounded-lg shadow-lg overflow-hidden"
            style={{ aspectRatio: "30 / 19" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={DeveloperImage}
              alt="Minhaz Rabbi & Abrar Fahim"
              className="w-full h-full object-cover transition-opacity duration-300"
            />
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: activeProfile ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-1/2 h-full flex items-center justify-center">
                {activeProfile === "Minhaz Sharif" && (
                  <span className="text-2xl md:text-4xl font-bold text-white bg-black bg-opacity-50 px-4 py-2 rounded">
                    Minhaz Sharif
                  </span>
                )}
              </div>
              <div className="w-1/2 h-full flex items-center justify-center">
                {activeProfile === "Abrar Fahim" && (
                  <span className="text-2xl md:text-4xl font-bold text-white bg-black bg-opacity-50 px-4 py-2 rounded">
                    Abrar Fahim
                  </span>
                )}
              </div>
            </motion.div>
            <AnimatedBorder />
          </motion.div>
        </div>

        <div className="flex flex-col md:flex-row gap-8 -mt-10 max-w-4xl mx-auto">
          <ProfileInfo
            name="Minhaz Sharif"
            facebook="https://www.facebook.com/sharif.mdminhaz"
            linkedin="https://www.linkedin.com/in/minhaz-sharif-614724205/"
            github="https://github.com/Sharif-Minhaz"
            email="smmr.career@gmail.com"
            position="MERN Stack Developer"
            skills={[
              "Node.js",
              "Express Js",
              "MongoDB",
              "ReactJs",
              "NEXT",
              "Redux",
              "Tailwind css",
              "Bootstrap",
              "Flask",
              "PostgreSQL",
              "Git & Github",
            ]}
            portfolio="https://dev-sharif-md-minhaz.netlify.app/"
            isActive={activeProfile === "Minhaz Sharif"}
          />
          <div className="hidden md:block w-px bg-gradient-to-b from-primary/20 via-primary to-primary/20 dark:from-primary/40 dark:via-primary dark:to-primary/40"></div>
          <ProfileInfo
            name="Abrar Fahim"
            github="https://github.com/abrar-fahim-priom"
            facebook="https://www.facebook.com/pshads77"
            linkedin="https://www.linkedin.com/in/abrar-fahim-priom/"
            email="priomshads@gmail.com"
            position="Front-End/React Developer"
            portfolio="https://abrar-fahim-priom.github.io/my_portfolio_with_bootstrap/"
            skills={[
              "Javascript",
              "React JS",
              "Tailwind CSS",
              "Bootstrap",
              "Firebase",
              "Express JS",
              "Redux",
              "React Query",
              "Adobe Illustrator",
              "Git & Github",
            ]}
            isActive={activeProfile === "Abrar Fahim"}
          />
        </div>
      </section>
    </>
  );
}

function ProfileInfo({
  name,
  github,
  email,
  position,
  skills,
  isActive,
  facebook,
  linkedin,
  portfolio,
}) {
  return (
    <motion.div
      className={`flex-1 p-6 bg-card rounded-lg shadow-md transition-all duration-300 dark:bg-gray-800 dark:text-white ${
        isActive ? "shadow-xl shadow-blue-500 -translate-y-1" : ""
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-4">{name}</h2>
      <div className="space-y-2">
        <div className="flex items-center">
          <FaBriefcase
            className="w-5 h-5 mr-2 text-primary dark:text-primary-dark"
            aria-hidden="true"
          />
          <span>{position}</span>
        </div>
        <div className="flex items-center">
          <a
            href={`${github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline flex flex-row"
          >
            <FaGithub
              className="w-5 h-5 mr-2 text-primary dark:text-primary-dark"
              aria-hidden="true"
            />
            {github}
          </a>
        </div>
        <div className="flex items-center">
          <FaEnvelope
            className="w-5 h-5 mr-2 text-primary dark:text-primary-dark"
            aria-hidden="true"
          />
          <a href={`mailto:${email}`} className="hover:underline">
            {email}
          </a>
        </div>

        <div className="flex items-center">
          <a
            href={`${facebook}`}
            target="_blank"
            className="flex flex-row hover:underline"
          >
            <FaFacebook
              className="w-5 h-5 mr-2 text-primary dark:text-primary-dark"
              aria-hidden="true"
            />
            Facebook
          </a>
        </div>

        <div className="flex ">
          <a
            href={`${linkedin}`}
            target="_blank"
            className="hover:underline flex flex-row"
          >
            <FaLinkedin
              className="w-5 h-5 mr-2 text-primary dark:text-primary-dark"
              aria-hidden="true"
            />
            Linkedin
          </a>
        </div>

        <div className="flex ">
          <a
            href={`${portfolio}`}
            target="_blank"
            className="hover:underline flex flex-row"
          >
            <FaLink
              className="w-5 h-5 mr-2 text-primary dark:text-primary-dark"
              aria-hidden="true"
            />
            Portoflio
          </a>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span
              key={skill}
              className={`px-2 py-1 rounded-full text-sm font-medium text-white transition-transform hover:scale-105 ${getSkillColor(
                index
              )}`}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function AnimatedBorder() {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
    >
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          width="100%"
          height="100%"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="4"
          vectorEffect="non-scaling-stroke"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3182ce" />
            <stop offset="50%" stopColor="#805ad5" />
            <stop offset="100%" stopColor="#d53f8c" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
}

function getSkillColor(index) {
  const colors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-red-500",
    "bg-purple-500",
    "bg-pink-500",
  ];
  return colors[index % colors.length];
}
