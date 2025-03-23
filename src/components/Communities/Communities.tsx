"use client";
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/Communities/tabs";
import { fetchUserCommunities, fetchExploreCommunities, joinCommunity, leaveCommunity, fetchCategories } from "@/server/service/communityService";
import { subscribeNewsletter, unsubscribeNewsletter, fetchNewsletterSubscriptions } from "@/server/service/newsletterService"; // ✅ Importar servicios de newsletter
import CommunitiesContent from "@/components/Communities/CommunitiesContent";
import { useProfileContext } from "@/app/context/ProfileContext";
import { toast } from "sonner";

const Communities = () => {
  const [activeTab, setActiveTab] = useState("joined");
  const [communities, setCommunities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [expandedCommunity, setExpandedCommunity] = useState(null);
  const [newsletterSubscriptions, setNewsletterSubscriptions] = useState([]); // ✅ Estado de suscripciones
  const { profile } = useProfileContext();

  useEffect(() => {
    loadCommunities();
    loadSubscriptions(); // ✅ Cargar suscripciones iniciales
  }, [activeTab, selectedCategory]);

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

  const loadSubscriptions = async () => {
    try {
      const subs = await fetchNewsletterSubscriptions();
      console.log("Subscripciones:", subs);
      setNewsletterSubscriptions(subs.map(s => Number(s.community_id)));
    } catch (error) {
      toast.error("Error cargando suscripciones", {
        description: error.message || "No se pudieron cargar las suscripciones"
      });
    }
  };  

  const handleLeaveCommunity = async (communityId, communityName) => {
    try {
      await leaveCommunity(communityId);
      toast.info(`Has dejado la comunidad "${communityName}"`, {
        description: "Ya no podrás consultar sus noticias",
        position: "top-right",
        icon: "👋"
      });
      loadCommunities();
      loadSubscriptions(); // ✅ Actualizar suscripciones
    } catch (error) {
      toast.error("Error al salir", {
        description: error.message || "No se pudo abandonar la comunidad",
        position: "top-right"
      });
    }
  };


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
  },);

  const handleJoin = async (communityId, communityName) => {
    try {
      await joinCommunity(communityId);
      toast.success(`¡Te has unido a la comunidad "${communityName}"!`, {
        description: "Ahora podrás consultar sus noticias",
        position: "top-right"
      });
      loadCommunities();
      loadSubscriptions(); // ✅ Actualizar suscripciones
    } catch (error) {
      toast.error("Error al unirse", {
        description: error.message || "No se pudo unir a la comunidad",
        position: "top-right"
      });
    }
  };

  const toggleSubscription = async (communityId, communityName) => {
    const id = Number(communityId);
    const wasSubscribed = newsletterSubscriptions.includes(id);

    try {
      // Actualización optimista INMEDIATA
      setNewsletterSubscriptions((prev) =>
        wasSubscribed ? prev.filter((i) => i !== id) : [...prev, id]
      );

      // Ejecutar acción en servidor
      const action = wasSubscribed ? unsubscribeNewsletter : subscribeNewsletter;
      await action(id);

      // Notificación EXITOSA
      toast.success(
        wasSubscribed
          ? `Suscripción cancelada para "${communityName}"`
          : `¡Suscripción activada para "${communityName}"!`
      );

      // Sincronización AGRESIVA con servidor
      const updatedSubs = await fetchNewsletterSubscriptions();
      setNewsletterSubscriptions(updatedSubs.map((s) => Number(s.community_id)));
    } catch (error) {
      // Revertir estado en caso de error
      setNewsletterSubscriptions((prev) =>
        wasSubscribed ? [...prev, id] : prev.filter((i) => i !== id)
      );

      toast.error("Error en la operación", {
        description: error.message || "Intenta nuevamente",
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
          <TabsTrigger value="joined" className="text-gray-900 dark:text-white dark:hover:bg-blue-900 rounded-2xl data-[state=active]:bg-blue-300 dark:data-[state=active]:bg-blue-900 data-[state=active]:text-gray-900 dark:data-[state=active]:text-white">Mis comunidades</TabsTrigger>
          <TabsTrigger value="explore" className="text-gray-900 dark:text-white dark:hover:bg-blue-900 rounded-2xl data-[state=active]:bg-blue-300 dark:data-[state=active]:bg-blue-900 data-[state=active]:text-gray-900 dark:data-[state=active]:text-white">Explorar</TabsTrigger>
        </TabsList>

        <TabsContent value="joined">
          {communities.length > 0 ? (
            communities.map((com) => (
              <div key={com.community_id} className="p-4 border border-1 border-gray-300 rounded-xl mb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{com.name}</h4>
                    <p className="text-gray-600 dark:text-gray-300">{com.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="px-4 py-1 bg-red-500 hover:bg-red-600 text-white rounded transition-colors"
                      onClick={() => handleLeaveCommunity(com.community_id, com.name)}
                    >
                      Dejar
                    </button>
                    <button
                      className={`px-4 py-1 rounded transition-colors ${
                        newsletterSubscriptions.includes(Number(com.community_id))
                          ? "bg-yellow-500 hover:bg-yellow-600"
                          : "bg-green-500 hover:bg-green-600"
                      } text-white`}
                      onClick={() => toggleSubscription(com.community_id, com.name)}
                    >
                      {newsletterSubscriptions.includes(Number(com.community_id))
                        ? "Cancelar Suscripción"
                        : "Suscribirse Newsletter"
                      }
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
              <div key={com.community_id} className="p-4 border border-1 border-gray-300 rounded-xl mb-2 flex justify-between items-center">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{com.name}</h4>
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