'use client';

import React, { useState, useEffect } from 'react';

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // A medida que se hace scroll, el gradiente se va modificando para dar el efecto de difuminado
  const blurAmount = Math.min(scrollY / 5, 40); // Ajusta la velocidad de difuminado

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gray-200 dark:from-gray-950 dark:to-gray-700 text-gray-900 dark:text-white">
      <video
        src="/video.mp4" // Asegúrate de colocar tu archivo en public/video.mp4
        className="absolute left-0 top-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      />
      <div
        className="absolute inset-0 transition-all duration-300"
        style={{
          background: `linear-gradient(to bottom, rgba(0, 0, 0, ${Math.min(0.7, 0.7 - blurAmount / 100)}) 0%, rgba(0, 0, 0, 0) 100%)`,
          filter: `blur(${blurAmount}px)`,
        }}
      />
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center bg-gradient-to-b from-gray-100 to-gray-300 dark:from-gray-950 dark:to-gray-800 text-gray-900 dark:text-white">
        <h1 className="mb-4 text-5xl font-bold md:text-7xl">
          Todos los Originales de Lure.
        </h1>
        <p className="text-xl md:text-2xl">
          Sigue a los mejores creadores sin perderte nada.
        </p>
      </div>
    </div>
  );
}
