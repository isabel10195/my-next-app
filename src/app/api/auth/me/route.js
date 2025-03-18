import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    console.log("🔄 Iniciando autenticación en api/auth/me");

    const cookieStore = await cookies(); // ✅ Obtener cookies correctamente
    const token = cookieStore.get("token")?.value;

    if (!token) {
      console.warn("⚠️ No hay token en las cookies, usuario no autenticado.");
      return NextResponse.json({ authenticated: false, user: null }, { status: 200 }); // Devuelve 200 en vez de 401
    }

    console.log("✅ Token encontrado en cookies:", token);

    // 🔄 Intentamos obtener el perfil del usuario
    const response = await fetch("http://localhost:3001/api/auth/profile", {
      credentials: "include",
      headers: { Authorization: `Bearer ${token}` },
    }).catch(err => {
      console.error("❌ Error en la petición al backend:", err);
      throw new Error("ECONNREFUSED");
    });

    if (!response.ok) {
      console.warn(`⚠️ No se pudo obtener el perfil (status ${response.status}), usuario no autenticado.`);
      return NextResponse.json({ authenticated: false, user: null }, { status: 200 }); // También status 200 en caso de error
    }

    const user = await response.json();
    console.log("✅ Perfil del usuario obtenido:", user);

    return NextResponse.json({ authenticated: true, user }, { status: 200 });

  } catch (error) {
    if (error.message === "ECONNREFUSED") {
      console.error("❌ Error: No se pudo conectar con el backend.");
      return NextResponse.json({ authenticated: false, user: null, error: "No se pudo conectar con el backend" }, { status: 200 });
    }

    console.error("❌ Error inesperado en api/auth/me:", error);
    return NextResponse.json({ authenticated: false, user: null, error: "Error inesperado" }, { status: 200 });
  }
}
