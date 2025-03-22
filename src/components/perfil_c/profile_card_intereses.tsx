"use client";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// 🔥 Definimos la estructura de los props
interface CardInteresesProps {
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
  interests: string[];
  renderTagsWithColors: (tags: string[]) => React.ReactNode;
}

const CardIntereses: React.FC<CardInteresesProps> = ({ user, interests, renderTagsWithColors }) => {
  if (!user) {
    return (
      <Card className="mb-8 text-gray-900 dark:text-white bg-white dark:bg-gray-900 border-none shadow-xl">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">Intereses</CardTitle>
        </CardHeader>
        <Separator className="bg-gray-300 dark:bg-gray-800" />
        <CardContent className="p-6 text-center">
          <p className="text-gray-500 dark:text-gray-300">Inicia sesión para ver los intereses.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-8 text-gray-900 dark:text-white bg-white dark:bg-gray-900 border-none shadow-xl">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">Intereses</CardTitle>
      </CardHeader>
      <Separator className="bg-gray-300 dark:bg-gray-800" />
      <CardContent className="pt-6">
        {interests.length > 0 ? (
          <div className="flex flex-wrap gap-2">{renderTagsWithColors(interests)}</div>
        ) : (
          <p className="text-gray-500 dark:text-gray-300 text-center">No tienes intereses.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default CardIntereses;
