"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Upload } from "lucide-react";
import Image from "next/image";
import {useStories} from "@/app/hooks/useStories";

const popularTopics = [
  "#AppleEvent",
  "#iOSUpdate",
  "#MacBookPro",
  "#AirPods",
  "#AppleWatch",
  "#iPhonePhotography",
  "#MacOSFeatures",
  "#ApplePencil",
];

const communities = [
  { name: "Apple Developers", members: 50000 },
  { name: "iOS Enthusiasts", members: 30000 },
  { name: "Mac Power Users", members: 25000 },
];

export default function RightSidebar() {
  const { stories, fetchStories, uploadStory } = useStories();
  const [currentTopic, setCurrentTopic] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTopic((prev) => (prev + 1) % popularTopics.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchStories();
  }, []);

  const nextStory = () => {
    setCurrentIndex((prev) => (prev + 1) % stories.length);
  };

  const prevStory = () => {
    setCurrentIndex((prev) => (prev - 1 + stories.length) % stories.length);
  };

  return (
    <aside className="w-full md:w-80 mt-4 md:mt-0 p-2 bg-gray-200 dark:bg-gray-950 rounded-2xl overflow-y-auto">
      <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
        {/* Sección de Stories con botón de subida */}
        <Card className="mb-6 bg-white dark:bg-gray-900 p-4 rounded-lg shadow-lg">
          <CardHeader className="flex justify-between items-center">
            <CardTitle className="text-gray-900 dark:text-white">Stories</CardTitle>
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
                    const imageUrl = URL.createObjectURL(file);
                    uploadStory(imageUrl, "Nueva historia");
                  }
                }}
              />
            </label>
          </CardHeader>
          <CardContent>
            <div className="relative flex items-center">
              {/* Botón Izquierdo */}
              <Button variant="ghost" size="icon" className="absolute left-0 z-10" onClick={prevStory}>
                <ChevronLeft className="h-6 w-6 text-gray-900 dark:text-white" />
              </Button>

              {/* Story actual */}
              {stories.length > 0 ? (
                <motion.div
                  key={stories[currentIndex].story_id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="w-[250px] bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-md"
                >
                  <Image
                    src={stories[currentIndex].image_url}
                    alt={stories[currentIndex].description}
                    width={250}
                    height={192}
                    className="w-full h-48 object-cover"
                    priority
                  />
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Image
                        src={stories[currentIndex].avatar_url}
                        alt={stories[currentIndex].author}
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-full border-2 border-gray-300"
                      />
                      <div>
                        <p className="text-gray-900 dark:text-white font-medium">{stories[currentIndex].author}</p>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">{stories[currentIndex].description}</p>
                      </div>
                    </div>
                  </CardContent>
                </motion.div>
              ) : (
                <p className="text-center text-gray-500 dark:text-gray-400">No hay stories disponibles</p>
              )}

              {/* Botón Derecho */}
              <Button variant="ghost" size="icon" className="absolute right-0 z-10" onClick={nextStory}>
                <ChevronRight className="h-6 w-6 text-gray-900 dark:text-white" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Sección de Popular Topics */}
        <Card className="mb-6 bg-white dark:bg-gray-900">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Popular Topics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative overflow-hidden">
              <AnimatePresence initial={false}>
                <motion.div
                  key={currentTopic}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ type: "tween", ease: "easeInOut", duration: 0.5 }}
                  className="text-center text-xl font-bold text-blue-500 dark:text-blue-300 my-4"
                >
                  {popularTopics[currentTopic]}
                </motion.div>
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>

        {/* Sección de Comunidades */}
        <Card className="bg-white dark:bg-gray-900">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Communities</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {communities.map((community) => (
                <li key={community.name} className="flex items-center justify-between text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 p-2 rounded-lg">
                  <span>{community.name}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-300">{community.members.toLocaleString()} members</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>
    </aside>
  );
}
