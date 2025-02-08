"use client";

import { useState, FormEvent } from "react";
import Axios from "axios";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";


export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!username || !email || !firstName || !lastName || !phoneNumber || !password || !confirmPassword) {
      setError("Por favor, completa todos los campos.");
      setTimeout(() => setError(""), 3000);
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      setTimeout(() => setError(""), 3000);
      return;
    }

    setError("");
    addUser();
  };

  const addUser = () => {
    Axios.post("http://localhost:3001/api/auth/create", {
      user_handle: username,
      email_address: email,
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      password: password,
    })
      .then(() => {
        setSuccessMessage("Usuario creado correctamente");
        setTimeout(() => setSuccessMessage(""), 3000);
        setUsername("");
        setEmail("");
        setFirstName("");
        setLastName("");
        setPhoneNumber("");
        setPassword("");
        setConfirmPassword("");
      })
      .catch(() => {
        setError("Hubo un error al crear el usuario.");
        setTimeout(() => setError(""), 3000);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-200 dark:bg-gray-950 text-gray-900 dark:text-white">
      <div className="w-full max-w-[1200px] grid lg:grid-cols-2 rounded-2xl overflow-hidden shadow-2xl border border-gray-300 dark:border-gray-700">
        {/* Sección izquierda */}
          
        <div className="relative hidden lg:block bg-gradient-to-br from-blue-800 via-blue-700 to-blue-600 p-12 text-white">
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-blue-700/30 blur-xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full bg-blue-600/30 blur-xl"></div>
            <div className="absolute top-1/2 left-1/2 w-24 h-24 rounded-full bg-blue-500/30 blur-lg"></div>
          </div>
          <div className="relative">
            <div className="flex items-center gap-2 mb-16">
              <div className="w-8 h-8 border-2 border-white rounded-full"></div>
              <div className="w-8 h-8 border-2 border-white rounded-full -ml-4"></div>
              <Image 
                src="/logo.png" 
                alt="Logo de LA ISLA DE LURE" 
                width={150} 
                height={150} 
              />
            </div>
            <h1 className="text-4xl font-bold mb-4">Regístrate</h1>
            <p className="text-lg opacity-90">Crea una cuenta para continuar</p>
          </div>
        </div>

  
        {/* Sección derecha */}
        <Card className="lg:rounded-none shadow-none p-8 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
          <h2 className="text-2xl font-semibold mb-6">Registro</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Inputs */}
            <Input
              type="text"
              placeholder="Nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border-0 border-b border-gray-300 dark:border-gray-700 px-0 focus-visible:ring-0 focus-visible:border-blue-500"
            />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-0 border-b border-gray-300 dark:border-gray-700 px-0 focus-visible:ring-0 focus-visible:border-blue-500"
            />
            <Input
              type="text"
              placeholder="Primer Nombre"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="border-0 border-b border-gray-300 dark:border-gray-700 px-0 focus-visible:ring-0 focus-visible:border-blue-500"
            />
            <Input
              type="text"
              placeholder="Apellido"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="border-0 border-b border-gray-300 dark:border-gray-700 px-0 focus-visible:ring-0 focus-visible:border-blue-500"
            />
            <Input
              type="tel"
              placeholder="Número Telefónico"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="border-0 border-b border-gray-300 dark:border-gray-700 px-0 focus-visible:ring-0 focus-visible:border-blue-500"
            />
  
            {/* Contraseña */}
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-0 border-b border-gray-300 dark:border-gray-700 px-0 pr-10 focus-visible:ring-0 focus-visible:border-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
  
            {/* Botón de registro */}
            <div>
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition"
              >
                Registrarse
              </button>
            </div>
          </form>
  
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              ¿Ya tienes una cuenta?{" "}
              <a href="/pages/login" className="text-blue-500 hover:text-blue-600">
                Iniciar Sesión
              </a>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
  
  
  
}
