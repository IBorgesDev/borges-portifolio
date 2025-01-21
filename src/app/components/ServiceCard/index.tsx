import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
interface ServiceCardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
}

export default function ServiceCard({
  imageSrc,
  imageAlt,
  title,
  description
}: ServiceCardProps) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [controls, inView]);

  return (
    <motion.div 
      ref={ref}
      className="bg-[#18181B] rounded-xl p-8 flex flex-col max-w-[415px] h-[400px] w-full border border-[#F4F4F5] border-opacity-10"
      initial={{ opacity: 0, y: 40 }}
      animate={controls}
      transition={{ duration: 1 }}
      whileHover={{ 
        boxShadow: "0px 0px 20px rgba(244, 244, 245, 0.1)",
        transition: { duration: 0.3 }
      }}
    >
      <Image 
        src={imageSrc} 
        alt={imageAlt} 
        className="w-40 h-40 my-4 mx-auto"
      />
      <h3 
        className="text-xl text-[#E4E4E7] mb-2"
      >
        {title}
      </h3>
      <p 
        className="text-sm text-[#A1A1AA] opacity-80 tracking-wide leading-relaxed"
      >
        {description}
      </p>
    </motion.div>
  );
}
