const express = require('express');
const router = express.Router();
const axios = require('axios');

// Cache simple en memoria
const cache = {};

router.get('/chart/:coin/:currency', async (req, res) => {
  const { coin, currency } = req.params;
  const key = `${coin}_${currency}`;
  const now = Date.now();

  // Si los datos están en cache y no han expirado (60 segundos)
  if (cache[key] && now - cache[key].timestamp < 60000) {
    console.log(`✅ Cache hit para ${key}`);
    return res.json(cache[key].data);
  }

  const url = `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=${currency}&days=7&interval=daily`;

  console.log(`➡️ Solicitando ${url}`);

  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'my-next-app/1.0 (tucorreo@example.com)', // opcionalmente cambia a tu correo real
      },
    });

    // Guardamos en cache
    cache[key] = {
      data: response.data,
      timestamp: now,
    };

    res.json(response.data);
  } catch (err) {
    console.error("❌ Error al obtener datos de CoinGecko:", err.message);
    res.status(500).json({ error: "Error al obtener datos del gráfico" });
  }
});

module.exports = router;
