import { useState, useEffect } from "react";

export const useStories = () => {
    const [stories, setStories] = useState([]);

    // Obtener stories desde la API
    const fetchStories = async () => {
        try {
            const res = await fetch("/api/stories");
            if (!res.ok) throw new Error("Error al obtener stories");

            const data = await res.json();
            setStories(data);
        } catch (error) {
            console.error("❌ Error cargando stories:", error);
        }
    };

    // Subir una nueva story
    const uploadStory = async (imageUrl, description) => {
        try {
            const res = await fetch("/api/stories", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ image_url: imageUrl, description }),
            });

            if (!res.ok) throw new Error("Error al subir la story");

            await fetchStories(); // Recargar stories después de subir
        } catch (error) {
            console.error("❌ Error subiendo la story:", error);
        }
    };

    useEffect(() => {
        fetchStories();
    }, []);

    return { stories, fetchStories, uploadStory };
};
