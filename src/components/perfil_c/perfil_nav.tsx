"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Home, User, Bell, Mail, Settings, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/app/context/AuthContext";

// Definimos una interfaz para los ítems del menú
interface MenuItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

// Lista de ítems del menú
const menuItems: MenuItem[] = [
  { icon: Home, label: "Inicio", path: "/" },
  { icon: User, label: "Perfil", path: "/pages/profile" },
  { icon: Bell, label: "Notificaciones", path: "/pages/notifications" },
  { icon: Mail, label: "Mensajes", path: "/pages/chats" },
  { icon: Settings, label: "Configuración", path: "/pages/settings" },
];

export default function Sidebar() {
  const router = useRouter();
  const { user, setUser } = useAuth(); // 🔥 Obtenemos el estado de autenticación

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:3001/api/auth/logout", {
        method: "POST",
        credentials: "include", // 🔥 Importante para enviar la cookie
      });
  
      setUser(null); // Eliminamos el usuario del contexto
      router.push("/pages/login"); // Redirigimos al login
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };
  

  return (
    <>
      {/* Menú en barra inferior para pantallas pequeñas */}
      <div className="xl:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-800 shadow-lg z-50">
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
        {user ? ( // 🔥 Solo mostramos el perfil si el usuario está logueado
          <div className="flex items-center space-x-4 mb-6 mt-6 text-gray-500 dark:text-gray-300">
            <Avatar>
              <AvatarImage src={user.avatar_url || "/placeholder-user.jpg"} alt={`@${user.user_handle}`} />
              <AvatarFallback>{user.user_handle?.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
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

          {/* Botón de Cerrar Sesión (solo si está logueado) */}
          {user && (
            <div className="mt-10">
              <button
                onClick={handleLogout}
                className="flex items-center space-x-4 p-2 rounded-xl text-red-400 hover:bg-red-100 dark:hover:bg-gray-700 cursor-pointer w-full"
              >
                <LogOut className="h-6 w-6" />
                <span>Cerrar sesión</span>
              </button>
            </div>
          )}
        </nav>
      </aside>
    </>
  );
}
