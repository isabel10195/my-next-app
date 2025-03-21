"use client";

import { useEffect, useState } from "react";
import { Play, Pause, Menu, Sun, Moon } from 'lucide-react';
import Image from 'next/image';
// import ReactPlayer from 'react-player'; // 🔥 Comentado para evitar errores por bloqueadores de anuncios
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link } from "@nextui-org/react";
import { HiX } from "react-icons/hi"

export default function CombinedNavbar() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playingUrl, setPlayingUrl] = useState<string>('https://www.youtube.com/watch?v=L8gGHqPBuZM'); // URL del video de YouTube
  const [isVisible, setIsVisible] = useState(false);
  const [isClient, setIsClient] = useState(false);  // Comprobar si estamos en el cliente
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para controlar la visibilidad del menú
  const [isDarkMode, setIsDarkMode] = useState(false); // Modo claro/oscuro

  const togglePlayPause = (): void => {
    setIsPlaying(!isPlaying);
  };
 
  //Menu responsive desplegable
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  //Modo claro/oscuro
  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);

    if (newDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  useEffect(() => {
    setIsVisible(true);
    setIsClient(true);
    
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const shouldUseDark = savedTheme === "dark" || (!savedTheme && prefersDark);

    if (shouldUseDark) {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    }}
  }, []);

  return (
    <Navbar className=" bg-gradient-to-t from-gray-50 to-gray-200 dark:bg-gradient-to-b dark:from-gray-800 dark:to-gray-900 border-b border-gray-200 dark:border-gray-900 shadow shadow-sm">
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
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label={isDarkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
              type="button"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
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
      <div className={`fixed top-1 left-1 right-1 bg-gray-50 dark:bg-gray-950 backdrop-blur-sm transform transition-all duration-300 ease-in-out z-50 rounded-2xl ${
        isMenuOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        {/* Botón X para cerrar menú */}
        <div className="flex items-center justify-between px-6 mt-3">
          <button onClick={() => setIsMenuOpen(false)} className="ml-auto text-xl dark:text-white text-gray-900">
            <HiX />
          </button>
        </div>

        <div className="flex flex-col px-3 py-2 mx-auto">
          <Link href="/pages/feed" className="px-2 py-3 text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">Feed</Link>
          <Link href="/pages/profile" className="px-2 py-3 text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">Perfil</Link>
          <Link href="/pages/settings" className="px-2 py-3 text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">Configuración</Link>
          <Link href="/pages/chats" className="px-2 py-3 text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">Mensajes</Link>
          <Link href="/pages/premium" className="px-2 py-3 text-blue-400 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-gray-800 rounded-lg">Mejorar a Premium</Link>
        </div>
      </div>

      {/* 🔥 ReactPlayer desactivado temporalmente para evitar errores */}
      {/** 
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
      **/}
    </Navbar>
  );
}
