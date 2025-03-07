import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("📡 Solicitando detalles del usuario desde Next.js API");

    // 🔹 Hacer la solicitud al backend sin autenticación
    const response = await fetch("http://localhost:3001/api/users/details");

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
