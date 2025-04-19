import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const res = await fetch("http://localhost:3001/api/followers/recommendations", {
    headers: {
      Cookie: req.headers.get("cookie") || "",
    },
  });

  const data = await res.json();
  return NextResponse.json(data);
}
