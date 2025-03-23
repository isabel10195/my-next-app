import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const base = searchParams.get("base");
  const quote = searchParams.get("quote");

  if (!base || !quote) {
    return NextResponse.json({ error: "Faltan parámetros base y quote" }, { status: 400 });
  }

  try {
    // ✅ CoinCap no usa "base/quote", sino solo "base"
    const url = `https://api.coincap.io/v2/assets/${base.toLowerCase()}/history?interval=d1`;
    const response = await fetch(url);

    if (!response.ok) {
      console.error(`❌ Error en API de CoinCap para ${base}: ${response.statusText}`);
      return NextResponse.json({ error: `No se pudo obtener datos para ${base}`, prices: [] }, { status: response.status });
    }

    const data = await response.json();

    // ✅ Si la API no devuelve datos, no intentamos procesarlos
    if (!data || !data.data || data.data.length === 0) {
      console.warn(`⚠️ No se encontraron datos para ${base}`);
      return NextResponse.json({ error: `No se encontraron datos para ${base}`, prices: [] }, { status: 404 });
    }

    const formattedData = data.data.map((point) => ({
      timestamp: point.time,
      price: parseFloat(point.priceUsd),
    }));

    return NextResponse.json({ prices: formattedData }, { status: 200 });
  } catch (error) {
    console.error(`❌ Error en API /api/crypto (${base}/${quote}):`, error.message);
    return NextResponse.json({ error: "No se pudo obtener datos", prices: [] }, { status: 500 });
  }
}
