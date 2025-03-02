import { NextResponse } from "next/server";

const API_URL = "http://localhost:3001/api/stories"; // URL del backend

// Obtener todas las stories (GET)
export async function GET() {
    try {
        const res = await fetch(API_URL, {
            method: "GET",
            credentials: "include", // Incluye cookies si hay autenticación
        });

        if (!res.ok) {
            throw new Error("Error al obtener stories");
        }

        const stories = await res.json();
        return NextResponse.json(stories, { status: 200 });
    } catch (error) {
        console.error("❌ Error en GET /api/stories:", error);
        return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 });
    }
}

// Subir una nueva story (POST)
export async function POST(req) {
    try {
        const body = await req.json();

        // Validar que la imagen es obligatoria
        if (!body.image_url) {
            return NextResponse.json({ message: "La imagen es obligatoria" }, { status: 400 });
        }

        const res = await fetch(API_URL, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        if (!res.ok) {
            throw new Error("Error al subir la story");
        }

        const data = await res.json();
        return NextResponse.json(data, { status: 201 });
    } catch (error) {
        console.error("❌ Error en POST /api/stories:", error);
        return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 });
    }
}
