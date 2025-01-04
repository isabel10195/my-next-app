"use client"

import { useState } from "react";
import { Play, Pause } from 'lucide-react';
import Image from 'next/image';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
} from "@nextui-org/react";

export default function CombinedNavbar() {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <Navbar shouldHideOnScroll className="bg-white dark:bg-gray-950 border-b">
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
            <Link href="/pages/faqs">FAQs</Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/pages/feed">Feed</Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/pages/profile">Perfil</Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/pages/settings">Settings</Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/pages/chats">Mensajes</Link>
          </NavbarItem>
        </NavbarContent>
        
        <NavbarContent className="flex items-center gap-4" justify="end">
          <NavbarItem>
            <div className="flex items-center gap-2 cursor-pointer" onClick={togglePlayPause}>
              {isPlaying ? (
                <Pause className="h-5 w-5 text-gray-900 dark:text-white" />
              ) : (
                <Play className="h-5 w-5 text-gray-900 dark:text-white" />
              )}
              <span className="text-gray-900 dark:text-white">5,810</span>
            </div>
          </NavbarItem>
          <NavbarItem>
            <button className="rounded-full border px-3 py-1 text-sm hover:bg-gray-50 dark:border-gray-600 dark:text-white dark:hover:bg-gray-800">
              Subscribe for €2.50
            </button>
          </NavbarItem>
        </NavbarContent>
      </div>
    </Navbar>
  );
}

