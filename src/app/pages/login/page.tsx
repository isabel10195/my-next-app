'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Axios from 'axios';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Facebook, Twitter } from 'lucide-react';
import Image from "next/image";

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const response = await Axios.post(
        'http://localhost:3001/login',
        { user_handle: username, password, rememberMe },
        { withCredentials: true }
      );

      if (response.status === 200) {
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err.response?.data || 'Error al iniciar sesión. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="flex w-full max-w-5xl h-[600px] bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
        {/* Sección izquierda - Degradado azul */}
        <div className="relative w-1/2 bg-gradient-to-b from-blue-400 to-blue-900 text-white p-12 overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-5xl font-bold mb-2">Bienvenido a Lure</h1>
            <p className="text-lg text-blue-200">Por favor, inicia sesión.</p>
          </div>
        </div>
  
        {/* Sección derecha - Formulario de inicio de sesión */}
        <Card className="w-1/2 p-12 flex flex-col justify-center bg-gray-50 dark:bg-gray-800">
          <form onSubmit={handleLogin} className="w-full max-w-sm mx-auto space-y-6">
            <div className="space-y-2">
              <Image 
                src="/logo.png" 
                alt="Logo de LA ISLA DE LURE" 
                width={150} 
                height={150} 
              />
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Iniciar Sesión</h2>
            </div>
  
            <div className="space-y-4">
              <Input
                type="text"
                placeholder="Nombre de Usuario"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Contraseña"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
  
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(!!checked)}
                  className="text-blue-500 dark:text-blue-400"
                />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none text-gray-700 dark:text-gray-300"
                >
                  Recuérdame
                </label>
              </div>
  
              <Button
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition"
                type="submit"
                disabled={loading}
              >
                {loading ? "Iniciando..." : "Iniciar Sesión"}
              </Button>
            </div>
  
            {error && (
              <div className="text-red-500 text-sm text-center">
                {error}
              </div>
            )}
          </form>
  
          {/* Enlace para volver al inicio */}
          <div className="mt-6 text-center">
            <Link href="/" className="text-blue-500 hover:text-blue-600">
              ← Volver al inicio
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
