"use client";

import { useState, useEffect, useCallback } from "react";
import { fetchFollowers, fetchFollowing } from "@/server/service/followerService";

import { fetchUserData, fetchUserDetails } from "@/server/service/userService";

import { fetchTweets } from "@/server/service/tweetService";



export default function useProfile(userId) {
  
  const [profile, setProfile] = useState(null);
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

  /** 🔹 Obtener datos básicos del usuario */
  const fetchProfileData = useCallback(async () => {
    console.log("📡 Intentando obtener datos del usuario...");
    try {
      setLoading(true);
      const data = await fetchUserData();
      console.log("✅ Datos del usuario obtenidos:", data);
      setProfile(data);
    } catch (err) {
      console.error("❌ Error en fetchProfileData:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  /** 🔹 Obtener detalles adicionales del usuario */
  const fetchUserDetailsData = useCallback(async () => {
    console.log("📡 Intentando obtener detalles del usuario...");
    try {
      setLoading(true);
      const data = await fetchUserDetails();
      console.log("✅ Detalles del usuario obtenidos:", data);
      setUserDetails(data);
    } catch (err) {
      console.error("❌ Error en fetchUserDetails:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  /** 🔹 Obtener seguidores */
  const fetchFollowersData = useCallback(async () => {
    console.log("📡 Intentando obtener seguidores...");
    try {
      setLoading(true);
      const data = await fetchFollowers();
      console.log("✅ Seguidores obtenidos:", data);
      setFollowers(data.seguidores ?? []);
    } catch (err) {
      console.error("❌ Error en fetchFollowers:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  /** 🔹 Obtener seguidos */
  const fetchFollowingData = useCallback(async () => {
    console.log("📡 Intentando obtener seguidos...");
    try {
      setLoading(true);
      const data = await fetchFollowing();
      console.log("✅ Seguidos obtenidos:", data);
      setFollowing(data.seguidos ?? []);
    } catch (err) {
      console.error("❌ Error en fetchFollowing:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  /** 🔹 Obtener tweets del usuario */
  const fetchTweetsData = useCallback(async () => {
    console.log(`📡 Intentando obtener tweets del usuario ${userId}...`);
    try {
      setLoading(true);
      const data = await fetchTweets();
      console.log("✅ Tweets obtenidos:", data);
      setTweets(data ?? []);
    } catch (err) {
      console.error("❌ Error en fetchTweets:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  /** 🔹 Ejecutar todas las peticiones al montar */
  useEffect(() => {
    if (!userId) return;
    fetchProfileData();
    fetchUserDetailsData();
    fetchFollowersData();
    fetchFollowingData();
    fetchTweetsData();
  }, [userId, fetchProfileData, fetchUserDetailsData, fetchFollowersData, fetchFollowingData, fetchTweetsData]);

  return {
    profile,
    userDetails,
    followers,
    following,
    tweets,
    loading,
    error,
    fetchProfileData,
    fetchUserDetailsData,
    fetchFollowersData,
    fetchFollowingData,
    fetchTweetsData,
  };
}
