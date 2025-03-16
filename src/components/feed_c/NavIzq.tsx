"use client";

import { Home, User, Bell, Mail, Bookmark, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useEffect } from "react";
import { fetchUserData } from "@/server/service/userService";
import Link from "next/link";

const menuItems = [
  { icon: Home, label: "Inicio", path: "/" },
  { icon: User, label: "Perfil", path: "/pages/profile" },
  { icon: Bell, label: "Notificationes", path: "/pages/notifications" },
  { icon: Mail, label: "Mensajes", path: "/pages/chats" },
  { icon: Bookmark, label: "Bookmarks", path: "/pages/bookmarks" },
  { icon: Settings, label: "Configuración", path: "/pages/settings" },
];

export default function LeftSidebar() {
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

  return (
    <>
      {/* Menú en barra inferior para pantallas pequeñas */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-800 shadow-lg z-50">
        <div className="flex justify-around p-3">
          {menuItems.map((item) => (
            <Link key={item.label} href={item.path}>
              <item.icon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            </Link>
          ))}
        </div>
      </div>

      {/* Sidebar lateral en pantallas grandes */}
      <aside className="hidden lg:flex flex-col fixed h-[90vh] w-64 p-4 bg-white dark:bg-gray-900 shadow-lg overflow-hidden rounded-xl">
        {user ? (
          <div className="flex flex-col items-center space-y-2 mb-6 mt-6 text-gray-500 dark:text-gray-300">
            <Avatar className="w-20 h-20 border-2 border-gray-300 shadow-xl dark:border-gray-300">
              <AvatarImage src={user.avatar_url || "/placeholder.svg"} alt={user.user_handle} />
              <AvatarFallback>{user.first_name?.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <p className="font-semibold text-gray-900 dark:text-white">{user.first_name} {user.last_name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-300">@{user.user_handle}</p>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-300 my-6">
            <p>Inicia sesión para ver tu perfil</p>
            <Link href="/pages/login" className="text-blue-500 hover:underline">
              Ir al login
            </Link>
          </div>
        )}

        {/* Lista de navegación */}
        <nav className="flex-1">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.label}>
                <Link href={item.path}>
                  <div className="flex items-center space-x-4 p-2 rounded-xl hover:bg-blue-200 dark:hover:bg-gray-600 cursor-pointer">
                    <item.icon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                    <span className="text-gray-900 dark:text-white">{item.label}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
