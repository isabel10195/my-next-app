import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Upload } from "lucide-react";
import Image from "next/image";
import { useStories } from "@/app/hooks/useStories";
import { useAuth } from "@/app/context/AuthContext";
import { motion } from "framer-motion";

export default function StoriesSection() {
  const { user } = useAuth();
  const { stories = [], followingUsers = [], uploadStory } = useStories();
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextStory = () => {
    setCurrentIndex((prev) => (prev + 1) % stories.length);
  };

  const prevStory = () => {
    setCurrentIndex((prev) => (prev - 1 + stories.length) % stories.length);
  };

  let message = "";
  if (!user) {
    message = "No estás logueado. Inicia sesión para ver stories.";
  } else if (followingUsers.length === 0) {
    message = "No sigues a nadie, ¡anímate y sigue a alguien!";
  } else if (followingUsers.length > 0 && stories.length === 0) {
    message = "Nadie de tus seguidos ha subido nada, ¡sé tú el primero!";
  }

  return (
    <Card className="mb-6 bg-white dark:bg-gray-900 p-4 rounded-lg shadow-lg">
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="text-gray-900 dark:text-white">Stories</CardTitle>
        {user && (
          <label className="cursor-pointer bg-blue-500 text-white px-3 py-1 rounded-lg text-sm flex items-center gap-2">
            <Upload size={16} />
            Subir Story
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const imageUrl = URL.createObjectURL(file); // Simulación de carga (en un servidor real debes manejar el almacenamiento)
                  uploadStory(imageUrl, "Nueva historia");
                }
              }}
            />
          </label>
        )}
      </CardHeader>
      <CardContent>
        {message ? (
          <p className="text-center text-gray-500 dark:text-gray-400">{message}</p>
        ) : (
          <div className="relative flex items-center">
            <Button variant="ghost" size="icon" className="absolute left-0 z-10" onClick={prevStory}>
              <ChevronLeft className="h-6 w-6 text-gray-900 dark:text-white" />
            </Button>

            <motion.div
              key={stories[currentIndex]?.story_id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="w-[250px] bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-md"
            >
              <Image
                src={stories[currentIndex]?.image_url || "/default-story.jpg"}
                alt={stories[currentIndex]?.description || "Sin descripción"}
                width={250}
                height={192}
                className="w-full h-48 object-cover"
                priority
              />
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Image
                    src={stories[currentIndex]?.avatar_url || "/default-avatar.png"}
                    alt={stories[currentIndex]?.author || "Usuario desconocido"}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full border-2 border-gray-300"
                  />
                  <div>
                    <p className="text-gray-900 dark:text-white font-medium">
                      {stories[currentIndex]?.author || "Usuario desconocido"}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      {stories[currentIndex]?.description || "Sin descripción"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </motion.div>

            <Button variant="ghost" size="icon" className="absolute right-0 z-10" onClick={nextStory}>
              <ChevronRight className="h-6 w-6 text-gray-900 dark:text-white" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
