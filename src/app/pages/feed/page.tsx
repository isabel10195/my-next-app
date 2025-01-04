'use client'

import { useState, useEffect } from "react"
import { MainNav } from "@/components/layout/main-nav"
import { UserProfile } from "@/components/layout/user-profile"
import { FeedCard } from "@/components/feed/feed-card"
import { VideoCard } from "@/components/feed/video-card"
import { FeedTabs } from "@/components/feed/feed-tabs"
import { PostCreator } from "@/components/feed/post-creator"
import { SearchBar } from "@/components/search/search-bar"
import { RecommendationCarousel } from "@/components/recommendations/recommendation-carousel"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import axios from "axios" // Asegúrate de instalar axios

export default function Home() {
  const [activeTab, setActiveTab] = useState("recents")
  const [tweets, setTweets] = useState([])  // Estado para almacenar los tweets
  const [avatarUrl, setAvatarUrl] = useState("/placeholder.svg")  // Estado para almacenar la URL del avatar
  const [userName, setUserName] = useState(""); // Para almacenar el nombre del usuario
  const [userHandle, setUserHandle] = useState(""); // Para almacenar el handle del usuario

  useEffect(() => {
    // Llamar a la API para obtener los tweets del usuario, nombre y avatar
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/get-user-data", {
          withCredentials: true // Usar cookies para autenticar
        });
        setUserName(`${response.data.first_name} ${response.data.last_name}`);
        setUserHandle(response.data.user_handle);
        setAvatarUrl(response.data.avatarUrl); // Establecer el avatar desde la respuesta de la API
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      }
    };

    const fetchTweets = async () => {
      try {
        const response = await axios.get("http://localhost:3001/get-tweets-seg", {
          withCredentials: true
        });
        setTweets(response.data.tweets); // Asegúrate de que los tweets tienen avatar_url y user_handle
      } catch (error) {
        console.error("Error al obtener los tweets:", error);
      }
    };       

    fetchUserData();
    fetchTweets();
  }, []);  // Solo se ejecuta una vez al cargar el componente

  // Función para manejar el like
const handleLike = async (tweetId) => {
  try {
    // Enviar la solicitud para dar like
    await axios.post(
      "http://localhost:3001/like-tweet", 
      { tweet_id: tweetId }, 
      { withCredentials: true }
    );

    // Actualizamos el estado local para reflejar el cambio en el número de likes
    setTweets((prevTweets) =>
      prevTweets.map((tweet) =>
        tweet.tweet_id === tweetId ? { ...tweet, num_likes: tweet.num_likes + 1 } : tweet
      )
    );
  } catch (error) {
    console.error("Error al dar like:", error);
  }
};

  return (
    <div className="grid grid-cols-[280px_1fr_280px] gap-4 p-4 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <aside className="h-[calc(100vh-2rem)] flex flex-col rounded-xl border bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 shadow-sm">
        <UserProfile
          name={userName} // Usar el nombre completo obtenido de la API
          username={userHandle} // Usar el handle obtenido de la API
          avatarUrl={avatarUrl}  // Usar el avatar obtenido de la API
        />
        <ScrollArea className="flex-1">
          <MainNav />
        </ScrollArea>
      </aside>

      <main className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Feeds</h1>
            <FeedTabs activeTab={activeTab} onTabChange={setActiveTab} />
          </div>
          <div className="flex items-center gap-2">
            <SearchBar />
          </div>
        </div>

        <PostCreator
          userAvatar={avatarUrl}  // Usar el avatar aquí también
          userName={userName}  // Usar el nombre completo
        />

        {/* Mostrar los tweets aquí */}
        {tweets.length > 0 ? (
          tweets.map((tweet, index) => (
            <div key={index} className="flex flex-col space-y-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
                <div className="flex items-center gap-2">
                  {/* Avatar del usuario que publicó el tweet */}
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={tweet.avatar_url || "/placeholder.svg"} />  {/* Verifica si avatar_url está bien seteado */}
                    <AvatarFallback>{tweet.user_handle?.[0] || "?"}</AvatarFallback> {/* Muestra la inicial del handle si no hay avatar */}
                  </Avatar>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">
                      {tweet.first_name} {tweet.last_name} (@{tweet.user_handle || "unknown"}) {/* Nombre completo y handle */}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {new Date(tweet.created_at).toLocaleString()} {/* Formato de fecha */}
                    </p>
                  </div>
                </div>
                <p className="mt-2 text-gray-800 dark:text-gray-100">{tweet.tweet_text}</p>

                {/* Mostrar estadísticas del tweet */}
                <div className="flex gap-4 mt-2 text-sm text-gray-600 dark:text-gray-300">
                  <span>{tweet.num_likes} Likes</span>
                  <span>{tweet.num_retweets} Retweets</span>
                  <span>{tweet.num_comments} Comments</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No hay tweets para mostrar</p>
        )}


      </main>

      <aside className="space-y-4">
        <section className="rounded-xl border bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 p-4 shadow-sm">
          <h2 className="text-xl font-semibold mb-3">Stories</h2>
          <div className="grid grid-cols-2 gap-2">
            <div className="relative group">
              <img
                src="/placeholder.svg?height=100&width=100"
                alt="Story preview"
                className="aspect-[4/5] rounded-xl object-cover w-full"
              />
              <div className="absolute bottom-2 left-2 flex items-center gap-1">
                <Avatar className="w-7 h-7 border-2 border-gray-800 dark:border-gray-700">
                  <AvatarImage src="/placeholder.svg?height=24&width=24" />
                  <AvatarFallback>AP</AvatarFallback>
                </Avatar>
                <span className="text-xs text-grey dark:text-gray-200 font-medium">Anatoly Pr.</span>
              </div>
            </div>
            <div className="relative group">
              <img
                src="/placeholder.svg?height=100&width=100"
                alt="Story preview"
                className="aspect-[4/5] rounded-xl object-cover w-full"
              />
              <div className="absolute bottom-2 left-2 flex items-center gap-1">
                <Avatar className="w-7 h-7 border-2 border-gray-800 dark:border-gray-700">
                  <AvatarImage src="/placeholder.svg?height=24&width=24" />
                  <AvatarFallback>LE</AvatarFallback>
                </Avatar>
                <span className="text-xs text-grey dark:text-gray-200 font-medium">Letia Earns</span>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-xl border bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 p-4 shadow-sm">
          <h2 className="text-xl font-semibold mb-3">Suggestions</h2>
          <div className="space-y-4">
            {["Nick Shelburne", "Brittni Lando", "Ivan Shevchenko"].map((name) => (
              <div key={name} className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage /> {/* Mostrar el avatar dinámicamente */}
                  <AvatarFallback>{name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-200">{name}</p>
                </div>
                <Button size="sm" variant="outline"   className="text-gray-700 dark:text-gray-200 border-gray-500 hover:bg-gray-700 dark:hover:bg-gray-600 hover:text-white">
                  Follow
                </Button>
              </div>
            ))}
          </div>
        </section>  
            
        <RecommendationCarousel />
      </aside>
    </div>
  )
}
