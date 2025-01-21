import React from 'react';
import { FaReact, FaNodeJs, FaPython, FaFigma, FaJava, FaAngular, FaDatabase } from 'react-icons/fa';
import { SiTypescript, SiJavascript, SiVercel, SiDocker, SiNextdotjs, SiPostgresql, SiExpress, SiExpo, SiRust, SiKotlin, SiFlutter, SiJetpackcompose } from 'react-icons/si';
import { RiTailwindCssLine } from 'react-icons/ri';
import { FaAws } from 'react-icons/fa6';
import { motion, AnimatePresence } from 'framer-motion';

const techIcons: { [key: string]: { icon: React.ElementType, bgColor: string } } = {
  'React': { icon: FaReact, bgColor: '#4da3bb' },
  'Tailwind': { icon: RiTailwindCssLine, bgColor: 'rgb(134, 136, 247)' },
  'Rust': { icon: SiRust, bgColor: 'rgb(255, 165, 0)' },
  'Kotlin': { icon: SiKotlin, bgColor: 'rgb(255, 165, 0)' },
  'Flutter': { icon: SiFlutter, bgColor: 'rgb(0, 132, 255)' },
  'Jetpack Compose': { icon: SiJetpackcompose, bgColor: 'rgb(0, 132, 255)' },
  'Vercel': { icon: SiVercel, bgColor: 'rgb(15, 15, 15)' },
  'Figma': { icon: FaFigma, bgColor: 'rgb(255, 120, 110)' },
  'Node.js': { icon: FaNodeJs, bgColor: '#339933' },
  'Docker': { icon: SiDocker, bgColor: '#003366' },
  'Next.JS': { icon: SiNextdotjs, bgColor: '#000000' },
  'Python': { icon: FaPython, bgColor: '#3776AB' },
  'TypeScript': { icon: SiTypescript, bgColor: '#3178C6' },
  'JavaScript': { icon: SiJavascript, bgColor: '#F7DF1E' },
  'PostgreSQL': { icon: SiPostgresql, bgColor: '#336791' },
  'AWS': { icon: FaAws, bgColor: '#FF9900' },
  'Express': { icon: SiExpress, bgColor: '#000000' },
  'ReactNative': { icon: FaReact, bgColor: '#4da3bb' },
  'Expo': { icon: SiExpo, bgColor: '#000000' },
  'Java': { icon: FaJava, bgColor: '#007396' },
  'Angular': { icon: FaAngular, bgColor: '#DD0031' },
  'MongoDB': { icon: FaDatabase, bgColor: '#4DB33D' }
};

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  techTags: string[];
  imageSrc: string;
  imageAlt: string;
  isActive?: boolean;
  redirect?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export default function ProjectCard({
  title,
  description,
  tags,
  techTags,
  imageSrc,
  imageAlt,
  redirect,
  isActive = false,
  disabled = false,
  onClick
}: ProjectCardProps) {
  const renderTechTags = () => {
    return techTags.map((tech, index) => {
      const techInfo = techIcons[tech] || { icon: null, bgColor: '#000000' };
      const Icon = techInfo.icon;
      return (
        <span key={index} className="flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full" style={{ backgroundColor: techInfo.bgColor, color: '#FFFFFF' }}>
          {Icon && <Icon />}
          {tech}
        </span>
      );
    });
  };

  const renderTags = () => {
    return tags.map((tag, index) => (
      <span key={index} className="bg-[#252525] text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">
        {tag}
      </span>
    ));
  };

  const buttonVariants = {
    initial: {
      scale: 0.9,
      opacity: 0,
      y: 10
    },
    animate: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 25,
        mass: 0.5,
        duration: 0.2
      }
    },
    exit: {
      scale: 0.9,
      opacity: 0,
      y: -10,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 25,
        mass: 0.5,
        duration: 0.2
      }
    },
    hover: {
      scale: 1.03,
      transition: {
        type: "spring",
        stiffness: 700,
        damping: 15
      }
    }
  };

  return (
    <div className="text-white px-4 h-[500px] flex flex-col z-20 relative">
      <h2 className="font-bold text-2xl tracking-wide">{title}</h2>
      <p className="opacity-60 mb-4">{description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {renderTechTags()}
        {renderTags()}
      </div>
      <div className="flex-grow rounded-lg border border-[#5A5A5E] overflow-hidden">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full object-cover h-[300px]"
        />
      </div>
      <AnimatePresence mode="wait">
        {redirect ? (
          <motion.a
            key="redirect"
            target="_blank"
            href={!disabled ? redirect : undefined}
            rel="noopener noreferrer"
            variants={buttonVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            whileHover={!disabled ? "hover" : undefined}
            className={`w-full mt-6 py-2 flex items-center justify-center rounded-md text-center text-black font-black relative overflow-hidden ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <span className="relative z-10">Visit Project</span>
            <motion.div
              className="absolute inset-0"
              style={{
                backgroundImage: 'linear-gradient(90deg, #4a9d5f 0%, #7ceb98 22%, #4a9d5f 48%, #7ceb98 73%, #4a9d5f 100%)',
                backgroundSize: '200% 100%',
                filter: disabled ? 'brightness(0.7)' : 'none',
              }}
            />
            <div className="absolute inset-0 border border-[#F9F9F9] rounded-md opacity-20"></div>
          </motion.a>
        ) : isActive ? (
          <motion.button
            key="active"
            variants={buttonVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            whileHover="hover"
            className="w-full mt-6 py-2 flex items-center justify-center rounded-md text-center text-white font-black relative overflow-hidden"
            onClick={onClick}
          >
            <span className="relative z-10">view more</span>
            <motion.div
              className="absolute inset-0"
              style={{
                backgroundImage: 'linear-gradient(90deg, #005eb6 0%, #84c3ff 22%, #005eb6 48%, #005eb6 73%, #005eb6 100%)',
                backgroundSize: '200% 100%',
              }}
            />
            <div className="absolute inset-0 border border-[#F9F9F9] rounded-md opacity-20"></div>
          </motion.button>
        ) : (
          <motion.button
            key="inactive"
            variants={buttonVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            whileHover="hover"
            className="w-full mt-6 py-2 flex items-center justify-center rounded-md text-center text-black font-black relative overflow-hidden"
            onClick={onClick}
          >
            <span className="relative z-10">view more</span>
            <motion.div
              className="absolute inset-0"
              style={{
                backgroundImage: 'linear-gradient(90deg, #84c3ff 0%, #FFFFFF 22%, #005eb6 48%, #FFFFFF 73%, #005eb6 100%)',
                backgroundSize: '200% 100%',
              }}
            />
            <div className="absolute inset-0 border border-[#F9F9F9] rounded-md opacity-20"></div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
