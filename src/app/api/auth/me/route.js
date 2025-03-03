import { NextResponse } from "next/server";
import { cookies } from "next/headers"; 

export async function GET() {
  try {
    const cookieStore = cookies(); // ✅ Corrección aquí
    const token = cookieStore.get("token")?.value;

    if (!token) {
      console.error("❌ No hay token en las cookies (api auth/me).");
      return NextResponse.json({ authenticated: false, user: null }, { status: 401 });
    }

    console.log("✅ Token encontrado en cookies:", token);

    const response = await fetch("http://localhost:3001/api/auth/profile", {
      credentials: "include",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      console.error("❌ Error al obtener el perfil:", response.status);
      return NextResponse.json({ authenticated: false, user: null }, { status: response.status });
    }

    const user = await response.json();
    console.log("✅ Perfil del usuario obtenido:", user);

    return NextResponse.json({ authenticated: true, user }, { status: 200 });

  } catch (error) {
    console.error("❌ Error obteniendo sesión:", error);
    return NextResponse.json({ authenticated: false, user: null }, { status: 500 });
  }
}
