import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/app/context/AuthContext"; 

export const useStories = () => {
    const { token, user } = useAuth(); // Obtener token y usuario del contexto
    const [stories, setStories] = useState([]);
    const [message, setMessage] = useState("");

    const fetchStories = useCallback(async () => {
        if (!token) {
            setMessage("No autenticado"); 
            return;
        }

        try {
            const res = await fetch("/api/stories", {
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await res.json();

            if (data.message) {
                setMessage(data.message);
            } else {
                setStories(data);
            }
        } catch (error) {
            setMessage("Error al cargar stories");
        }
    }, [token]);

    useEffect(() => {
        fetchStories();
    }, [fetchStories]);

    return { stories, message, fetchStories };
};
