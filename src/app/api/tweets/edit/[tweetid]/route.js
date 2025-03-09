import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function PUT(req, { params }) {
  try {
    const tweetId = parseInt(params.tweetId, 10); // 🔥 Convertimos `tweetId` a número
    if (isNaN(tweetId)) { // Validamos que sea un número válido
      console.error("❌ ID de tweet inválido en API");
      return NextResponse.json({ error: "ID de tweet inválido" }, { status: 400 });
    }

    const { tweet_text } = await req.json();
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    const response = await fetch(`http://localhost:3001/api/tweets/edit/${tweetId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ tweet_text }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ error: errorData.error || "Error al editar el tweet" }, { status: response.status });
    }

    const updatedTweet = await response.json();
    return NextResponse.json(updatedTweet, { status: 200 });
  } catch (error) {
    console.error("❌ Error en la API de edición de tweets:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
