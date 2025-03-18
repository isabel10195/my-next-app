import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    console.log("🔄 Iniciando autenticación en api/auth/me");

    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    // 🔥 Eliminar cookies innecesarias para reducir el tamaño del header
    cookieStore.delete("SLG_GWPT_Show_Hide_tmp");
    cookieStore.delete("SLG_wptGlobTipTmp");

    if (!token) {
      console.error("❌ No hay token en las cookies en api/auth/me.");
      return NextResponse.json({ authenticated: false, user: null }, { status: 401 });
    }

    console.log("✅ Token encontrado en cookies en api/auth/me:", token);

    // 🔄 Intentamos obtener el perfil del usuario
    const response = await fetch("http://localhost:3001/api/auth/profile", {
      headers: { Authorization: `Bearer ${token}` }, // ❌ Quitar `credentials: "include"`
    });

    if (!response.ok) {
      console.error(`❌ Error al obtener el perfil en api/auth/me: ${response.status}`);
      return NextResponse.json({ authenticated: false, user: null }, { status: response.status });
    }

    const user = await response.json();
    console.log("✅ Perfil del usuario obtenido en api/auth/me:", user);

    return NextResponse.json({ authenticated: true, user }, { status: 200 });

  } catch (error) {
    console.error("❌ Error inesperado en api/auth/me:", error);
    return NextResponse.json({ authenticated: false, user: null, error: "Error inesperado" }, { status: 500 });
  }
}
