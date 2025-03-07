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
import Menu from "@/components/perfil_c/perfil_nav";

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
        const authRes = await fetch("/api/auth/me");
        const authData = await authRes.json();
        if (!authData.authenticated) {
          setError("Inicia sesión para ver tu perfil");
          setLoading(false);
          return;
        }
        setUser(authData.user);

        // 🔹 Hacer todas las peticiones en paralelo
        const [userDataRes, userDetailsRes, tweetsRes, followersRes, followingRes] = await Promise.all([
          fetch("/api/users/data"),
          fetch("/api/users/details"),
          fetch("/api/tweets"),
          fetch("/api/followers"),
          fetch("/api/followers/following"),
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
      } catch (err) {
        setError("Error al cargar los datos");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

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
            <Menu />
          </div>
          <div className="flex-1 space-y-4 w-full relative">
            <CardUsuario user={user} />
            {/* <CardLogros achievements={userDetails.achievements} />
            <CardIntereses interests={userDetails.interests} />
            <CardHabilidades skills={userDetails.skills} />
            <CardEstadisticas stats={{ posts: tweets.length, comments: 120, interactions: 500 }} />
            <CardTweets tweets={tweets} />
            <UserTabs seguidores={followers} seguidos={following} /> */}
          </div>
        </div>
      </div>
    </motion.div>
  );
}