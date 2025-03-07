"use client";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// 🔥 Definimos la estructura de los props
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
  achievements?: string[];
}

const CardLogros: React.FC<CardLogrosProps> = ({ achievements = [] }) => {
  console.log("🎖️ Renderizando CardLogros con achievements:", achievements);

  if (!achievements || achievements.length === 0) {
    return (
      <Card className="mb-8 text-gray-900 dark:text-white bg-white dark:bg-gray-900 border-none shadow-xl">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">Logros</CardTitle>
        </CardHeader>
        <Separator className="bg-gray-300 dark:bg-gray-800" />
        <CardContent className="p-6 text-center">
          <p className="text-gray-500 dark:text-gray-300">No tienes logros por ahora. ¡Añádelos!</p>
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
        <ul className="list-disc pl-5 space-y-2">
          {achievements.map((achievement, index) => (
            <li key={index} className="text-gray-300">{achievement}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default CardLogros;
