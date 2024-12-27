import { Play, Pause } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <header className="border-b bg-white dark:bg-gray-950">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2" onClick={togglePlayPause}>
            {isPlaying ? (
              <Pause className="h-5 w-5 text-gray-900 dark:text-white" />
            ) : (
              <Play className="h-5 w-5 text-gray-900 dark:text-white" />
            )}
            <span className="text-gray-900 dark:text-white">5,810</span> {/* Cambié el color de texto */}
          </div>
          <nav className="hidden space-x-6 md:block">
            <a href="/pages/faqs" className="text-sm text-gray-900 hover:text-gray-600 dark:text-white dark:hover:text-gray-400">
              FAQs
            </a>
            <a href="/pages/feed" className="text-sm text-gray-900 hover:text-gray-600 dark:text-white dark:hover:text-gray-400">
              Feed
            </a>
            <a href="/pages/profile" className="text-sm text-gray-900 hover:text-gray-600 dark:text-white dark:hover:text-gray-400">
              Perfil
            </a>
            <a href="/pages/settings" className="text-sm text-gray-900 hover:text-gray-600 dark:text-white dark:hover:text-gray-400">
              Settings
            </a>
            <a href="/pages/chats" className="text-sm text-gray-900 hover:text-gray-600 dark:text-white dark:hover:text-gray-400">
              mensajes
            </a>
          </nav>
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-serif text-gray-900 dark:text-white">
            LA ISLA DE LURE
          </h1>
        </div>
        <button className="rounded-full border px-4 py-2 text-sm hover:bg-gray-50 dark:text-white dark:hover:text-gray-400">
          Subscribe for €2.50
        </button>
      </div>
    </header>
  );
}
