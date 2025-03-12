"use client";
import React from "react";

interface Article {
  id: string;
  title: string;
  subtitle: string;
  summary: string;
  link: string;
  published_date: string;
  category?: string;
  image?: string; // Asegúrate de agregar este campo
}

interface FullNewsListProps {
  news: Article[];
  isAuthenticated: boolean;
}

const FullNewsList: React.FC<FullNewsListProps> = ({ news, isAuthenticated }) => {
  const filteredNews = !isAuthenticated
  ? news.filter((article) => article.category === "Noticias Generales")
  : news;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        {!isAuthenticated ? "Noticias Generales" : "Noticias para ti"}
      </h2>
      <div className="grid grid-cols-1 gap-4">
        {filteredNews.map((article, index) => (
          <div
            key={article.id || index}
            className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
          >
            {article.image && (
              <img
              src={article.image || 'https://via.placeholder.com/400x200/d3d3d3/000000?text=News+Image+Not+Available'}
              alt={article.title}
              className="w-full h-64 object-cover mb-4 rounded-lg"
              onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/400x200/d3d3d3/000000?text=News+Image+Not+Available';
              }}
            />
            )}
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-blue-500">{article.category}</span>
              <span className="text-xs text-gray-500">
                {article.published_date}
              </span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {article.title}
            </h3>
            {article.subtitle && (
              <h4 className="text-md text-gray-700 dark:text-gray-300 mt-1">
                {article.subtitle}
              </h4>
            )}
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              {article.summary}
            </p>
            {article.link && (
              <a
                href={article.link}
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
};

export default FullNewsList;