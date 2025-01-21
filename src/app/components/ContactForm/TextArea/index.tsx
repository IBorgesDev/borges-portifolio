import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TextAreaProps {
  label: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  rows?: number;
  required?: boolean;
}

export default function TextArea({
  label,
  id,
  name,
  value,
  onChange,
  className,
  rows = 4,
  required = false
}: TextAreaProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e);

  const labelVariants = {
    default: { y: 0, scale: 1, opacity: 0.5 },
    focused: { y: -32, scale: 0.8, opacity: 1 }
  };

  const borderVariants = {
    default: { scaleX: 0 },
    focused: { scaleX: 1 }
  };

  return (
    <div className={`flex flex-col gap-2 grow ${className} relative`}>
      <AnimatePresence>
        <motion.label
          htmlFor={id}
          className="absolute text-lg bg-clip-text text-transparent bg-gradient-to-r from-[#A3A3A3] to-[#71717A] cursor-text select-none"
          initial="default"
          animate={isFocused || value ? "focused" : "default"}
          variants={labelVariants}
          transition={{ type: "tween", duration: 0.2 }}
          style={{
            top: '12px',
            left: '8px',
            transformOrigin: 'left top'
          }}
        >
          {label} {required && <span className="text-red-500">*</span>}
        </motion.label>
      </AnimatePresence>
      <textarea
        id={id}
        rows={rows}
        className="bg-transparent text-[#F4F4F5] text-opacity-80 outline-none border-[#F4F4F5] border-opacity-10 border rounded-md p-2 pt-6 resize-none"
        name={name}
        required={required}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        value={value}
        autoComplete='off'
      />
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-[#09090b00] via-[#3a68ff] to-[#09090b00]"
        initial="default"
        animate={isFocused ? "focused" : "default"}
        variants={borderVariants}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />
    </div>
  );
}
