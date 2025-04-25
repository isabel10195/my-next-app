"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Calendar, Mail, Users } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";

type CardUsuarioProps = {
  user: {
    user_id: number; // ✅ necesario para follow/unfollow
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
  isFollowing?: boolean;
  isOwnProfile?: boolean;
  onToggleFollow?: () => void;
};

const CardUsuario: React.FC<CardUsuarioProps> = ({ user, isFollowing: initialIsFollowing = false, isOwnProfile, onToggleFollow }) => {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);

  const handleToggleFollow = async () => {
    if (!user) return;
    try {
      const endpoint = isFollowing ? "/api/followers/unfollow" : "/api/followers/follow";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ follow_user_id: user.user_id }), // ✅ usar user_id como espera el backend
      });

      if (res.ok) {
        setIsFollowing((prev) => !prev);
      } else {
        const errData = await res.json();
        console.error("❌ Error al seguir/dejar de seguir:", errData?.error);
      }
    } catch (error) {
      console.error("❌ Error al seguir/dejar de seguir:", error);
    }
  };

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
          <AvatarImage src={user.avatarUrl} alt={user.name} />
          <AvatarFallback>{user.name?.charAt(0)?.toUpperCase() || "U"}</AvatarFallback>
        </Avatar>
      </div>

      <CardContent className="mt-20 p-6 text-center relative">
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300">{user.name}</h2>
        <p className="text-gray-700 dark:text-gray-400">@{user.user_handle}</p>

        {!isOwnProfile && onToggleFollow &&(
          <button
            onClick={handleToggleFollow}
            className="absolute top-4 right-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-full text-sm transition-all"
          >
            {isFollowing ? "Dejar de seguir" : "Seguir"}
          </button>
        )}

        <p className="mt-2 text-gray-700 dark:text-gray-300 p-2">{user.bio || "Sin biografía"}</p>

        <Separator className="bg-gray-300 dark:bg-gray-800" />

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
              <span className="text-gray-700 dark:text-gray-300">
                {new Date(user.birthday).toLocaleDateString("es-ES", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </span>
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
