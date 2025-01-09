"use client";

import { useEffect, useState } from "react";
import { Play, Pause } from 'lucide-react';
import Image from 'next/image';
import ReactPlayer from 'react-player';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
} from "@nextui-org/react";

export default function CombinedNavbar() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playingUrl, setPlayingUrl] = useState<string>('https://www.youtube.com/watch?v=L8gGHqPBuZM'); // URL del video de YouTube
  const [isVisible, setIsVisible] = useState(false);
  const [isClient, setIsClient] = useState(false);  // Nuevo estado para comprobar si estamos en el cliente

  const togglePlayPause = (): void => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    setIsVisible(true); // Cambia la visibilidad solo en el cliente
    setIsClient(true);  // Marca que estamos en el cliente
  }, []);

  return (
    <Navbar shouldHideOnScroll className="bg-gray-50 dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto flex items-center justify-between p-4">
        <NavbarBrand className="flex items-center gap-8">
          <Image 
            src="/logo.png" 
            alt="Logo de LA ISLA DE LURE" 
            width={150} 
            height={150} 
          />
        </NavbarBrand>
        
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link href="/pages/faqs" className="text-gray-600 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white">FAQs</Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/pages/feed" className="text-gray-600 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white">Feed</Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/pages/profile" className="text-gray-600 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white">Perfil</Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/pages/settings" className="text-gray-600 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white">Settings</Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/pages/chats" className="text-gray-600 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white">Mensajes</Link>
          </NavbarItem>
        </NavbarContent>
        
        <NavbarContent className="flex items-center gap-4" justify="end">
          <NavbarItem>
            <div className="flex items-center gap-2 cursor-pointer" onClick={togglePlayPause}>
              {isPlaying ? (
                <Pause className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <Play className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              )}
              <span className="text-gray-600 dark:text-gray-400">5,810</span>
            </div>
          </NavbarItem>
          <NavbarItem>
            <Link href="/pages/planes">
              <button className="rounded-full border border-gray-200 px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-800">
              Mejorar a Premium
              </button>
            </Link>
          </NavbarItem>
        </NavbarContent>
      </div>

      {/* Reproducir solo en cliente */}
      {isClient && (
        <div className="hidden">
          <ReactPlayer
            url={playingUrl}
            playing={isPlaying}
            controls={false}  // No mostrar controles
            volume={1}        // Puedes ajustar el volumen
            muted={false}     // No está silenciado
            width="0px"       // No ocupará espacio
            height="0px"      // No ocupará espacio
            onEnded={() => setIsPlaying(false)} // Detener cuando termine
          />
        </div>
      )}
    </Navbar>
  );
}
