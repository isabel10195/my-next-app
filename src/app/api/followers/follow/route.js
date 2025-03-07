import { NextResponse } from "next/server";


const API_BASE_URL = "http://localhost:3001/api/followers/follow";

export async function POST(req) {
  const { user_id } = await req.json();

  const response = await fetchWithAuth(API_BASE_URL, {
    method: "POST",
    body: JSON.stringify({ user_id }),
  });

  if (!response.ok) {
    return NextResponse.json({ error: "Error al seguir usuario" }, { status: response.status });
  }

  const data = await response.json();
  return NextResponse.json(data);
}
