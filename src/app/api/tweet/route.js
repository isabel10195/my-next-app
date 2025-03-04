import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    // 🔥 Llamamos a nuestra API backend para obtener los tweets del usuario autenticado
    const response = await fetch("http://localhost:3001/api/tweets/user", {
      headers: { Authorization: `Bearer ${token}` },
      credentials: "include",
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Error obteniendo tweets" }, { status: response.status });
    }

    const tweets = await response.json();
    return NextResponse.json(tweets, { status: 200 });

  } catch (error) {
    console.error("❌ Error obteniendo tweets:", error);
    return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
  }
}
