import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const coin = searchParams.get('coin');
  const currency = searchParams.get('currency');

  if (!coin || !currency) {
    return new Response(JSON.stringify({ error: 'Faltan parámetros' }), { status: 400 });
  }

  try {
    const res = await fetch(`http://localhost:3001/api/crypto/chart/${coin}/${currency}`);
    const data = await res.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || 'Error interno' }), { status: 500 });
  }
}
