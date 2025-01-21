import { motion } from "framer-motion";
import React from "react";

interface FadeInProps {
  duration: number;
  children: React.ReactNode;
  className?: string;
}

export default function FadeIn({
  duration,
  children,
  className
}: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration }}
      className={className}
    >
      {children}
    </motion.div>
  );
}