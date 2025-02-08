'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Axios from 'axios'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter } from 'lucide-react'
import Image from "next/image";

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!username || !password) {
      setError('Please fill in all fields.')
      return
    }

    try {
      setLoading(true)
      setError('') // Reset error message before trying

      const response = await Axios.post(
        'http://localhost:3001/login',
        { user_handle: username, password, rememberMe },
        { withCredentials: true }
      )

      if (response.status === 200) {
        router.push('/dashboard') // Redirect after successful login
      }
    } catch (err: any) {
      setError(err.response?.data || 'Error logging in. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="flex w-full max-w-5xl h-[600px] bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
        {/* Sección izquierda - Ilustración */}
        <div className="relative w-1/2 bg-blue-800 dark:bg-blue-900 text-white p-12 overflow-hidden">
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
              <div>
                <Input
                  type="text"
                  placeholder="Nombre de Usuario"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="Contraseña"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
  
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
                  Recuerdame
                </label>
              </div>
  
              <Button
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition"
                type="submit"
                disabled={loading}
              >
                {loading ? "Signing In..." : "Sign In"}
              </Button>
            </div>
  
            {error && (
              <div className="text-red-500 text-sm text-center">
                {error}
              </div>
            )}
  
            <div className="space-y-4">
              <div className="text-center">
                <span className="text-sm text-gray-500 dark:text-gray-300">
                  No tienes cuenta?{" "}
                </span>
                <Link
                  href="/pages/register"
                  className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500"
                >
                  Regístrate
                </Link>
              </div>
  
              <div className="text-center">
                <Link
                  href="/forgot-password"
                  className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500"
                >
                  He olvidado mi contraseña
                </Link>
              </div>
  
              <div className="space-y-2">
                <div className="text-center text-sm text-gray-500 dark:text-gray-300">
                  Iniciar sesión con...
                </div>
  
                <div className="flex justify-center space-x-3">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full w-12 h-12 flex items-center justify-center bg-gray-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400"
                  >
                    <Facebook className="w-6 h-6" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full w-12 h-12 flex items-center justify-center bg-gray-100 dark:bg-gray-700 text-blue-400 dark:text-blue-300"
                  >
                    <Twitter className="w-6 h-6" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full w-12 h-12 flex items-center justify-center bg-gray-100 dark:bg-gray-700"
                  >
                    <svg className="w-6 h-6" viewBox="0 0 24 24">
                      <path
                        fill="#EA4335"
                        d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z"
                      />
                      <path
                        fill="#34A853"
                        d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.067A11.965 11.965 0 0 0 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987Z"
                      />
                      <path
                        fill="#4A90E2"
                        d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21Z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067Z"
                      />
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
             {/* Botón para ir al Home */}
          <div className="mt-6">
            <Link href="/" className="block text-center">
              <Button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md transition">
                Ir al Home
              </Button>
            </Link>
          </div>
          </form>
        </Card>
      </div>
    </div>
  );
  
}
