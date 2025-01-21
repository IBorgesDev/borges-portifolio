import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface GradientDividerProps {
  className?: string;
}

export default function GradientDivider({
  className
}: GradientDividerProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => setAnimate(true), 100);
      return () => clearTimeout(timer);
    }
  }, [inView]);

  return (
    <motion.div
      ref={ref}
      className={`relative w-full h-[1px] ${className}`}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      style={{ zIndex: 999999 }}
    >
      <motion.div
        className="absolute inset-0"
        style={{ zIndex: 999999 }}
        initial={{ opacity: 0 }}
        animate={animate ? {
          scale: [1, 1.02, 1],
          opacity: [1, 0.98, 1]
        } : {}}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: 2
        }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-[#108cff] to-transparent"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 0.7, scaleX: 1 } : {}}
          transition={{ duration: 2, ease: "easeOut" }}
          style={{ zIndex: 999998 }}
        />
        {[800, 600, 400, 200, 50].map((width, index) => (
          <motion.div
            key={width}
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.5, delay: index * 0.2, ease: "easeOut" }}
            style={{ zIndex: 9999999 }}
          >
            <motion.div
              className={`bg-gradient-to-r from-transparent via-[#455d69] to-transparent rounded-full`}
              style={{
                width: `${width}px`,
                height: `${index === 3 ? 20 : index === 4 ? 6 : 8 - index * 2}px`,
                filter: `blur(${Math.max(25 - index * 4, 12)}px)`,
                opacity: 0.8 - index * 0.08,
                zIndex: 9999999
              }}
              animate={inView ? {
                width: [`${width * 0.8}px`, `${width}px`, `${width * 0.9}px`, `${width}px`],
                opacity: [0.6, 0.8 - index * 0.08, 0.7 - index * 0.08, 0.8 - index * 0.08]
              } : {}}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
