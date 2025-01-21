import React from "react";

interface GradientTextProps {
  children: React.ReactNode;
  white?: boolean;
  className?: string;
}

export default function GradientText({
  children,
  className,
  white
}: GradientTextProps) {
  return (
    <p
      className={`text-transparent text-center bg-clip-text ${className}`}
      style={{
        // backgroundImage: 'linear-gradient(to right, #A3A3A3, #71717A)'
        backgroundImage: white ?
          'linear-gradient(to right, #F57545, #71717A)' :
          'linear-gradient(to right, #FFF, #FFF)'
      }}
    >
      {children}
    </p>
  );
}