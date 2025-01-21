import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function DollarSigns() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const dollarSigns = [
    { size: '3rem', rotate: -5, top: '4rem', right: '0', delay: 0 },
    { size: '4rem', rotate: 20, top: '2rem', right: '-3rem', delay: 0.2 },
    { size: '5rem', rotate: 60, top: '-2.5rem', right: '-4rem', delay: 0.4 },
    { size: '6rem', rotate: 160, top: '-7rem', left: '-3rem', delay: 0.6 },
    { size: '7rem', rotate: 190, top: '-10rem', left: '-9rem', delay: 0.8 },
  ];

  return (
    <div ref={ref} className="relative grow ms-32 select-none">
      <div className="absolute top-1/2 right-1/3 w-0 h-0">
        {dollarSigns.map((sign, index) => (
          <motion.div
            key={index}
            className="relative"
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            animate={inView ? { opacity: 1, scale: 1, rotate: sign.rotate } : {}}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
              duration: 1,
              delay: sign.delay,
            }}
            style={{
              position: 'absolute',
              top: sign.top,
              right: sign.right,
              left: sign.left,
            }}
          >
            <motion.div
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: sign.delay + 1, // Começa a flutuar após o carregamento inicial
              }}
            >
              <div className="absolute inset-0 bg-white opacity-5 rounded-full blur-xl" />
              <p className={`clash-display text-white relative z-10`} style={{ fontSize: sign.size }}>
                $
              </p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};