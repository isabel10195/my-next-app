"use client";

import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Calendar, Mail, Users } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";

// 🔹 Modificamos el componente para recibir los datos del usuario como prop
type CardUsuarioProps = {
  user: {
    name: string;
    user_handle: string;
    avatarUrl?: string;
    coverUrl?: string;
    bio?: string;
    location?: string;
    birthday?: string;
    email?: string;
    followers: number;
    following: number;
  } | null;
};

const CardUsuario: React.FC<CardUsuarioProps> = ({ user }) => {
  // 🔹 Si el usuario no está autenticado, mostramos un mensaje en lugar de intentar renderizar datos inexistentes
  if (!user) {
    return (
      <Card className="mb-8 text-gray-900 dark:text-white bg-white dark:bg-gray-900 border-none overflow-hidden shadow-xl">
        <CardContent className="p-6 text-center">
          <p className="text-gray-500 dark:text-gray-300">Inicia sesión para ver la información del perfil.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-8 text-gray-900 dark:text-white bg-white dark:bg-gray-900 border-none overflow-hidden shadow-xl">
      {/* 🔹 Imagen de portada y Avatar */}
      <div className="relative">
        <Image 
          src={user.coverUrl || "/placeholder.jpg"} 
          alt="Cover" 
          width={600} 
          height={112} 
          className="w-full h-28 object-cover" 
          priority 
        />
        <Avatar className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-36 h-36 border-2 border-gray-300 shadow-xl dark:border-gray-300">
          <AvatarImage src={user.avatarUrl || "/placeholder.svg"} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
      </div>

      {/* 🔹 Información del usuario */}
      <CardContent className="mt-20 p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300">{user.name}</h2>
        <p className="text-gray-700 dark:text-gray-400">@{user.user_handle}</p>
        <p className="mt-2 text-gray-700 dark:text-gray-300 p-2">{user.bio || "Sin biografía"}</p>

        <Separator className="bg-gray-300 dark:bg-gray-800" />

        {/* 🔹 Lista de detalles */}
        <div className="mt-6 space-y-3 text-left">
          {user.location && (
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <span className="text-gray-700 dark:text-gray-300">{user.location}</span>
            </div>
          )}
          {user.birthday && (
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <span className="text-gray-700 dark:text-gray-300">{user.birthday}</span>
            </div>
          )}
          {user.email && (
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <a href={`mailto:${user.email}`} className="text-gray-700 dark:text-gray-300 hover:text-blue-300 hover:underline">
                {user.email}
              </a>
            </div>
          )}
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {user.followers} seguidores • {user.following} seguidos
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardUsuario;
