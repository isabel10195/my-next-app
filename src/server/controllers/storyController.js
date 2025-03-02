const storyService = require("../service/storyService");

exports.getStories = async (req, res) => {
    try {
        const userId = req.user.user_id; // Obtenemos el ID del usuario autenticado
        const stories = await storyService.fetchStories(userId);

        if (!stories || stories.length === 0) {
            return res.status(200).json([]); // Devuelve un array vacío en lugar de un error
        }

        res.status(200).json(stories);
    } catch (error) {
        console.error("❌ Error al obtener las stories:", error);
        res.status(500).json({ message: "Error al obtener las stories" });
    }
};

exports.createStory = async (req, res) => {
    try {
        const userId = req.user.user_id;
        const { image_url, description } = req.body;

        if (!image_url) {
            return res.status(400).json({ message: "❌ La imagen es obligatoria" });
        }

        await storyService.addStory(userId, image_url, description || ""); // Permite descripción vacía
        res.status(201).json({ message: "✅ Story creada con éxito" });
    } catch (error) {
        console.error("❌ Error al subir la story:", error);
        res.status(500).json({ message: "Error al subir la story" });
    }
};
