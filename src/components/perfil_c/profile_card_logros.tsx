"use client";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/app/context/AuthContext";

// Definimos la estructura de los props
interface CardLogrosProps {
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
  achievements?: string[]; // 🔥 Ahora es opcional para evitar errores
}

const CardLogros: React.FC<CardLogrosProps> = ({ achievements = [] }) => {
  const { user } = useAuth(); // 🔥 Obtenemos el estado de autenticación

  if (!user) {
    return (
      <Card className="mb-8 text-gray-900 dark:text-white bg-white dark:bg-gray-900 border-none shadow-xl">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">Logros</CardTitle>
        </CardHeader>
        <Separator className="bg-gray-300 dark:bg-gray-800" />
        <CardContent className="p-6 text-center">
          <p className="text-gray-500 dark:text-gray-300">Inicia sesión para ver los logros.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-8 text-gray-900 dark:text-white bg-white dark:bg-gray-900 border-none shadow-xl">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">Logros</CardTitle>
      </CardHeader>
      <Separator className="bg-gray-300 dark:bg-gray-800" />
      <CardContent className="pt-6">
        {achievements.length > 0 ? ( // 🔥 Ahora `achievements` nunca será undefined
          <ul className="list-disc pl-5 space-y-2">
            {achievements.map((achievement, index) => (
              <li key={index} className="text-gray-300">
                {achievement}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 dark:text-gray-300">No hay logros disponibles o no tienes.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default CardLogros;
