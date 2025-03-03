"use client";

import { Home, User, Bell, Mail, Bookmark, Settings, MoreHorizontal, Menu, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useEffect } from "react";
import { fetchUserData } from "@/server/service/userService";
import Link from "next/link";

const menuItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: User, label: "Profile", path: "/pages/profile" },
  { icon: Bell, label: "Notifications", path: "/pages/notifications" },
  { icon: Mail, label: "Messages", path: "/pages/chats" },
  { icon: Bookmark, label: "Bookmarks", path: "/pages/bookmarks" },
  { icon: Settings, label: "Ajustes", path: "/pages/settings" },
  { icon: MoreHorizontal, label: "More", path: "/pages/more" },
];

export default function LeftSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<{ first_name: string; last_name: string; user_handle: string; avatar_url: string } | null>(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await fetchUserData();
        setUser(data);
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      }
    };
    getUserData();
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Botón para abrir/cerrar menú en móvil */}
      <button
        className="fixed lg:hidden top-4 left-1 z-50 p-2"
        onClick={toggleSidebar}
        aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5 text-gray-900 dark:text-gray-300" />}
      </button>

      {/* Fondo oscuro cuando el menú está abierto */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-md z-40 lg:hidden" onClick={toggleSidebar} />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed h-screen rounded-xl z-50 bg-white dark:bg-gray-900 shadow-lg overflow-y-auto flex flex-col p-4 w-64 transition-transform duration-200 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
        `}
      >
        {/* Perfil de usuario */}
        <div className="flex items-center space-x-4 mb-6 mt-6">
          <Avatar>
          <AvatarImage src={user?.avatar_url || "/placeholder.jpg"} alt={user?.user_handle || "Usuario"} />
          <AvatarFallback>{user ? `${user.first_name[0]}${user.last_name[0]}` : "UN"}</AvatarFallback>
          </Avatar>
          <div className="hidden sm:block">
            <p className="font-semibold text-gray-900 dark:text-white">
              {user ? `${user.first_name} ${user.last_name}` : "Username"}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              {user ? `@${user.user_handle}` : "@username"}
            </p>
          </div>
        </div>

        {/* Navegación */}
        <nav>
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.label}>
                <Link href={item.path} className="flex items-center space-x-4 p-2 rounded-xl hover:bg-blue-200 dark:hover:bg-gray-600 cursor-pointer">
                  <item.icon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                  <span className="text-gray-900 dark:text-white">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
