"use client";

import { useState, useEffect, useCallback } from "react";

export default function useProfile(userId) {
  const [profile, setProfile] = useState(null);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfileData = useCallback(async () => {
    try {
      const res = await fetch(`/api/users/${userId}`);
      if (!res.ok) throw new Error("Error al obtener el perfil");
      const data = await res.json();
      setProfile(data);
    } catch (err) {
      console.error("Error al obtener perfil:", err);
      setError(err.message);
    }
  }, [userId]);

  const fetchFollowers = useCallback(async () => {
    try {
      const res = await fetch(`/api/followers/${userId}`);
      if (!res.ok) throw new Error("Error al obtener seguidores");
      const data = await res.json();
      setFollowers(data);
    } catch (err) {
      console.error("Error al obtener seguidores:", err);
      setError(err.message);
    }
  }, [userId]);

  const fetchFollowing = useCallback(async () => {
    try {
      const res = await fetch(`/api/followers/following/${userId}`);
      if (!res.ok) throw new Error("Error al obtener seguidos");
      const data = await res.json();
      setFollowing(data);
    } catch (err) {
      console.error("Error al obtener seguidos:", err);
      setError(err.message);
    }
  }, [userId]);

  const fetchTweets = useCallback(async () => {
    try {
      const res = await fetch(`/api/tweets/user/${userId}`);
      if (!res.ok) throw new Error("Error al obtener tweets");
      const data = await res.json();
      setTweets(data);
    } catch (err) {
      console.error("Error al obtener tweets:", err);
      setError(err.message);
    }
  }, [userId]);

  useEffect(() => {
    if (!userId) return;
    fetchProfileData();
    fetchFollowers();
    fetchFollowing();
    fetchTweets();
  }, [userId, fetchProfileData, fetchFollowers, fetchFollowing, fetchTweets]);

  return {
    profile,
    followers,
    following,
    tweets,
    loading,
    error,
    fetchProfileData,
    fetchFollowers,
    fetchFollowing,
    fetchTweets,
  };
}
