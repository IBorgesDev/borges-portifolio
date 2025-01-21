import React, { useEffect, useRef } from "react";

interface StarsProps {
  numOfStars: number;
}

interface Star {
  x: number;
  y: number;
  z: number;
  radius: number;
  velocity: number;
  brightness: number;
}

export default function Stars({
  numOfStars
}: StarsProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (!canvas || !context) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const starsArr: Star[] = [];

    for (let i = 0; i < numOfStars; i++) {
      starsArr.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 1000,
        radius: Math.random() * 1.5 + 0.5,
        velocity: Math.random() * 0.35 + 0.1,
        brightness: Math.random()
      });
    }

    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current = {
        x: event.clientX,
        y: event.clientY
      };
    };

    const animate = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      starsArr.forEach((star) => {
        const parallaxFactor = 0.002;
        const depthFactor = (1000 - star.z) / 1000;
        const offsetX = (mousePosition.current.x - canvas.width / 2) * parallaxFactor * depthFactor;
        const offsetY = (mousePosition.current.y - canvas.height / 2) * parallaxFactor * depthFactor;
        
        star.x += star.velocity + offsetX;
        star.y += star.velocity + offsetY;

        if (star.x > canvas.width) star.x = 0;
        if (star.y > canvas.height) star.y = 0;
        if (star.x < 0) star.x = canvas.width;
        if (star.y < 0) star.y = canvas.height;

        const size = star.radius * (1000 - star.z) / 1000;

        const distanceToMouse = Math.hypot(star.x - mousePosition.current.x, star.y - mousePosition.current.y);
        const maxDistance = Math.hypot(canvas.width, canvas.height);
        const mouseBrightness = 1 - (distanceToMouse / maxDistance);
        const twinkle = Math.random() * 0.3 + 0.7;
        const brightness = (star.brightness * 0.5 + mouseBrightness * 0.5) * twinkle;

        context.beginPath();
        context.arc(star.x, star.y, size, 0, Math.PI * 2);
        context.fillStyle = `rgba(255, 255, 255, ${brightness})`;
        context.fill();
        context.closePath();
      });
      requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, [numOfStars]);

  const handleResize = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  };

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none select-none"
    />
  );
}
