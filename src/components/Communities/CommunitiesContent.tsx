// components/Communities/CommunitiesContent.js
import React, { useState, useEffect } from "react";
import { fetchNewsByCategory } from "@/server/service/newsService";

const CommunitiesContent = ({ category }) => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      try {
        setIsLoading(true);
        const data = await fetchNewsByCategory(category);
        setNews(data.news || []);
      } catch (error) {
        console.error("Error al obtener las noticias:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadNews();
  }, [category]);

  return (
    <div className="p-4 border rounded mt-4">
      <h2 className="text-xl font-semibold mb-2">Noticias de {category}</h2>

      {isLoading ? (
        <div className="flex justify-center items-center">
          <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-2">Cargando noticias...</span>
        </div>
      ) : news.length > 0 ? (
        news.map((article) => (
          <div key={article.article_id} className="mb-4 border-b pb-4">
            {/* Titulo principal */}
            <h3 className="font-bold text-lg mb-1">{article.title}</h3>
            
            {/* Subtítulo */}
            {article.subtitle && (
              <p className="text-gray-400 italic mb-2">{article.subtitle}</p>
            )}
            
            {/* Resumen */}
            <p className="text-gray-200 leading-relaxed">{article.summary}</p>
            
            {/* Enlace y metadatos */}
            <div className="mt-3 flex items-center justify-between">
              <div>
                {article.link && (
                  <a
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700 underline"
                  >
                    Leer artículo completo
                  </a>
                )}
              </div>
              <span className="text-sm text-gray-500">
                {new Date(article.published_date).toLocaleDateString()}
              </span>
            </div>
            
            {/* Imagen */}
            {article.image && (
              <img 
                src={article.image} 
                alt={article.title}
                className="mt-4 w-full h-48 object-cover rounded-lg shadow-sm"
              />
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-500">No hay noticias disponibles en esta categoría.</p>
      )}
    </div>
  );
};

export default CommunitiesContent;