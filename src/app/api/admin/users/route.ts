import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const cookie = request.headers.get("cookie"); // 🔥 Reenviamos la cookie del usuario autenticado

    const res = await fetch("http://localhost:3001/api/admin/users", {
      method: "GET",
      headers: {
        Cookie: cookie,
      },
    });

    if (!res.ok) throw new Error("Error al obtener usuarios");

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("❌ Error en GET /api/admin/users:", error);
    return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop(); // obtiene el último segmento (userId)

    const res = await fetch(`http://localhost:3001/api/users/admin/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) throw new Error("Error al eliminar usuario");

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("❌ Error en DELETE /api/admin/users:", error);
    return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 });
  }
}

