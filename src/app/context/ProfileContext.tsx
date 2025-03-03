"use client";

import { createContext, useContext, useEffect, useState } from "react";
import  useProfile  from "@/app/hooks/useProfile"; // Para obtener la información del perfil de un usuario
import { useAuth } from "@/app/context/AuthContext"; // Para obtener el usuario autenticado

const ProfileContext = createContext(null);

export function ProfileProvider({ children }) {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { profile: userProfile, followers: userFollowers, following: userFollowing, tweets: userTweets, loading: profileLoading, error: profileError, followUser, unfollowUser } = useProfile(user?.user_id);

  useEffect(() => {
    if (!user) return;

    setProfile(userProfile);
    setFollowers(userFollowers);
    setFollowing(userFollowing);
    setTweets(userTweets);
    setLoading(profileLoading);
    setError(profileError);
  }, [user, userProfile, userFollowers, userFollowing, userTweets, profileLoading, profileError]);

  return (
    <ProfileContext.Provider value={{ profile, followers, following, tweets, loading, error, followUser, unfollowUser }}>
      {children}
    </ProfileContext.Provider>
  );
}

// Hook personalizado para acceder al contexto
export function useProfileContext() {
  return useContext(ProfileContext);
}
