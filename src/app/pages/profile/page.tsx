"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Toaster } from "react-hot-toast";
import CardUsuario from "@/components/perfil_c/profile_card_usuario";
import CardTweets from "@/components/perfil_c/profile_card_tweets";
import PerfilNav from "@/components/perfil_c/perfil_nav";
import CardLogros from "@/components/perfil_c/profile_card_logros";
import CardIntereses from "@/components/perfil_c/profile_card_intereses"; 
import CardHabilidades from "@/components/perfil_c/profile_card_habilidades"; 
import UserTabs from "@/components/perfil_c/profile_tabs"; 

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [tweets, setTweets] = useState([]);
  const [userDetails, setUserDetails] = useState({ achievements: [], interests: [], skills: [] });
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authRes = await fetch("/api/auth/me", { credentials: "include" });
        const authData = await authRes.json();
        if (!authData.authenticated) {
          setUser(null);
        } else {
          setUser(authData.user);

          // 🔹 Obtener tweets
          const tweetsRes = await fetch("/api/tweets", { credentials: "include" });
          const tweetsData = await tweetsRes.json();
          setTweets(tweetsData?.tweets ?? []);

          // 🔹 Obtener detalles del usuario
          const detailsRes = await fetch("/api/users/details", { credentials: "include" });

          if (!detailsRes.ok) {
            console.warn("⚠️ No se encontraron detalles del usuario (404).");
            setUserDetails({ achievements: [], interests: [], skills: [] });
          } else {
            const detailsData = await detailsRes.json();
            setUserDetails({
              achievements: detailsData.achievement ?? [],
              interests: detailsData.interest ?? [],
              skills: detailsData.skill ?? [],
            });
          }

          // 🔹 Obtener seguidores y seguidos
          const followersRes = await fetch("/api/followers", { credentials: "include" });
          const followingRes = await fetch("/api/followers/following", { credentials: "include" });

          if (followersRes.ok) {
            const followersData = await followersRes.json();
            setFollowers(followersData.followers ?? []);
          }

          if (followingRes.ok) {
            const followingData = await followingRes.json();
            setFollowing(followingData.seguidos ?? []);
          }
        }
      } catch (err) {
        setError("Error al cargar los datos");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

// 🔹 Eliminar tweet
const handleDeleteTweet = async (tweetId) => {
  const numericTweetId = parseInt(tweetId, 10);

  if (isNaN(numericTweetId)) {
      console.error("❌ Error al eliminar el tweet: ID de tweet inválido");
      return;
  }

  try {
      const res = await fetch(`/api/tweets/delete/${numericTweetId}`, {
          method: "DELETE",
          credentials: "include",
      });

      if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Error al eliminar el tweet");
      }

      // 🔥 Eliminar el tweet del estado
      setTweets((prevTweets) => prevTweets.filter((tweet) => tweet.tweet_id !== numericTweetId));
  } catch (error) {
      console.error("❌ Error al eliminar el tweet:", error);
  }
};

// 🔹 Editar tweet
const handleEditTweet = async (tweetId, newText) => {
  const numericTweetId = parseInt(tweetId, 10);

  if (isNaN(numericTweetId)) {
    console.error("❌ Error al editar el tweet: ID de tweet inválido");
    return;
  }

  try {
    const res = await fetch(`/api/tweets/edit/${numericTweetId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ tweet_text: newText }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Error al editar el tweet");
    }

    const updatedTweet = await res.json();

    // 🔥 Actualizar el tweet en el estado
    setTweets((prevTweets) =>
      prevTweets.map((tweet) =>
        tweet.tweet_id === numericTweetId ? { ...tweet, tweet_text: updatedTweet.tweet_text } : tweet
      )
    );
  } catch (error) {
    console.error("❌ Error al editar el tweet:", error);
  }
};



  const renderTagsWithColors = (tags: string[]) => {
    const colors = ["bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-red-500", "bg-purple-500"];
    return tags.map((tag, index) => (
      <span key={index} className={`px-2 py-1 text-white rounded ${colors[index % colors.length]}`}>
        {tag}
      </span>
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-gray-200 dark:bg-gray-950 min-h-screen overflow-x-hidden"
    >
      <Toaster />
      <div className="mx-auto px-4 lg:px-8 flex justify-center mt-4">
        <div className="flex flex-col lg:flex-row gap-8 w-full">
          <div className="w-full lg:w-[250px] lg:flex-shrink-0 space-y-4 z-10 -mt-4">
            <PerfilNav user={user} />
          </div>

          <div className="flex-1 space-y-4 w-full relative">
            <CardUsuario user={user} />
            <CardTweets tweets={tweets} user={user} handleDeleteTweet={handleDeleteTweet} handleEditTweet={handleEditTweet} />
            <CardLogros user={user} achievements={userDetails.achievements} />
            <CardIntereses user={user} interests={userDetails.interests} renderTagsWithColors={renderTagsWithColors} />
            <CardHabilidades user={user} skills={userDetails.skills} />

            <UserTabs
              user={user}
              seguidores={followers} 
              following={following} 
              recomendaciones={[]} 
              followUser={() => {}} 
              unfollowUser={() => {}}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
