"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Toaster } from "react-hot-toast";
import CardUsuario from "@/components/perfil_c/profile_card_usuario";
import CardLogros from "@/components/perfil_c/profile_card_logros";
import CardIntereses from "@/components/perfil_c/profile_card_intereses";
import CardEstadisticas from "@/components/perfil_c/card_estadisticas";
import CardHabilidades from "@/components/perfil_c/profile_card_habilidades";
import CardTweets from "@/components/perfil_c/profile_card_tweets";
import UserTabs from "@/components/perfil_c/profile_tabs";
import PerfilNav from "@/components/perfil_c/perfil_nav";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState({
    achievements: [],
    interests: [],
    skills: [],
    recommendations: [],
  });
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 🔹 Verificar autenticación
        const authRes = await fetch("/api/auth/me",{credentials:"include"});
        const authData = await authRes.json();
        if (!authData.authenticated) {
          setUser(null);
        } else {
          setUser(authData.user);

          // 🔹 Hacer todas las peticiones en paralelo
          const [userDataRes, userDetailsRes, tweetsRes, followersRes, followingRes] = await Promise.all([
            fetch("/api/users/data", { credentials: "include" }),
            fetch("/api/users/details", { credentials: "include" }),
            fetch("/api/tweets", { credentials: "include" }),
            fetch("/api/followers", { credentials: "include" }),
            fetch("/api/followers/following", { credentials: "include" }),
          ]);
          

          // 🔹 Convertir respuestas a JSON
          const [userData, userDetailsData, tweetsData, followersData, followingData] = await Promise.all([
            userDataRes.json(),
            userDetailsRes.json(),
            tweetsRes.json(),
            followersRes.json(),
            followingRes.json(),
          ]);

          // 🔹 Guardar los datos en el estado
          setUser(userData);
          setUserDetails(userDetailsData);
          setTweets(tweetsData.tweets || []);
          setFollowers(followersData);
          setFollowing(followingData);
        }
      } catch (err) {
        setError("Error al cargar los datos");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
            <CardLogros user={user} achievements={userDetails.achievements} />
            <CardIntereses user={user} interests={userDetails.interests} renderTagsWithColors={renderTagsWithColors} />
            <CardHabilidades user={user} skills={userDetails.skills} />
            <CardEstadisticas user={user} stats={{ posts: tweets.length, comments: 120, interactions: 500 }} />
            <CardTweets tweets={tweets} user={user} handleDeleteTweet={() => {}} handleEditTweet={() => {}} handleSaveTweet={() => {}} />
            <UserTabs user={user} seguidores={followers} seguidos={following} recomendaciones={userDetails.recommendations} followUser={() => {}} unfollowUser={() => {}} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}