"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import useProfile from "@/app/hooks/useProfile";
import CardUsuario from "@/components/perfil_c/profile_card_usuario";
import CardLogros from "@/components/perfil_c/profile_card_logros";
import CardIntereses from "@/components/perfil_c/profile_card_intereses";
import CardEstadisticas from "@/components/perfil_c/card_estadisticas";
import CardHabilidades from "@/components/perfil_c/profile_card_habilidades";
import CardTweets from "@/components/perfil_c/profile_card_tweets";
import UserTabs from "@/components/perfil_c/profile_tabs";
import Menu from "@/components/perfil_c/perfil_nav";

export default function ProfilePage() {
  const {
    profile,
    followers,
    following,
    tweets,
    userDetails,
    followUser,
    unfollowUser,
    handleDeleteTweet,
    handleEditTweet,
    handleSaveTweet,
  } = useProfile();
  
  const renderTagsWithColors = (tags: string[]) => {
    const colors = ["bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-red-500", "bg-purple-500"];
    return tags.map((tag, index) => (
      <span key={index} className={`px-2 py-1 text-white rounded ${colors[index % colors.length]}`}>
        {tag}
      </span>
    ));
  };
  
  const [isExpanded, setIsExpanded] = useState(false);

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
          {/* Menú lateral */}
          <div className="w-full lg:w-[250px] lg:flex-shrink-0 space-y-4 z-10 -mt-4">
            <Menu />
          </div>
          <div className="flex-1 space-y-4 w-full relative">
            <div className="flex flex-col lg:flex-row gap-8 w-full">
              {/* DISPOSICIÓN PANTALLAS PEQUEÑAS */}
              <div className="lg:hidden w-full">
                <CardUsuario/>
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="w-full flex py-1 px-2 bg-white dark:bg-gray-800 rounded-md shadow-sm"
                >
                  <span className="mr-2 text-xs text-gray-700 dark:text-gray-300">{isExpanded ? 'Ocultar detalles' : 'Mostrar detalles'}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transition-transform text-black dark:text-white ${isExpanded ? 'rotate-180' : ''}`}
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden mt-2"
                >
                  <CardLogros achievements={userDetails?.achievements??[]} />
                  <CardIntereses interests={userDetails?.interests ?? []} renderTagsWithColors={renderTagsWithColors} />
                  <CardHabilidades skills={userDetails?.skills ?? []} />
                  <CardEstadisticas stats={{ posts: 35, comments: 120, interactions: 500 }} />
                </motion.div>
              </div>
              <div className="lg:hidden w-full">
                <CardTweets
                  tweets={tweets}
                  handleDeleteTweet={handleDeleteTweet}
                  handleEditTweet={handleEditTweet}
                  handleSaveTweet={handleSaveTweet}
                />
              </div>
              <div className="lg:hidden w-full">
                <UserTabs
                  seguidores={followers}
                  seguidos={following}
                  recomendaciones={userDetails?.recommendations ?? []}
                  followUser={followUser}
                  unfollowUser={unfollowUser}
                />
              </div>
              {/* DISPOSICIÓN PANTALLAS GRANDES */}
              <div className="hidden lg:block xl:block relative w-full xl:w-[300px] xl:ml-60 mt-2 space-y-4">
                <CardUsuario/>
                <CardLogros achievements={userDetails?.achievements??[]} />
                <CardIntereses interests={userDetails?.interests ?? []} renderTagsWithColors={renderTagsWithColors} />
                <CardHabilidades skills={userDetails?.skills ?? []} />
                <CardEstadisticas stats={{ posts: 35, comments: 120, interactions: 500 }} />
              </div>
              <div className="hidden lg:block xl:block relative w-full xl:w-[800px] mt-2 space-y-4">
                <CardTweets
                  tweets={tweets}
                  handleDeleteTweet={handleDeleteTweet}
                  handleEditTweet={handleEditTweet}
                  handleSaveTweet={handleSaveTweet}
                />
              </div>
              <div className="hidden lg:block xl:block relative w-full xl:w-[400px] mt-2 space-y-4">
                <UserTabs
                  seguidores={followers}
                  seguidos={following}
                  recomendaciones={userDetails?.recommendations ?? []}
                  followUser={followUser}
                  unfollowUser={unfollowUser}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}