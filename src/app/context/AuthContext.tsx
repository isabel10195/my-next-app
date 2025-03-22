'use client';

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Cargar token desde localStorage solo en cliente
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    } else {
      setLoading(false); // si no hay token, deja de cargar
    }
  }, []);

  // Autenticar si hay token
  useEffect(() => {
    if (!token) return;

    fetch("/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) {
          setUser(data.user);
        } else {
          localStorage.removeItem("token");
          setToken(null);
        }
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, [token]);

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });

      localStorage.removeItem("token");
      setUser(null);
      setToken(null);
      router.push("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, setUser, setToken, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
  
  // The  AuthProvider  component is responsible for managing the user's authentication state. It uses two  useEffect  hooks to load the token from localStorage and authenticate the user if a token is found. 
  // The  useAuth  hook is a custom hook that allows us to access the authentication context from any component. 
  // Now, let's use the  AuthProvider  in the  _app.tsx  file to wrap the entire application.