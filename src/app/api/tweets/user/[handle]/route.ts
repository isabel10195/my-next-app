// 📄 /api/tweets/user/[handle]/route.ts
import { NextResponse } from "next/server";

export async function GET(_: Request, context: { params: { handle: string } }) {
  const { handle } = context.params;

  try {
    const res = await fetch(`http://localhost:3001/api/tweets/user/${handle}`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("❌ Backend error:", errorText);
      return NextResponse.json({ error: "Error al obtener tweets del usuario" }, { status: res.status });
    }

    const tweets = await res.json();
    return NextResponse.json({ tweets }, { status: 200 });

  } catch (error) {
    console.error("❌ Error interno:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
