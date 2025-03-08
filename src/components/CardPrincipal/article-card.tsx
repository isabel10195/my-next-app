"use client";
import { useState, ReactNode, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Iconos } from "../ui/Iconos";
import { TweetCard } from "../CardPrincipal/tweet-cards";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  views: number;
  image: string;
  category?: string;
}

interface ArticleCardProps {
  tweet?: any;
  article?: Article;
  title?: string;
  excerpt?: string;
  author?: string;
  date?: string;
  readTime?: string;
  views?: number;
  image?: string;
  large?: boolean;
  className?: string;
  previewTitle?: string; // Título de previsualización
  onClick?: (content: ReactNode) => void;
  isAuthenticated?: boolean; // Nueva prop para detectar el estado de autenticación
}

export function ArticleCard({
  tweet,
  article,
  title,
  excerpt,
  author,
  date,
  readTime,
  views,
  image,
  large,
  className,
  previewTitle,
  onClick,
  isAuthenticated, // Recibimos la prop
}: ArticleCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Reiniciamos el estado interno cuando cambia la autenticación
  useEffect(() => {
    console.log("ArticleCard: isAuthenticated changed:", isAuthenticated);
    setIsExpanded(false);
  }, [isAuthenticated]);

  const renderContent = () => {
    if (tweet)
      return (
        <>
          {previewTitle && (
            <h2 className="p-4 text-xl font-bold text-gray-900 dark:text-white">
              {previewTitle}
            </h2>
          )}
  
          {/* Contenedor del Tweet */}
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
            {/* Usuario y avatar */}
            <div className="flex items-center gap-2">
              <img
                src={tweet.avatar_url}
                alt="Avatar"
                className="h-8 w-8 rounded-full"
              />
              <div>
                <p className="font-bold text-gray-900 dark:text-white">
                  {tweet.user_handle}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-300">
                  {new Date(tweet.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
  
            {/* Texto del tweet */}
            <p className="mt-2 text-gray-800 dark:text-gray-200">
              {tweet.tweet_text}
            </p>
  
            {/* Mostrar imagen si el tweet tiene una */}
            {tweet.image_url && (
              <img
                src={tweet.image_url}
                alt="Tweet image"
                className="mt-2 w-full rounded-lg"
              />
            )}
  
            {/* Estadísticas rápidas */}
            <div className="flex justify-between mt-2 text-sm text-gray-500 dark:text-gray-400">
              <span>❤️ {tweet.num_likes} Likes</span>
              <span>🔄 {tweet.num_retweets} Retweets</span>
              <span>💬 {tweet.num_comments} Comentarios</span>
            </div>

            {/* Botón para ver más detalles */}
            <button
              className="mt-4 block w-full p-2 text-center text-white bg-blue-500 rounded hover:bg-blue-600"
              onClick={() => onClick && onClick(tweet)}
            >
              Ver más detalles
            </button>
          </div>
        </>
      );
  };  

  const handleClick = () => {
    if (onClick) {
      onClick(renderContent());
    }
    setIsExpanded(!isExpanded);
  };

  return (
    <AnimatePresence>
      <motion.div
        layout
        onClick={handleClick}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        className={`cursor-pointer overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-900 ${
          large ? "col-span-2" : ""
        } ${className}`}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className={`relative ${isExpanded ? "max-h-screen" : ""}`}
        >
          {renderContent()}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}