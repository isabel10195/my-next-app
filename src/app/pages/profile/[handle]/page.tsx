"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Toaster } from "react-hot-toast";
import CardUsuario from "@/components/perfil_c/profile_card_usuario";
import CardTweets from "@/components/perfil_c/profile_card_tweets";
import PerfilNavHandle from "@/components/perfil_c/perfil_nav_handle";
import CardLogros from "@/components/perfil_c/profile_card_logros";
import CardIntereses from "@/components/perfil_c/profile_card_intereses";
import CardHabilidades from "@/components/perfil_c/profile_card_habilidades";
import UserTabs from "@/components/perfil_c/profile_tabs";

interface NormalizedUser {
  user_id: number;
  name: string;
  user_handle: string;
  avatarUrl?: string;
  coverUrl?: string;
  bio?: string;
  location?: string;
  birthday?: string;
  email?: string;
  followers: number;
  following: number;
}

export default function ProfilePage() {
  const { handle } = useParams();
  const [user, setUser] = useState<NormalizedUser | null>(null);
  const [tweets, setTweets] = useState<any[]>([]);
  const [userDetails, setUserDetails] = useState({
    achievements: [] as string[],
    interests: [] as string[],
    skills: [] as string[],
  });
  const [followers, setFollowers] = useState<any[]>([]);
  const [following, setFollowing] = useState<any[]>([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await fetch(`/api/users/handle/${handle}`, { credentials: "include" });
        const userData = await userRes.json();

        const normalizedUser: NormalizedUser = {
          user_id: userData.user_id,
          name: `${userData.first_name ?? ""} ${userData.last_name ?? ""}`.trim(),
          user_handle: userData.user_handle,
          avatarUrl: userData.avatar_url,
          coverUrl: userData.cover_url,
          bio: userData.bio,
          location: userData.location,
          birthday: userData.date_of_birth,
          email: userData.email_address,
          followers: userData.followers ?? 0,
          following: userData.following ?? 0,
        };
        setUser(normalizedUser);

        const tweetsRes = await fetch(`/api/tweets/user/${handle}`, { credentials: "include" });
        const tweetsData = await tweetsRes.json();
        setTweets(Array.isArray(tweetsData) ? tweetsData : tweetsData?.tweets ?? []);

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

        // 🔥 Comprobar si ya lo sigo
        const checkFollowingRes = await fetch("/api/followers/following", { credentials: "include" });
        if (checkFollowingRes.ok) {
          const data = await checkFollowingRes.json();
          const yaLoSigo = data.seguidos.some((u: any) => u.user_handle === handle);
          setIsFollowing(yaLoSigo);
        }
      } catch (err) {
        console.error("❌ Error en fetch de profile handle:", err);
        setError("Error al cargar los datos del usuario");
      } finally {
        setLoading(false);
      }
    };

    if (handle) fetchData();
  }, [handle]);

  const handleToggleFollow = async () => {
    try {
      const endpoint = isFollowing ? "/api/followers/unfollow" : "/api/followers/follow";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ follow_user_id: user?.user_id }),
      });

      if (res.ok) {
        setIsFollowing((prev) => !prev);
      } else {
        const data = await res.json();
        throw new Error(data.error || "Error al seguir/dejar de seguir");
      }
    } catch (error) {
      console.error("❌ Error al seguir/dejar de seguir:", error);
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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-gray-200 dark:bg-gray-950 min-h-screen overflow-x-hidden">
      <Toaster />
      <div className="mx-auto px-4 lg:px-8 flex justify-center mt-4">
        <div className="flex flex-col lg:flex-row gap-8 w-full">
          <div className="w-full lg:w-[250px] lg:flex-shrink-0 space-y-4 z-10 -mt-4">
            <PerfilNavHandle />
          </div>

          <div className="flex-1 space-y-4 w-full relative overflow-y-auto pb-24">
            <CardUsuario
              user={user}
              isFollowing={isFollowing}
              isOwnProfile={false}
              onToggleFollow={handleToggleFollow}
            />
            <CardTweets tweets={tweets} user={user} editable={false} />
            <div className="space-y-4">
              <CardLogros user={user} achievements={userDetails.achievements} />
              <CardIntereses
                user={user}
                interests={userDetails.interests}
                renderTagsWithColors={renderTagsWithColors}
                editable={false}
              />
              <CardHabilidades user={user} skills={userDetails.skills} editable={false} />
            </div>

            <UserTabs
              user={user}
              seguidores={followers}
              following={following}
              recomendaciones={[]}
              followUser={() => {}}
              unfollowUser={() => {}}
              setFollowing={() => {}}
              refetchFollowing={async () => {}}
              isOwnProfile={false}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
