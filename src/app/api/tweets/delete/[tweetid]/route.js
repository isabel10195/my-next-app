import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function DELETE(req, { params }) {
  try {
    const { tweetId } = params; // Obtener el tweetId desde la URL
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    const response = await fetch(`http://localhost:3001/api/tweets/delete/${tweetId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Error al eliminar el tweet" }, { status: response.status });
    }

    return NextResponse.json({ message: "Tweet eliminado correctamente" }, { status: 200 });
  } catch (error) {
    console.error("❌ Error en la API de eliminación de tweets:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
