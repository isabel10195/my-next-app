export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const base = searchParams.get("base");
  const quote = searchParams.get("quote");

  if (!base || !quote) {
    return NextResponse.json({ error: "Faltan parámetros base y quote" }, { status: 400 });
  }

  try {
    const url = `https://api.coincap.io/v2/assets/${base.toLowerCase()}/history?interval=d1`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Error en la API de CoinCap");

    const data = await response.json();
    if (!data.data) throw new Error("No se encontraron datos");

    const formattedData = data.data.map((point) => ({
      timestamp: point.time,
      price: parseFloat(point.priceUsd),
    }));

    return NextResponse.json(formattedData, { status: 200 });
  } catch (error) {
    console.error(`❌ Error en API /api/crypto (${base}/${quote}):`, error.message);
    return NextResponse.json({ error: "No se pudo obtener datos", prices: [] }, { status: 500 });
  }
}
