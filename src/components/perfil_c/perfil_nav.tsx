"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Home, User, Bell, Mail, Settings, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/app/context/AuthContext"; // 👈 IMPORTANTE

interface MenuItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

const menuItems: MenuItem[] = [
  { icon: Home, label: "Inicio", path: "/" },
  { icon: User, label: "Feed", path: "/pages/feed" },
  { icon: Mail, label: "Mensajes", path: "/pages/chats" },
  { icon: Settings, label: "Configuración", path: "/pages/settings" },
];

export default function PerfilNav() {
  const router = useRouter();
  const { user, logout } = useAuth(); // 👈 USAMOS logout DEL CONTEXTO

  return (
    <>
      {/* Menú inferior para móviles */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-800 shadow-lg z-50">
        <div className="flex justify-around p-3">
          {menuItems.slice(0, 4).map((item) => (
            <Link key={item.label} href={item.path}>
              <item.icon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            </Link>
          ))}
          {user && (
            <button onClick={logout}>
              <LogOut className="h-6 w-6 text-red-500" />
            </button>
          )}
        </div>
      </div>

      {/* Sidebar lateral en escritorio */}
      <aside className="hidden lg:flex flex-col fixed h-[90vh] w-64 p-4 bg-white dark:bg-gray-900 shadow-lg overflow-hidden rounded-xl">
        {user ? (
          <div className="flex flex-col items-center space-y-2 mb-6 mt-6 text-gray-500 dark:text-gray-300">
            <Avatar className="w-20 h-20 border-2 border-gray-300 shadow-xl dark:border-gray-300">
              <AvatarImage src={user.avatarUrl || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback>{user.name?.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <p className="font-semibold text-gray-900 dark:text-white">{user.name}</p>
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

        {/* Menú lateral */}
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

        {/* Botón cerrar sesión */}
        {user && (
          <div className="mt-auto">
            <button
              onClick={logout}
              className="flex items-center justify-center w-full p-3 rounded-xl text-red-400 hover:bg-red-100 dark:hover:bg-gray-700 cursor-pointer"
            >
              <LogOut className="h-6 w-6" />
              <span className="ml-2">Cerrar sesión</span>
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
