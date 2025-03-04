import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_BASE_URL = "http://localhost:3001/api/followers";

// ✅ Corrección: `cookies()` es asíncrona, hay que esperar su resultado
async function fetchWithAuth(url, options = {}) {
  try {
    const cookieStore = cookies(); // 🔥 Ya no es necesario await aquí
    const tokenData = await cookieStore; // ✅ Aquí obtenemos las cookies correctamente
    const token = tokenData.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    return response; // ✅ Devuelve la respuesta correctamente
  } catch (error) {
    console.error("Error en fetchWithAuth:", error);
    return NextResponse.json({ error: "Error interno en la autenticación" }, { status: 500 });
  }
}
// 📌 GET /api/followers → Obtener seguidores
export async function GET() {
  try {
    const url = `${API_BASE_URL}`;
    const response = await fetchWithAuth(url);

    if (!response || !response.ok) {
      return NextResponse.json({ error: "Error al obtener seguidores" }, { status: response?.status || 500 });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error en GET /api/followers:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

// 📌 POST /api/followers/follow → Seguir a un usuario
export async function POST(req) {
  const { user_id } = await req.json();
  const url = `${API_BASE_URL}/follow`;

  const response = await fetchWithAuth(url, {
    method: "POST",
    body: JSON.stringify({ user_id }),
  });

  if (!response.ok) {
    return NextResponse.json({ error: "Error al seguir usuario" }, { status: response.status });
  }

  const data = await response.json();
  return NextResponse.json(data, { status: 200 });
}

// 📌 DELETE /api/followers/unfollow → Dejar de seguir a un usuario

export async function DELETE(req) {
  const { user_id } = await req.json();
  const url = `${API_BASE_URL}/unfollow`;

  const response = await fetchWithAuth(url, {
    method: "DELETE", // 🔥 Antes estaba en POST, ahora es DELETE
    body: JSON.stringify({ user_id }),
  });

  if (!response.ok) {
    return NextResponse.json({ error: "Error al dejar de seguir usuario" }, { status: response.status });
  }

  const data = await response.json();
  return NextResponse.json(data, { status: 200 });
}

