import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    console.log("🔄 Iniciando autenticación en api/auth/me");

    const cookieStore = await cookies(); // ✅ Obtener cookies correctamente
    const token = cookieStore.get("token")?.value;

    if (!token) {
      console.error("❌ No hay token en las cookies en api/auth/me.");
      return NextResponse.json({ authenticated: false, user: null }, { status: 401 });
    }

    console.log("✅ Token encontrado en cookies en api/auth/me:", token);

    // 🔄 Intentamos obtener el perfil del usuario
    const response = await fetch("http://localhost:3001/api/auth/profile", {
      credentials: "include",
      headers: { Authorization: `Bearer ${token}` },
    }).catch(err => {
      console.error("❌ Error en la petición al backend en api/auth/me:", err);
      throw new Error("ECONNREFUSED");
    });

    if (!response.ok) {
      console.error(`❌ Error al obtener el perfil en api/auth/me: ${response.status}`);
      return NextResponse.json({ authenticated: false, user: null }, { status: response.status });
    }

    const user = await response.json();
    console.log("✅ Perfil del usuario obtenido en api/auth/me:", user);

    return NextResponse.json({ authenticated: true, user }, { status: 200 });

  } catch (error) {
    if (error.message === "ECONNREFUSED") {
      console.error("❌ Error: No se pudo conectar con el backend en api/auth/me.");
      return NextResponse.json({ authenticated: false, user: null, error: "No se pudo conectar con el backend" }, { status: 500 });
    }

    console.error("❌ Error inesperado en api/auth/me:", error);
    return NextResponse.json({ authenticated: false, user: null, error: "Error inesperado" }, { status: 500 });
  }
}
