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
import UserTabs from "@/components/perfil_c/profile_tabs"; // ✅ Habilitado

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
            console.log("📜 Detalles del usuario obtenidos:", detailsData);
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
            console.log("👥 Datos de following recibidos:", followingData); // 🔍 Agregar console.log() para depuración
            setFollowing(followingData.seguidos ?? []); // 🔥 Cambiar "following" por "seguidos"
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

  // 🔹 Función para seguir a un usuario
  const followUser = async (userId) => {
    try {
      const res = await fetch("/api/followers/follow", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ follow_user_id: userId }),
      });

      if (res.ok) {
        const updatedFollowers = await res.json();
        setFollowing(updatedFollowers.following ?? []);
      }
    } catch (error) {
      console.error("❌ Error al seguir usuario:", error);
    }
  };

  // 🔹 Función para dejar de seguir a un usuario
  const unfollowUser = async (userId) => {
    try {
      const res = await fetch("/api/followers/unfollow", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ follow_user_id: userId }),
      });

      if (res.ok) {
        const updatedFollowers = await res.json();
        setFollowing(updatedFollowers.following ?? []);
      }
    } catch (error) {
      console.error("❌ Error al dejar de seguir usuario:", error);
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
            <CardTweets tweets={tweets} user={user} handleDeleteTweet={() => {}} handleEditTweet={() => {}} />
            <CardLogros user={user} achievements={userDetails.achievements} />
            <CardIntereses user={user} interests={userDetails.interests} renderTagsWithColors={renderTagsWithColors} />
            <CardHabilidades user={user} skills={userDetails.skills} />

            {/* ✅ UserTabs habilitado */}
            <UserTabs
              user={user}
              seguidores={followers} 
              following={following} // ✅ Cambiado de "seguidos" a "following"
              recomendaciones={[]} 
              followUser={followUser}
              unfollowUser={unfollowUser}
            />

          </div>
        </div>
      </div>
    </motion.div>
  );
}
