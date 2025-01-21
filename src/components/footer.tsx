"use client"

import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link } from "@nextui-org/react";
import { Facebook, Twitter, Instagram, Youtube, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400 pt-10 pb-10">
      <div className="container mx-auto px-4">

        {/* Main Links Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-gray-900 dark:text-white font-semibold mb-4">Compañía</h3>
            <ul className="space-y-3">
              <li><Link href="/pages/about" className="hover:text-gray-900 dark:hover:text-white">Sobre Nosotros</Link></li>
              <li><Link href="/offerings" className="hover:text-gray-900 dark:hover:text-white">Nuestros Servicios</Link></li>
              <li><Link href="https://www.abc.es" className="hover:text-gray-900 dark:hover:text-white">Noticias</Link></li>
              <li><Link href="/pages/faqs" className="hover:text-gray-900 dark:hover:text-white">FAQs</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-gray-900 dark:text-white font-semibold mb-4">Productos</h3>
            <ul className="space-y-3">
              <li><Link href="/pages/planes" className="hover:text-gray-900 dark:hover:text-white">Servicios</Link></li>
              <li><Link href="/business" className="hover:text-gray-900 dark:hover:text-white">Para Empresas</Link></li>
              <li><Link href="/premium" className="hover:text-gray-900 dark:hover:text-white">Premium</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-gray-900 dark:text-white font-semibold mb-4">Recursos</h3>
            <ul className="space-y-3">
              <li><Link href="/safety" className="hover:text-gray-900 dark:hover:text-white">Seguridad</Link></li>
              <li><Link href="/diversity" className="hover:text-gray-900 dark:hover:text-white">Diversidad e Inclusión</Link></li>
              <li><Link href="/help" className="hover:text-gray-900 dark:hover:text-white">Centro de Ayuda</Link></li>
            </ul>
          </div>
        </div>

        {/* Social Media and Bottom Section */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6 mb-4 md:mb-0">
              <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <Facebook className="h-5 w-5 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" />
              </Link>
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-5 w-5 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" />
              </Link>
              <Link href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <Youtube className="h-5 w-5 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" />
              </Link>
              <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" />
              </Link>
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-5 w-5 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" />
              </Link>
            </div>
          </div>

          <div className="text-center md:text-right text-sm text-gray-500 dark:text-gray-400">
            © 2025 LURE. Todos los derechos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
}
