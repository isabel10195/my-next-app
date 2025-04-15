import { NextResponse } from "next/server";

export async function DELETE(request: Request, context: { params: { id: string } }) {
  try {
    const { params } = context;
    const cookie = request.headers.get("cookie");

    const res = await fetch(`http://localhost:3001/api/users/admin/${params.id}`, {
      method: "DELETE",
      headers: {
        Cookie: cookie ?? "", // reenviamos la cookie
      },
    });

    if (!res.ok) throw new Error("Error al eliminar usuario");

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("❌ Error en DELETE /api/admin/users/[id]:", error);
    return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 });
  }
}
