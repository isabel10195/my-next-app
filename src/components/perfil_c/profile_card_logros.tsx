"use client";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";

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
  achievements: string[];
  editable?: boolean;
}

const CardLogros: React.FC<CardLogrosProps> = ({ user, achievements, editable = false }) => {
  const [logros, setLogros] = useState<string[]>(achievements);
  const [newLogro, setNewLogro] = useState("");
  const [showInput, setShowInput] = useState(false);

  // ✅ Sincroniza los logros cuando cambian las props
  useEffect(() => {
    setLogros(achievements);
  }, [achievements]);

  const handleAddLogro = async () => {
    const trimmed = newLogro.trim();
    if (!trimmed) return;

    try {
      const res = await fetch("/api/users/details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          category: "achievement",
          detail_text: trimmed,
        }),
      });

      if (!res.ok) throw new Error("Error al añadir logro");

      setLogros((prev) => [...prev, trimmed]);
      setNewLogro("");
      setShowInput(false);
    } catch (error) {
      console.error("❌ Error al guardar logro:", error);
    }
  };

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
        {logros.length > 0 ? (
          <ul className="list-disc pl-5 space-y-2 mb-4">
            {logros.map((logro, index) => (
              <li key={index} className="text-gray-300">{logro}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 dark:text-gray-300 text-center mb-4">
            {editable
              ? "No tienes logros por ahora. ¡Añádelos!"
              : "Este usuario aún no ha compartido logros."}
          </p>
        )}

        {editable && (
          showInput ? (
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={newLogro}
                onChange={(e) => setNewLogro(e.target.value)}
                placeholder="Nuevo logro"
                className="w-full sm:w-auto p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white"
              />
              <button
                onClick={handleAddLogro}
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
              + Añadir logro
            </button>
          )
        )}
      </CardContent>
    </Card>
  );
};

export default CardLogros;
