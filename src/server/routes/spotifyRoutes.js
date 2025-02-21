const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

// Función para obtener el token de Spotify
const getSpotifyAccessToken = async () => {
  try {
      const response = await axios.post(
          "https://accounts.spotify.com/api/token",
          new URLSearchParams({
              grant_type: "client_credentials",
          }),
          {
              headers: {
                  Authorization: `Basic ${Buffer.from(
                      `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
                  ).toString("base64")}`,
                  "Content-Type": "application/x-www-form-urlencoded",
              },
          }
      );

      return response.data.access_token; // Devuelve el token
  } catch (error) {
      console.error("Error obteniendo el token de Spotify:", error.response?.data || error.message);
      return null;
  }
};

module.exports = { getSpotifyAccessToken };

// Ruta para obtener recomendaciones de Spotify
router.get("/recommendations", async (req, res) => {
  try {
      const accessToken = await getSpotifyAccessToken();

      if (!accessToken) {
          return res.status(500).json({ error: "No se pudo obtener el token de Spotify" });
      }

      const response = await axios.get("https://api.spotify.com/v1/recommendations", {
          headers: {
              Authorization: `Bearer ${accessToken}`,
          },
          params: {
              seed_genres: "pop,rock",
              limit: 5,
          },
      });

      res.json(response.data);
  } catch (error) {
      console.error("Error obteniendo recomendaciones:", error.response?.data || error.message);
      res.status(500).json({ error: "Error obteniendo recomendaciones de Spotify" });
  }
});

module.exports = router;
