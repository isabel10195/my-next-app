import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchUserCommunities, fetchPopularCommunities } from "@/server/service/communityService";

export function CardPensamientos({ isAuthenticated }) {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadCommunities() {
      try {
        console.log("🔍 Buscando comunidades...", isAuthenticated ? "Usuario autenticado" : "Usuario no autenticado");
        const data = isAuthenticated
          ? await fetchUserCommunities()
          : await fetchPopularCommunities();
        console.log("✅ Comunidades obtenidas:", data);
        setCommunities(data);
      } catch (error) {
        console.error("Error al cargar comunidades:", error);
        setError("Error al cargar las comunidades.");
      } finally {
        setLoading(false);
      }
    }
  
    loadCommunities();
  }, [isAuthenticated]);

  const title = isAuthenticated ? "Comunidades a las que Perteneces" : "Comunidades Populares";

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
            {isAuthenticated
              ? "No perteneces a ninguna comunidad."
              : "No hay comunidades populares en este momento."}
          </p>
        ) : (
          <div className="space-y-2">
            {communities.map((community) => (
              <div key={community.community_id} className="p-2 border rounded dark:border-gray-700">
                <p className="text-gray-900 dark:text-white">
                  {community.name}
                  {!isAuthenticated && ` | ${community.membersCount} miembros`}
                </p>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}