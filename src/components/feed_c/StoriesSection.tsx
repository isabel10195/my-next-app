import { useState, useEffect, useCallback, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, Pause, Play, ChevronLeft, ChevronRight, Upload } from "lucide-react";
import Image from "next/image";
import { useStories } from "@/app/hooks/useStories";
import { useAuth } from "@/app/context/AuthContext";
import { motion } from "framer-motion";
import { toast } from "sonner";
import FileDropZone from "./FileDropZone";

interface Story {
  url: string;
  description?: string;
  created_at: string;
}

interface UserStories {
  user: {
    id: string;
    name: string;
    avatar: string;
    handle: string;
  };
  stories: Story[];
}

const isVideo = (url: string) => /\.(mp4|webm|mov|avi)$/i.test(url);

export default function StoriesSection() {
  const { user } = useAuth();
  const { stories = [], loading, uploadStory } = useStories();
  const videoRef = useRef<HTMLVideoElement>(null);

  // Video controls
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(1);

  // Publish controls
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Navigation
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentUser = stories[currentUserIndex]?.user;
  const currentUserStories = stories[currentUserIndex]?.stories || [];
  const currentStory = currentUserStories[currentStoryIndex] || {};
  const totalStories = currentUserStories.length;
  const totalUsers = stories.length;
  const canNavigate = totalUsers > 1 || totalStories > 1;

  // Video handlers
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) videoRef.current.pause();
    else videoRef.current.play();
    setIsPlaying(!isPlaying);
    setIsPaused(isPlaying);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (videoRef.current) videoRef.current.volume = vol;
    setIsMuted(vol === 0);
  };

  // Sync video props
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
      videoRef.current.muted = isMuted;
    }
  }, [volume, isMuted, currentStory.url]);

  // Auto progress
  const nextStory = useCallback(() => {
    if (totalUsers === 0) return;
    setProgress(0);
    const nextIdx = currentStoryIndex + 1;
    if (nextIdx < totalStories) setCurrentStoryIndex(nextIdx);
    else {
      setCurrentUserIndex((currentUserIndex + 1) % totalUsers);
      setCurrentStoryIndex(0);
    }
    setIsPlaying(true);
  }, [currentStoryIndex, currentUserIndex, totalStories, totalUsers]);

  const prevStory = useCallback(() => {
    if (totalUsers === 0) return;
    setProgress(0);
    const prevIdx = currentStoryIndex - 1;
    if (prevIdx >= 0) setCurrentStoryIndex(prevIdx);
    else {
      const prevUser = (currentUserIndex - 1 + totalUsers) % totalUsers;
      const prevStories = stories[prevUser]?.stories || [];
      setCurrentUserIndex(prevUser);
      setCurrentStoryIndex(prevStories.length - 1);
    }
    setIsPlaying(true);
  }, [currentStoryIndex, currentUserIndex, stories, totalUsers]);

  useEffect(() => {
    if (loading || !canNavigate || isPaused || totalUsers === 0) return;
    const timer = setInterval(() => {
      setProgress(prev => {
        const inc = (100 / 5000) * 16.67;
        if (prev + inc >= 100) {
          nextStory();
          return 0;
        }
        return prev + inc;
      });
    }, 16.67);
    return () => clearInterval(timer);
  }, [loading, canNavigate, isPaused, totalUsers, nextStory]);

  // Reset indices
  useEffect(() => {
    if (!stories.length || currentUserIndex >= stories.length) {
      setCurrentUserIndex(0);
      setCurrentStoryIndex(0);
    }
  }, [stories, currentUserIndex]);

  const handleUserSelect = (idx: number) => {
    setCurrentUserIndex(idx);
    setCurrentStoryIndex(0);
    setIsPlaying(true);
  };

  const handlePublish = async () => {
    if (!selectedFile) return toast.error("Selecciona un archivo");
    toast.loading("Subiendo...", { id: "story-upload" });
    try {
      await uploadStory(selectedFile, description);
      toast.success("Publicado!", { id: "story-upload" });
      setDescription("");
      setSelectedFile(null);
    } catch (e: any) {
      toast.error("Error subiendo", { description: e.message });
    }
  };

  let message = "";
  if (!user) message = "No estás logueado. Inicia sesión.";
  else if (!loading && !stories.length) message = "No hay stories. ¡Sé el primero!";

  if (loading) {
    return (
      <Card className="mb-6 bg-white dark:bg-gray-900 p-4 rounded-lg shadow-lg">
        <CardContent className="text-center py-6">
          <p className="text-gray-500 dark:text-gray-400">Cargando stories...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6 bg-white dark:bg-gray-900 p-4 rounded-lg shadow-lg">
      <CardHeader className="flex flex-col gap-2">
        <div className="flex items-center justify-between w-full">
          <CardTitle className="text-gray-900 dark:text-white">Stories</CardTitle>
        </div>
        {user && (
          <div className="flex flex-col gap-2 w-full">
            <div className="flex items-center gap-4 w-full">
              <Input
                type="text"
                placeholder="¿Qué estás pensando?"
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="flex-1 bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
              />
              <Button onClick={handlePublish} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
                Publicar
              </Button>
            </div>
            <FileDropZone onFilesSelected={files => setSelectedFile(files[0] || null)} />
            {selectedFile && (
              <div className="flex items-center bg-gray-100 px-2 py-1 rounded text-sm text-gray-500 mt-2">
                <span>{selectedFile.name}</span>
                <button type="button" onClick={() => setSelectedFile(null)} className="ml-2 text-red-500 hover:text-red-700">X</button>
              </div>
            )}
          </div>
        )}
      </CardHeader>

      <CardContent>
        {message ? (
          <p className="text-center text-gray-500 dark:text-gray-400">{message}</p>
        ) : (
          <div className="relative">
            {/* Avatars arriba */}
            <div className="flex gap-4 mb-4 overflow-x-auto pb-2">
              {stories.map((u, idx) => (
                <div key={u.user.id} onClick={() => handleUserSelect(idx)} className="flex flex-col items-center cursor-pointer relative">
                  <div className={`relative w-16 h-16 rounded-full border-2 ${currentUserIndex === idx ? "border-blue-500" : "border-gray-300 dark:border-gray-600"}`}>
                    <Image src={u.user.avatar} alt={u.user.name} width={64} height={64} className="w-full h-full rounded-full object-cover" onError={e => {(e.target as HTMLImageElement).src = "/default-avatar.png";}} />
                    {u.stories.length > 0 && <div className="absolute -top-1 -right-1 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">{u.stories.length}</div>}
                  </div>
                  <p className="text-xs mt-1 text-gray-600 dark:text-gray-300 truncate max-w-[80px]">{u.user.name}</p>
                </div>
              ))}
            </div>

            {/* Contenido del story */}
            {stories.length > 0 && currentStory.url ? (
              <motion.div
                key={`${currentUserIndex}-${currentStoryIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="mx-auto w-full max-w-[600px] bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-md relative"
              >
                <div className="aspect-[9/16] relative w-full h-full">
                  {isVideo(currentStory.url) ? (
                    <>
                      <video
                        ref={videoRef}
                        src={currentStory.url}
                        autoPlay
                        playsInline
                        className="w-full h-full object-cover"
                        onEnded={nextStory}
                        onClick={togglePlayPause}
                      />
                      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="bg-black/30 hover:bg-black/50 rounded-full p-2 h-10 w-10" onClick={toggleMute}>
                          {isMuted ? <VolumeX className="h-6 w-6 text-white" /> : <Volume2 className="h-6 w-6 text-white" />}
                        </Button>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.01"
                          value={volume}
                          onChange={handleVolumeChange}
                          className="w-24 h-1 rounded-lg"
                        />
                        <Button variant="ghost" size="icon" className="bg-black/30 hover:bg-black/50 rounded-full p-2 h-10 w-10" onClick={togglePlayPause}>
                          {isPlaying ? <Pause className="h-6 w-6 text-white" /> : <Play className="h-6 w-6 text-white" />}
                        </Button>
                      </div>
                    </>
                  ) : (
                    <Image
                      src={currentStory.url}
                      alt={currentStory.description || "Story"}
                      fill
                      className="object-cover w-full h-full"
                      priority
                      onError={e => {(e.target as HTMLImageElement).style.display = "none";}}
                    />
                  )}

                  <CardContent className="p-4 absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent">
                    <div className="flex items-center gap-3">
                      {currentUser?.avatar && (
                        <Image
                          src={currentUser.avatar}
                          alt={currentUser.name}
                          width={48}
                          height={48}
                          className="w-12 h-12 rounded-full border-2 border-white"
                        />
                      )}
                      <div>
                        <p className="text-white font-medium">{currentUser?.name || "Usuario desconocido"}</p>
                        <p className="text-gray-200 text-sm">{currentStory.description || ""}</p>
                      </div>
                    </div>
                  </CardContent>

                  {canNavigate && (
                    <>
                      <div className="absolute top-2 left-2 right-2 z-20 h-1 bg-gray-200/50 rounded-full">
                        <div className="h-full bg-white rounded-full transition-all duration-100" style={{ width: `${progress}%` }} />
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute left-4 z-20 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 rounded-full p-2 h-10 w-10 transition-opacity"
                        onClick={() => { setIsPaused(false); prevStory(); }}
                      >
                        <ChevronLeft className="h-8 w-8 text-white stroke-[3]" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-4 z-20 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 rounded-full p-2 h-10 w-10 transition-opacity"
                        onClick={() => { setIsPaused(false); nextStory(); }}
                      >
                        <ChevronRight className="h-8 w-8 text-white stroke-[3]" />
                      </Button>
                    </>
                  )}
                </div>
              </motion.div>
            ) : (
              <div className="aspect-[9/16] flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
                <p className="text-gray-500 dark:text-gray-400">No hay más stories disponibles</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}