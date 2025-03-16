import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  fetchUserCommunities, 
  fetchPopularCommunities, 
  joinCommunity,
  leaveCommunity
} from "@/server/service/communityService";

import { toast } from "sonner";

interface CardPensamientosProps {
  isAuthenticated: boolean;
  onCommunityUpdate?: () => void;
}

export function CardPensamientos({ isAuthenticated, onCommunityUpdate }: CardPensamientosProps) {
  const [communities, setCommunities] = useState([]);
  const [showingRecommendations, setShowingRecommendations] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadCommunities() {
      try {
        let data;
        if (isAuthenticated) {
          data = await fetchUserCommunities();
          
          // Ahora la consulta debe devolver name, category y description
          if (data.length === 0) {
            const recommended = await fetchPopularCommunities();
            setCommunities(recommended);
            setShowingRecommendations(true);
          } else {
            setCommunities(data);
            setShowingRecommendations(false);
          }
        } else {
          data = await fetchPopularCommunities();
          setCommunities(data);
          setShowingRecommendations(false);
        }
      } catch (error) {
        console.error("Error al cargar comunidades:", error);
        setError("Error al cargar las comunidades.");
      } finally {
        setLoading(false);
      }
    }

    loadCommunities();
  }, [isAuthenticated]);

  const handleFollow = async (communityId) => {
    try {
      await joinCommunity(communityId);
      toast.success(`Te has unido a la comunidad`, {
        position: "top-right"
      });
      const updatedCommunities = await fetchUserCommunities();
      if(updatedCommunities.length === 0){
        const recommended = await fetchPopularCommunities();
        setCommunities(recommended);
        setShowingRecommendations(true);
      } else {
        setCommunities(updatedCommunities);
        setShowingRecommendations(false);
      }
      onCommunityUpdate && onCommunityUpdate();
    } catch (error) {
      toast.error("Error al unirse", {
        description: error.message || "No se pudo unir a la comunidad",
        position: "top-right"
      });
    }
  };

  const handleUnfollow = async (communityId) => {
    try {
      await leaveCommunity(communityId);
      toast.info(`Has dejado la comunidad`, {
        position: "top-right",
        icon: "👋"
      });
      const updatedCommunities = await fetchUserCommunities();
      if (updatedCommunities.length === 0) {
        const recommended = await fetchPopularCommunities();
        setCommunities(recommended);
        setShowingRecommendations(true);
      } else {
        setCommunities(updatedCommunities);
        setShowingRecommendations(false);
      }
      onCommunityUpdate && onCommunityUpdate();
    } catch (error) {
      toast.error("Error al salir", {
        description: error.message || "No se pudo abandonar la comunidad",
        position: "top-right"
      });
    }
  };

  const title = isAuthenticated 
    ? (showingRecommendations 
        ? "Comunidades Populares" 
        : "Comunidades a las que Perteneces")
    : "Comunidades Populares";

  return (
    <AnimatePresence>
      <motion.div
        layout
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        className="cursor-pointer rounded-lg bg-white p-6 dark:bg-gray-900"
      >
        <h3 className="mb-4 text-xl font-serif text-gray-900 dark:text-white">{title}</h3>       
        {loading ? (
          <p className="text-gray-600 dark:text-gray-300">Cargando comunidades...</p>
        ) : error ? (
          <p className="text-red-500 dark:text-red-400">{error}</p>
        ) : communities.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300">
            No hay comunidades disponibles en este momento.
          </p>
        ) : (
          <div className="space-y-4">
            {communities.map((community) => (
              <div 
                key={community.community_id} 
                className="p-4 border rounded-lg dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {community.name}
                    </h4>
                    {/* Mostrar siempre la descripción si existe */}
                    {community.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        {community.description}
                      </p>
                    )}
                    {/* Si no hay autenticación se muestran los miembros */}
                    {!isAuthenticated && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {community.membersCount} miembros
                      </p>
                    )}
                  </div>
                  
                  {isAuthenticated && (
                    <button
                      onClick={() => 
                        showingRecommendations 
                          ? handleFollow(community.community_id) 
                          : handleUnfollow(community.community_id)
                      }
                      className="ml-4 px-3 py-1 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700 transition-colors"
                    >
                      {showingRecommendations ? "Seguir" : "Dejar de Seguir"}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}