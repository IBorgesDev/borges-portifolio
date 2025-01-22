import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";

export default function HeaderIcons() {
  const iconAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        opacity: {
          duration: 0.5,
          delay: i * 0.2,
        },
        y: {
          type: "spring",
          stiffness: 100,
          damping: 10,
          delay: i * 0.2,
        },
      },
    }),
  };

  return (
    <div className="flex space-x-4">
      <motion.a
        href="https://github.com/IBorgesDev"
        target="_blank"
        rel="noopener noreferrer"
        custom={0}
        initial="hidden"
        animate="visible"
        variants={iconAnimation}
      >
        <FaGithub size={30} className="text-white hover:text-gray-400 transition-colors duration-200" />
      </motion.a>
      <motion.a
        href="https://www.linkedin.com/in/ícaro-borges-805b3928a"
        target="_blank"
        rel="noopener noreferrer"
        custom={1}
        initial="hidden"
        animate="visible"
        variants={iconAnimation}
      >
        <FaLinkedin size={30} className="text-white hover:text-gray-400 transition-colors duration-200" />
      </motion.a>
    </div>
  );
}