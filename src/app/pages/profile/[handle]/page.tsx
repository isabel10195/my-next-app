"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
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
  const { handle } = useParams();
  const [user, setUser] = useState(null);
  const [tweets, setTweets] = useState([]);
  const [userDetails, setUserDetails] = useState({ achievements: [], interests: [], skills: [] });
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await fetch(`/api/users/handle/${handle}`, { credentials: "include" });
        const userData = await userRes.json();
        setUser(userData);

        const tweetsRes = await fetch(`/api/tweets/user/${handle}`, { credentials: "include" });
        const tweetsData = await tweetsRes.json();

        const tweetsArray = Array.isArray(tweetsData)
          ? tweetsData
          : tweetsData?.tweets ?? [];

        setTweets(tweetsArray);

        const detailsRes = await fetch(`/api/users/handle/${handle}/details`, { credentials: "include" });
        const detailsData = await detailsRes.json();
        setUserDetails({
          achievements: detailsData.achievement ?? [],
          interests: detailsData.interest ?? [],
          skills: detailsData.skill ?? [],
        });

        const followersRes = await fetch(`/api/followers/handle/${handle}`, { credentials: "include" });
        const followersData = await followersRes.json();
        setFollowers(followersData.followers ?? []);

        const followingRes = await fetch(`/api/followers/handle/${handle}/following`, { credentials: "include" });
        const followingData = await followingRes.json();
        setFollowing(followingData.seguidos ?? []);
      } catch (err) {
        console.error("❌ Error en fetch de profile handle:", err);
        setError("Error al cargar los datos del usuario");
      } finally {
        setLoading(false);
      }
    };

    if (handle) fetchData();
  }, [handle]);

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
            <PerfilNav />
          </div>

          <div className="flex-1 space-y-4 w-full relative overflow-y-auto pb-24">
            <CardUsuario user={user} />

            <CardTweets tweets={Array.isArray(tweets) ? tweets : []} user={user} />

            <div className="space-y-4">
              <CardLogros user={user} achievements={userDetails.achievements} />
              <CardIntereses user={user} interests={userDetails.interests} renderTagsWithColors={renderTagsWithColors} />
              <CardHabilidades user={user} skills={userDetails.skills} />
            </div>

            <UserTabs
              user={user}
              seguidores={followers}
              following={following}
              recomendaciones={[]}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
