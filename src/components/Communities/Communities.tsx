"use client";
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/Communities/tabs";
import { fetchUserCommunities, fetchExploreCommunities, joinCommunity, leaveCommunity, fetchCategories } from "@/server/service/communityService";
import CommunitiesContent from "@/components/Communities/CommunitiesContent";
import { toast } from "sonner";

const Communities = () => {
  const [activeTab, setActiveTab] = useState("joined");
  const [communities, setCommunities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
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

  const handleLeaveCommunity = async (communityId, communityName) => {
    try {
      await leaveCommunity(communityId);
      toast.info(`Has dejado la comunidad "${communityName}"`, {
        description: "Ya no podras consultar sus noticias",
        position: "top-right",
        icon: "👋"
      });
      loadCommunities();
    } catch (error) {
      toast.error("Error al salir", {
        description: error.message || "No se pudo abandonar la comunidad",
        position: "top-right"
      });
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

  const handleJoin = async (communityId, communityName) => {
    try {
      await joinCommunity(communityId);
      toast.success(`¡Te has unido a la comunidad "${communityName}"!`, {
        description: "Ahora podras consultar sus noticias",
        position: "top-right"
      });
      loadCommunities();
    } catch (error) {
      toast.error("Error al unirse", {
        description: error.message || "No se pudo unir a la comunidad",
        position: "top-right"
      });
    }
  };

  const toggleNews = (communityId) => {
    setExpandedCommunity(prev => prev === communityId ? null : communityId);
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
                    <p className="text-gray-600 dark:text-gray-300">{com.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="px-4 py-1 bg-red-500 hover:bg-red-600 text-white rounded transition-colors"
                      onClick={() => handleLeaveCommunity(com.community_id, com.name)}
                    >
                      Dejar
                    </button>
                    {expandedCommunity === com.community_id ? (
                      <button
                        className="px-4 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedCommunity(null);
                        }}
                      >
                        Cerrar
                      </button>
                    ) : (
                      <button
                        className="px-4 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleNews(com.community_id);
                        }}
                      >
                        Desplegar
                      </button>
                    )}
                  </div>
                </div>
                {expandedCommunity === com.community_id && (
                  <div className="mt-2">
                    <CommunitiesContent category={com.category} />
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500">No estás unido a ninguna comunidad.</p>
          )}
        </TabsContent>

        <TabsContent value="explore">
          <div className="mb-4">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`mr-2 mb-2 px-4 py-1 border rounded transition-colors ${
                  selectedCategory === cat 
                    ? "bg-blue-500 text-white border-blue-500" 
                    : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
            {selectedCategory && (
              <button
                className="mr-2 mb-2 px-4 py-1 border rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
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
                  <p className="text-gray-600 dark:text-gray-300">{com.description}</p>
                </div>
                <button
                  className="px-4 py-1 bg-green-500 hover:bg-green-600 text-white rounded transition-colors"
                  onClick={() => handleJoin(com.community_id, com.name)}
                >
                  Unirse
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No hay comunidades disponibles para esta categoría.</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Communities;