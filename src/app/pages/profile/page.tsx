"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Toaster } from "react-hot-toast";
import CardUsuario from "@/components/perfil_c/profile_card_usuario";
import CardTweets from "@/components/perfil_c/profile_card_tweets";
import PerfilNav from "@/components/perfil_c/perfil_nav";
import CardLogros from "@/components/perfil_c/profile_card_logros";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [tweets, setTweets] = useState([]);
  const [userDetails, setUserDetails] = useState({ achievements: [] }); // ✅ Cambiado `logros` por `achievements`
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
          console.log("📦 Tweets obtenidos en page.tsx:", tweetsData);
          setTweets(tweetsData?.tweets ?? []);

          // 🔹 Obtener detalles del usuario
          const detailsRes = await fetch("/api/users/details", { credentials: "include" });

          if (!detailsRes.ok) {
            console.warn("⚠️ No se encontraron detalles del usuario (404). Manteniendo `achievements: []`.");
            setUserDetails({ achievements: [] });
          } else {
            const detailsData = await detailsRes.json();
            console.log("📜 Detalles del usuario obtenidos en page.tsx:", detailsData);
            setUserDetails({ achievements: detailsData.achievement ?? [] }); // ✅ Aseguramos que achievements tenga el formato correcto
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
            <CardTweets tweets={tweets} user={user} handleDeleteTweet={() => {}} handleEditTweet={() => {}} handleSaveTweet={() => {}} />
            <CardLogros user={user} achievements={userDetails.achievements ?? []} /> {/* ✅ Ahora pasamos `achievements` correctamente */}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
