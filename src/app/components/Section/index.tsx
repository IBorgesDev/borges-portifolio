import React from 'react';

interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
}

export default function Section({ 
  id, 
  className, 
  children 
}: SectionProps) {
  return (
    <div id={id} className={className}>
      {children}
    </div>
  );
}