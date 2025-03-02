const express = require("express");
require("dotenv").config();

const router = express.Router();

router.post("/generate", async (req, res) => {
    try {
        const { prompt } = req.body;
        const image = await openai.images.generate({
            model: "dall-e-3",
            prompt: prompt,
            n: 1,
            size: "1024x1024",
            response_format: "url",
        });
        res.json({ imageUrl: image.data[0].url });
    } catch (error) {
        console.error("Error generating image:", error);
        res.status(500).json({ error: "Failed to generate image" });
    }
});

module.exports = router;