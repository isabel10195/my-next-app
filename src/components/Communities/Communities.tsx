"use client";
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/Communities/tabs";
import { fetchUserCommunities, fetchExploreCommunities, joinCommunity, fetchCategories } from "@/server/service/communityService";
import CommunitiesContent from "@/components/Communities/CommunitiesContent";

const Communities = () => {
  const [activeTab, setActiveTab] = useState("joined");
  const [communities, setCommunities] = useState([]);
  const [categories, setCategories] = useState([]); // Cargadas desde el backend
  const [selectedCategory, setSelectedCategory] = useState("");
  // Estado para controlar la comunidad expandida
  const [expandedCommunity, setExpandedCommunity] = useState(null);

  const loadCommunities = async () => {
    try {
      if (activeTab === "joined") {
        const data = await fetchUserCommunities();
        setCommunities(data);
      } else {
        const data = await fetchExploreCommunities(selectedCategory);
        setCommunities(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadCommunities();
  }, [activeTab, selectedCategory]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const cats = await fetchCategories();
        setCategories(cats);
      } catch (error) {
        console.error(error);
      }
    };
    loadCategories();
  }, []);

  const handleJoin = async (communityId) => {
    try {
      await joinCommunity(communityId);
      loadCommunities();
    } catch (error) {
      console.error(error);
    }
  };

  // Función para expandir/contraer la vista de noticias
  const toggleNews = (communityId) => {
    if (expandedCommunity === communityId) {
      setExpandedCommunity(null);
    } else {
      setExpandedCommunity(communityId);
    }
  };

  return (
    <div className="p-4">
      <Tabs defaultValue="joined" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 gap-4">
          <TabsTrigger value="joined">Mis comunidades</TabsTrigger>
          <TabsTrigger value="explore">Explorar</TabsTrigger>
        </TabsList>
        <TabsContent value="joined">
          {communities.length > 0 ? (
            communities.map((com) => (
              <div key={com.community_id} className="p-4 border rounded mb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold">{com.name}</h4>
                    <p>{com.description}</p>
                  </div>
                  {expandedCommunity === com.community_id ? (
                    <button
                      className="px-4 py-1 bg-red-500 text-white rounded"
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedCommunity(null);
                      }}
                    >
                      Cerrar
                    </button>
                  ) : (
                    <button
                      className="px-4 py-1 bg-blue-500 text-white rounded"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleNews(com.community_id);
                      }}
                    >
                      Desplegar
                    </button>
                  )}
                </div>
                {/* Se muestra el componente de noticias solo si esta comunidad está expandida */}
                {expandedCommunity === com.community_id && (
                  <div className="mt-2">
                    <CommunitiesContent category={com.category} />
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No estás unido a ninguna comunidad.</p>
          )}
        </TabsContent>
        <TabsContent value="explore">
          <div className="mb-4">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`mr-2 mb-2 px-4 py-1 border rounded ${selectedCategory === cat ? "bg-blue-500 text-white" : ""}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
            {selectedCategory && (
              <button
                className="mr-2 mb-2 px-4 py-1 border rounded bg-gray-200"
                onClick={() => setSelectedCategory("")}
              >
                Limpiar filtro
              </button>
            )}
          </div>
          {communities.length > 0 ? (
            communities.map((com) => (
              <div key={com.community_id} className="p-4 border rounded mb-2 flex justify-between items-center">
                <div>
                  <h4 className="font-semibold">{com.name}</h4>
                  <p>{com.description}</p>
                </div>
                <button
                  className="px-4 py-1 bg-green-500 text-white rounded"
                  onClick={() => handleJoin(com.community_id)}
                >
                  Unirse
                </button>
              </div>
            ))
          ) : (
            <p>No hay comunidades disponibles para esta categoría.</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Communities;