import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function DELETE(request: NextRequest, context: { params: { id: string } }) {
  try {
    const userId = context.params.id; // ✅ Accede a context.params directamente
    const cookie = request.headers.get("cookie");

    const res = await fetch(`http://localhost:3001/api/users/admin/${userId}`, {
      method: "DELETE",
      headers: {
        Cookie: cookie ?? "",
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
