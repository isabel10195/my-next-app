"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // ✅ Importación corregida

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // ✅ Define el router dentro del contexto

  // Verificar autenticación en el backend al cargar la app
  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) {
          setUser(data.user);
        }
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  // Función para cerrar sesión
  const logout = async () => {
    try {
      await fetch("http://localhost:3001/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
      router.refresh(); // Forzar re-render en la misma ruta
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };  

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado para usar el contexto
export function useAuth() {
  return useContext(AuthContext);
}
