import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  children: React.ReactNode;
}

export default function Heading({ 
  level, 
  className, 
  children 
}: HeadingProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Tag 
        className={`text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-[#FFFFFF] to-[#dbdbdb] ${className}`}
      >
        {children}
      </Tag>
    </motion.div>
  );
}
