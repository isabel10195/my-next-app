// 📁 /src/app/api/tweets/user/[handle]/route.ts

import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: Request, context: { params: { handle: string } }) {
  const { handle } = await context.params; // ✅ Esto debe llevar `await` si el contexto viene async

  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;

    const res = await fetch(`http://localhost:3001/api/tweets/user/${handle}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });

    if (!res.ok) {
      const errorData = await res.json();
      return NextResponse.json({ error: errorData.error || "Error al obtener tweets del usuario" }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("❌ Error en GET /api/tweets/user/[handle]:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
