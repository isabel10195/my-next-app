// Archivo: app/api/crypto/route.js
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const base = searchParams.get("base");
  const quote = searchParams.get("quote");

  if (!base || !quote) {
    return new Response(JSON.stringify({ error: "Faltan parámetros base y quote" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    // API de CoinCap para obtener historial de precios
    const cryptoUrl = `https://api.coincap.io/v2/assets/${base.toLowerCase()}/history?interval=d1`;
    const response = await fetch(cryptoUrl);
    if (!response.ok) throw new Error("Error al obtener datos de CoinCap");

    const data = await response.json();
    if (!data.data) throw new Error("No se encontraron datos en la API de CoinCap");

    const formattedData = data.data.map((point) => ({
      timestamp: point.time,
      price: parseFloat(point.priceUsd),
    }));

    return new Response(JSON.stringify(formattedData), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // Evita problemas de CORS
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
