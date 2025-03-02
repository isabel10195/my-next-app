import React, { useState, useEffect } from "react";

const CommunitiesContent = ({ category }) => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setIsLoading(true);
        // Inicia la medición del tiempo
        console.time("fetchNews");
      
        // Generar la consulta según la categoría
        const consulta =
          category === "Deporte"
            ? "obtener noticias deportivas destacadas"
            : `obtener noticias de ${category}`;
      
        const response = await fetch("https://magicloops.dev/api/loop/6743674f-6f2e-4738-8dd9-83b9d6ed76af/run", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ input: consulta }),
        });
      
        const data = await response.json();
        // Finaliza la medición del tiempo y muestra el resultado en la consola
        console.timeEnd("fetchNews");
      
        // Extrae la lista de noticias correspondiente a la categoría
        setNews(data[category] || []);
      } catch (error) {
        console.error("Error al obtener las noticias:", error);
      } finally {
        setIsLoading(false);
      }
      
    };

    fetchNews();
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
        news.map((item, index) => (
          <div key={index} className="mb-4">
            <h3 className="font-bold">{item.titulo}</h3>
            <p>{item.resumen}</p>
            {item.enlace && (
              <a
                href={item.enlace}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Leer más
              </a>
            )}
          </div>
        ))
      ) : (
        <p>No hay noticias para mostrar.</p>
      )}
    </div>
  );
};

export default CommunitiesContent;