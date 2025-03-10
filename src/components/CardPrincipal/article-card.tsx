"use client";
import { useState, ReactNode, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  subtitle: string;
  summary: string;
  link: string;
  published_date: string;
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
  loading?: boolean;
  className?: string;
  previewTitle?: string; // Título de previsualización
  message?: string; // <-- Nueva prop para el mensaje
  onClick?: (content: ReactNode) => void;
  isAuthenticated?: boolean;
  articles?: Article[];
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
  message, // Recibimos el mensaje
  loading,
  articles,
  onClick,
  isAuthenticated,
}: ArticleCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Reiniciamos el estado interno cuando cambia la autenticación
  useEffect(() => {
    setIsExpanded(false);
  }, [isAuthenticated]);

  const renderContent = () => {
    if (articles && articles.length > 0) {
      return (
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          {message && (
            <div className="p-2 text-sm text-red-500">{message}</div>
          )}
          {previewTitle && (
            <h2 className="p-2 text-xl font-bold text-gray-900 dark:text-white">
              {previewTitle}
            </h2>
          )}
          <div className="grid grid-cols-1 gap-4">
            {articles.map((art, idx) => (
              <div key={idx} className="border-b border-gray-300 pb-2 mb-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-500">{art.category}</span>
                  <span className="text-xs text-gray-500">{art.published_date}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {art.title}
                </h3>
                {art.subtitle && (
                  <h4 className="text-md text-gray-700 dark:text-gray-300 mt-1">
                    {art.subtitle}
                  </h4>
                )}
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  {art.summary}
                </p>
                {art.link && (
                  <a
                    href={art.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-blue-500 hover:underline"
                  >
                    Leer más
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }
    if (tweet)
      return (
        <>
          {message && (
            <div className="p-4 text-sm text-red-500">{message}</div>
          )}
          {previewTitle && (
            <h2 className="p-4 text-xl font-bold text-gray-900 dark:text-white">
              {previewTitle}
            </h2>
          )}

          {/* Contenedor del Tweet */}
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
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

            <p className="mt-2 text-gray-800 dark:text-gray-200">
              {tweet.tweet_text}
            </p>

            {tweet.image_url && (
              <img
                src={tweet.image_url}
                alt="Tweet image"
                className="mt-2 w-full rounded-lg"
              />
            )}

            <div className="flex justify-between mt-2 text-sm text-gray-500 dark:text-gray-400">
              <span>❤️ {tweet.num_likes} Likes</span>
              <span>🔄 {tweet.num_retweets} Retweets</span>
              <span>💬 {tweet.num_comments} Comentarios</span>
            </div>

            <button
              className="mt-4 block w-full p-2 text-center text-white bg-blue-500 rounded hover:bg-blue-600"
              onClick={() => onClick && onClick(tweet)}
            >
              Ver más detalles
            </button>
          </div>
        </>
      );

    if (loading) {
      return (
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      );
    }
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
