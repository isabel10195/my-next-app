import { useState, useEffect } from "react";
import { useAuth } from "@/app/context/AuthContext";

export const useStories = () => {
    const { user, token } = useAuth();
    const [stories, setStories] = useState([]);
    const [followingUsers, setFollowingUsers] = useState([]);
    const [error, setError] = useState(null);

    // Obtener stories desde la API
    const fetchStories = async () => {
        if (!token) return;

        try {
            const res = await fetch("/api/stories", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);

            const data = await res.json();
            setStories(data.stories || []);
        } catch (error) {
            setError(error.message);
        }
    };

    // Obtener usuarios seguidos
    const fetchFollowing = async () => {
        if (!token) return;

        try {
            const res = await fetch("/api/followers/following", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);

            const data = await res.json();
            setFollowingUsers(data.seguidos || []);
        } catch (error) {
            setFollowingUsers([]);
        }
    };

    // **Función para subir una nueva story**
    const uploadStory = async (imageUrl, description = "") => {
        if (!token) return;

        try {
            const res = await fetch("/api/stories", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ image_url: imageUrl, description }),
            });

            if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);

            await fetchStories(); // 🔥 Recargar las stories después de subir una nueva
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchStories();
        fetchFollowing();
    }, [token]);

    return { stories, followingUsers, fetchStories, uploadStory, error };
};
