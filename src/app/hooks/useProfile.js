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

  /** 🔹 Obtener tweets del usuario */
  const fetchTweetsData = useCallback(async () => {
    console.log(`📡 Intentando obtener tweets del usuario ${userId}...`);
    try {
      setLoading(true);
      const data = await fetchTweets();
      console.log("✅ Tweets obtenidos en useProfile:", data);
      setTweets(data?.tweets ?? []);
    } catch (err) {
      console.error("❌ Error en fetchTweets:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (!userId) return;
    fetchTweetsData();
  }, [userId, fetchTweetsData]);

  return {
    profile,
    userDetails,
    followers,
    following,
    tweets,
    loading,
    error,
    fetchTweetsData,
  };
}
