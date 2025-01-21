import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface ParallaxSectionProps {
  children?: React.ReactNode;
  className?: string;
  id?: string;
}

export default function ParallaxSection({
  children,
  className,
  id
}: ParallaxSectionProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.section
      id={id}
      ref={ref}
      // className={`relative bg-[#09090b]/80 ${className}`}
      className={`relative bg-gradient-to-b from-transparent from-0% via-[#09090b]/80 via-30% to-[#09090b]/80 ${className}`}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <div className="max-w-[1400px] mx-auto">
        {children}
      </div>
      <div className="relative mt-36">
        <motion.div
          className="absolute left-0 right-0 h-[400%] bottom-0"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            background: [
             "radial-gradient(circle at 50% 100%, rgba(25, 47, 105, 0.1) 0%, rgba(9, 20, 11, 0) 60%)",
"radial-gradient(circle at 52% 98%, rgba(25, 47, 105, 0.1) 0%, rgba(9, 9, 11, 0) 60%)",
"radial-gradient(circle at 48% 102%, rgba(25, 47, 105, 0.1) 0%, rgba(9, 9, 11, 0) 60%)",
"radial-gradient(circle at 50% 100%, rgba(25, 47, 105, 0.1) 0%, rgba(9, 9, 11, 0) 60%)",
            ],
          }}
          transition={{
            opacity: { duration: 1, ease: "easeIn" },
            background: {
              duration: 25,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
            },
          }}
        />
        <footer className="relative border-t-2 border-t-[#F4F4F5] border-opacity-5">
          <div className="container mx-auto pt-12 pb-24 text-gray-400">
            <p className='max-w-2xl px-8 md:px-0'>
              © 2024 Ícaro Borges | Dedicated to delivering   innovative and efficient software solutions. With a focus on precision and quality, I transform ideas into robust digital products that drive success and exceed expectations, every step of the way.
            </p>
          </div>
        </footer>
      </div>
    </motion.section>
  );
}
