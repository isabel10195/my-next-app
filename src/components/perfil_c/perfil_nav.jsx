"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Home, User, Bell, Mail, Bookmark, Settings, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Definimos los ítems del menú para evitar repetición
const menuItems = [
  { icon: Home, label: "Inicio", path: "/" },
  { icon: User, label: "Perfil", path: "/pages/profile" },
  { icon: Bell, label: "Notificaciones", path: "/pages/notifications" },
  { icon: Mail, label: "Mensajes", path: "/pages/chats" },
  { icon: Settings, label: "Configuración", path: "/pages/settings" },
];

export default function Sidebar() {
  const router = useRouter();

  const handleLogout = () => {
    // Cierre de sesión
    console.log("Cerrando sesión...");
    // Redirigir al usuario a la página de login después de cerrar sesión
    router.push("/login");
  };

  return (
    <>
      {/* Menu en barra arriba para pantallas pequeñas */}
      <div className="xl:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-800 shadow-lg z-50">
        <div className="flex justify-around p-3">
          {menuItems.slice(0, 4).map((item) => (
            <Link key={item.label} href={item.path}>
              <item.icon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            </Link>
          ))}
          {/* Icono logout */}
          <button onClick={handleLogout}>
            <LogOut className="h-6 w-6 text-red-500" />
          </button>
        </div>
      </div>

      {/* Sidebar lateral en pantallas grandes */}
      <aside className="hidden xl:flex flex-col fixed h-screen w-64 p-4 bg-white dark:bg-gray-900 shadow-lg overflow-y-auto">
        <div className="flex items-center space-x-4 mb-6 mt-6 text-gray-500 dark:text-gray-300">
          <Avatar>
            <AvatarImage src="/placeholder-user.jpg" alt="@username" />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">Username</p>
            <p className="text-sm text-gray-500 dark:text-gray-300">@username</p>
          </div>
        </div>

        {/* Lista de navegación */}
        <nav>
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
              {/* Botón de Cerrar Sesión */}
          <div className="mt-10">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-4 p-2 rounded-xl text-red-400 hover:bg-red-100 dark:hover:bg-gray-700 cursor-pointer w-full"
            >
              <LogOut className="h-6 w-6" />
              <span>Cerrar sesión</span>
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
}
