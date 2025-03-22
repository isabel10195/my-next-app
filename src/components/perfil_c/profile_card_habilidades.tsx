"use client";

import { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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
  skills?: string[];
  onAddSkill?: (skill: string) => Promise<void>;
  onDeleteSkill?: (skill: string) => Promise<void>;
}

const CardHabilidades: React.FC<CardHabilidadesProps> = ({
  user,
  skills = [],
  onAddSkill,
  onDeleteSkill,
}) => {
  const [newSkill, setNewSkill] = useState("");
  const [showInput, setShowInput] = useState(false);

  if (!user) {
    return (
      <Card className="mb-8 text-gray-900 dark:text-white bg-white dark:bg-gray-900 border-none shadow-xl">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">Habilidades</CardTitle>
        </CardHeader>
        <Separator className="bg-gray-300 dark:bg-gray-800" />
        <CardContent className="p-6 text-center">
          <p className="text-gray-500 dark:text-gray-300">
            Inicia sesión para ver las habilidades.
          </p>
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
          <div className="flex flex-wrap gap-2 mb-4">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="flex items-center bg-blue-600 text-white px-3 py-1 rounded-full shadow"
              >
                <span>{skill}</span>
                {onDeleteSkill && (
                  <button
                    onClick={() => onDeleteSkill(skill)}
                    className="ml-2 text-sm font-bold hover:text-red-300"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-300 text-center mb-4">
            No tienes habilidades.
          </p>
        )}

        {showInput ? (
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Nueva habilidad"
              className="w-full sm:w-auto p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white"
            />
            <button
              onClick={async () => {
                if (onAddSkill && newSkill.trim()) {
                  await onAddSkill(newSkill.trim());
                  setNewSkill("");
                  setShowInput(false);
                }
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              Guardar
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowInput(true)}
            className="mt-2 text-sm text-blue-500 hover:underline"
          >
            + Añadir habilidad
          </button>
        )}
      </CardContent>
    </Card>
  );
};

export default CardHabilidades;
