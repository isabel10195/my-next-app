import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    console.log("📡 Solicitando detalles del usuario desde Next.js API");

    // Obtener token desde las cookies
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      console.warn("❌ No hay token en las cookies, usuario no autenticado.");
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    console.log("✅ Token encontrado, enviando petición al backend...");

    const response = await fetch("http://localhost:3001/api/users/details", {
      headers: { Authorization: `Bearer ${token}` },
      credentials: "include",
    });

    if (!response.ok) {
      console.error("❌ Error al obtener detalles del usuario, código:", response.status);
      return NextResponse.json({ error: "Error obteniendo detalles del usuario" }, { status: response.status });
    }

    const data = await response.json();
    console.log("📜 Datos obtenidos del backend:", data);

    return NextResponse.json(data, { status: 200 });

  } catch (error) {
    console.error("❌ Error interno en la API de details.ts:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
