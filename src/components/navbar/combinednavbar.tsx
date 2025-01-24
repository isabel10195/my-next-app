"use client";

import { useEffect, useState } from "react";
import { Play, Pause, Menu } from 'lucide-react';
import Image from 'next/image';
import ReactPlayer from 'react-player';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link } from "@nextui-org/react"

export default function CombinedNavbar() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playingUrl, setPlayingUrl] = useState<string>('https://www.youtube.com/watch?v=L8gGHqPBuZM'); // URL del video de YouTube
  const [isVisible, setIsVisible] = useState(false);
  const [isClient, setIsClient] = useState(false);  // Nuevo estado para comprobar si estamos en el cliente
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para controlar la visibilidad del menú

  const togglePlayPause = (): void => {
    setIsPlaying(!isPlaying);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Alternar el estado del menú al hacer clic en el icono de hamburguesa
  };

  useEffect(() => {
    setIsVisible(true); // Cambia la visibilidad solo en el cliente
    setIsClient(true);  // Marca que estamos en el cliente
  }, []);

  return (
    <Navbar className="bg-gray-50 dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto flex items-center justify-between p-5 md:p-5">
         {/* Icono de hamburguesa */}
        <div className="md:hidden cursor-pointer mr-5" onClick={toggleMenu}>
          <Menu className="h-7 w-7 text-gray-600 dark:text-gray-400 " />
        </div>
        
        <NavbarBrand className="flex items-center gap-4 md:gap-8">
          <Image 
            src="/logo.png" 
            alt="Logo de LA ISLA DE LURE" 
            width={150} 
            height={150} 
          />
        </NavbarBrand>

        {/* Menu pantallas grandes */}
        <NavbarContent className="hidden md:flex gap-2 lg:gap-4 flex-grow justify-center mr-4 lg:mr-64">
          <NavbarItem>
            <Link href="/pages/feed" className="text-gray-600 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white">Feed</Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/pages/profile" className="text-gray-600 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white">Perfil</Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/pages/settings" className="text-gray-600 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white">Configuración</Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/pages/chats" className="text-gray-600 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white">Mensajes</Link>
          </NavbarItem>
        </NavbarContent>
        
        <NavbarContent className="flex items-center gap-4 md:gap-4">
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

          <NavbarItem className="hidden md:flex">
            <Link href="/pages/planes">
              <button className="rounded-full border border-gray-200 px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-800">
                Mejorar a Premium
              </button>
            </Link>
          </NavbarItem>
        </NavbarContent>
      </div>

      {/* Menu desplegable (movil) */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" onClick={() => setIsMenuOpen(false)} />
      )}
        <div className={`fixed top-0 left-0 w-full bg-gray-50 dark:dark:bg-gray-950 backdrop-blur-sm transform transition-all duration-300 ease-in-out z-50 ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}>
          <div className="flex flex-col py-2 max-w-lg mx-auto"> 
            <Link href="/pages/feed" className="px-6 py-3 text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">Feed</Link>
            <Link href="/pages/profile" className="px-6 py-3 text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">Perfil</Link>
            <Link href="/pages/settings" className="px-6 py-3 text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">Configuración</Link>
            <Link href="/pages/chats" className="px-6 py-3 text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">Mensajes</Link>
            <Link href="/pages/premium" className="px-6 py-3 text-blue-400 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-gray-800">Mejorar a Premium</Link>
          </div>
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