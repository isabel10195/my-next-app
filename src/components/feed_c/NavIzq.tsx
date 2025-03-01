"use client"

import { Home, User, Bell, Mail, Bookmark, List, MoreHorizontal, Menu, X } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState } from "react"

const menuItems = [
  { icon: Home, label: "Inicio" },
  { icon: User, label: "Perfil" },
  { icon: Bell, label: "Notificaciones" },
  { icon: Mail, label: "Mensajes" },
  { icon: Bookmark, label: "Marcados" },
  { icon: List, label: "Listas" },
  { icon: MoreHorizontal, label: "Más" },
]

export default function LeftSidebar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => setIsOpen(!isOpen)

  return (
    <>
      {/* Icono hamburguesa*/}
      <button
        className="fixed lg:hidden top-4 left-1 z-50 p-2 xl:hidden"
        onClick={toggleSidebar}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5 text-gray-900 dark:text-gray-300" />}
      </button>

      {/* Capa de fondo */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-md z-40 xl:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Menú lateral */}
      <aside
        className={`
          fixed h-screen rounded-xl z-50 bg-white dark:bg-gray-900 shadow-lg overflow-y-auto flex flex-col p-4 w-64 -ml-6 transition-transform duration-200 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0  
          xl:block xl:translate-x-0  
        `}
      >
        <div className="flex items-center justify-between mb-6 mt-6">
          <div className="flex items-center space-x-4 mb-4">
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" alt="@username" />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
            <div className="hidden sm:block">
              <p className="font-semibold text-gray-900 dark:text-white">Username</p>
              <p className="text-sm text-gray-500 dark:text-gray-300">@username</p>
            </div>
          </div>
          {/* Botón X solo dentro del menú cuando está abierto */}
          {isOpen && (
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-900 dark:text-white xl:hidden"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          )}
        </div>

        <nav>
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.label}>
                <a
                  href="#"
                  className="flex items-center space-x-4 p-2 rounded-xl hover:bg-blue-200 dark:hover:bg-gray-600">
                  <item.icon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                  <span className="text-gray-900 dark:text-white">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  )
}
