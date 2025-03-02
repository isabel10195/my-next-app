import { NextResponse } from "next/server";
import { cookies } from "next/headers"; // API para manejar cookies en el servidor

export async function GET() {
  try {
    const cookieStore = await cookies(); // 🔥 Usamos `await` para evitar errores
    const token = cookieStore.get("token")?.value;

    if (!token) {
      console.error("❌ No hay token en las cookies.");
      return NextResponse.json({ authenticated: false, user: null }, { status: 401 });
    }

    console.log("✅ Token encontrado en cookies:", token);

    const response = await fetch("http://localhost:3001/api/auth/profile", {
      credentials: "include",
      headers: { Authorization: `Bearer ${token}` }, // 🔥 Enviamos el token correctamente
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
