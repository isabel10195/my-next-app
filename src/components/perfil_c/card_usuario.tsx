import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Calendar, Mail, Users } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/app/context/AuthContext"; // 🔥 Importamos el contexto de autenticación
import Image  from "next/image";

interface ProfileData {
  avatar_url?: string;
  name?: string;
  user_handle?: string;
  bio?: string;
  location?: string;
  birthday?: string;
  email?: string;
  followers?: number;
  following?: number;
}

interface CardUsuarioProps {
  profileData?: ProfileData | null;
}

const CardUsuario: React.FC<CardUsuarioProps> = ({ profileData }) => {
  const { user } = useAuth(); // 🔥 Obtenemos el usuario autenticado

  // 📌 Si no hay usuario autenticado, mostramos un mensaje
  if (!user) {
    return (
      <Card className="mb-8 text-gray-900 dark:text-white bg-white dark:bg-gray-900 border-none overflow-hidden shadow-xl">
        <CardContent className="p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300">Inicia sesión</h2>
          <p className="text-gray-700 dark:text-gray-400">Inicia sesión para ver la información del perfil.</p>
        </CardContent>
      </Card>
    );
  }

  // 📌 Si el usuario está autenticado, mostramos la información del perfil
  return (
    <Card className="mb-8 text-gray-900 dark:text-white bg-white dark:bg-gray-900 border-none overflow-hidden shadow-xl">
      <div className="relative">
        <Image
          src="/placeholder.jpg"
          alt="Cover"
          width={500}
          height={200}
          className="w-full h-28 object-cover"
          priority
        />
        <Image
          src={profileData?.avatar_url || "/placeholder.jpg"}
          alt="Avatar"
          width={144} // Equivalente a w-36 en Tailwind
          height={144} // Equivalente a h-36 en Tailwind
          className="w-36 h-36 rounded-full border-2 border-gray-300 shadow-xl dark:border-gray-300 absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2"
        />
    </div>

      <CardContent className="mt-20 p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300">{profileData?.name || "Usuario"}</h2>
        <p className="text-gray-700 dark:text-gray-400">@{profileData?.user_handle || "handle"}</p>
        <p className="mt-2 text-gray-700 dark:text-gray-300 p-2">{profileData?.bio || "Sin biografía"}</p>

        <Separator className="bg-gray-300 dark:bg-gray-800" />

        <div className="mt-6 space-y-3 text-left">
          {profileData?.location && (
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <span className="text-gray-700 dark:text-gray-300">{profileData.location}</span>
            </div>
          )}
          {profileData?.birthday && (
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <span className="text-gray-700 dark:text-gray-300">{profileData.birthday}</span>
            </div>
          )}
          {profileData?.email && (
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <a href={`mailto:${profileData.email}`} className="text-gray-700 dark:text-gray-300 hover:text-blue-300 hover:underline">
                {profileData.email}
              </a>
            </div>
          )}
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <span className="text-gray-700 dark:text-gray-300">
              {profileData?.followers ?? 0} seguidores · {profileData?.following ?? 0} seguidos
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardUsuario;
