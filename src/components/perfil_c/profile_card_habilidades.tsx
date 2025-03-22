"use client";


import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Definimos la estructura de los props
interface CardHabilidadesProps {
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
  skills?: string[]; // 🔥 Ahora es opcional
}

const CardHabilidades: React.FC<CardHabilidadesProps> = ({ user, skills = [] }) => {
  if (!user) {
    return (
      <Card className="mb-8 text-gray-900 dark:text-white bg-white dark:bg-gray-900 border-none shadow-xl">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">Habilidades</CardTitle>
        </CardHeader>
        <Separator className="bg-gray-300 dark:bg-gray-800" />
        <CardContent className="p-6 text-center">
          <p className="text-gray-500 dark:text-gray-300">Inicia sesión para ver las habilidades.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-8 text-gray-900 dark:text-white bg-white dark:bg-gray-900 border-none shadow-xl">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">Habilidades</CardTitle>
      </CardHeader>
      <Separator className="bg-gray-300 dark:bg-gray-800" />
      <CardContent className="pt-6">
        {skills.length > 0 ? (
          <ul className="list-disc pl-5 space-y-2">
            {skills.map((skill, index) => (
              <li key={index} className="text-gray-300">
                {skill}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 dark:text-gray-300 text-center">No tienes habilidades.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default CardHabilidades;
