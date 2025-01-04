"use client"

import { 
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  Link,
} from "@nextui-org/react";
import { Facebook, Twitter, Instagram, Youtube, Linkedin } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  return (
        
    <footer className="bg-gradient-to-b from-gray-50 to-gray-400 text-black pt-40 pb-10">
      <div className="container mx-auto px-4">

        {/* Main Links Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-black font-semibold mb-4">Compañía</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-black hover:text-gray-800">Sobre Nosotros</Link></li>
              <li><Link href="/offerings" className="text-black hover:text-gray-800">Nuestros Servicios</Link></li>
              <li><Link href="/news" className="text-black hover:text-gray-800">Noticias</Link></li>
              <li><Link href="/blog" className="text-black hover:text-gray-800">FAQs</Link></li>

            </ul>
          </div>
          
          <div>
            <h3 className="text-black font-semibold mb-4">Productos</h3>
            <ul className="space-y-3">
              <li><Link href="/services" className="text-black hover:text-gray-800">Servicios</Link></li>
              <li><Link href="/business" className="text-black hover:text-gray-800">Para Empresas</Link></li>
              <li><Link href="/premium" className="text-black hover:text-gray-800">Premium</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-black font-semibold mb-4">Recursos</h3>
            <ul className="space-y-3">
              <li><Link href="/safety" className="text-black hover:text-gray-800">Seguridad</Link></li>
              <li><Link href="/diversity" className="text-black hover:text-gray-800">Diversidad e Inclusión</Link></li>
              <li><Link href="/help" className="text-black hover:text-gray-800">Centro de Ayuda</Link></li>
            </ul>
          </div>
        </div>

        {/* Social Media and Bottom Section */}
        <div className="border-t border-gray-700 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6 mb-4 md:mb-0">
              <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <Facebook className="h-5 w-5 text-black hover:text-gray-800" />
              </Link>
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-5 w-5 text-black hover:text-gray-800" />
              </Link>
              <Link href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <Youtube className="h-5 w-5 text-black hover:text-gray-800" />
              </Link>
              <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5 text-black hover:text-gray-800" />
              </Link>
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-5 w-5 text-black hover:text-gray-800" />
              </Link>
            </div>
          </div>

          <div className=" text-center md:text-right text-sm text-gray-700">
            © 2025 LURE. Todos los derechos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
}

