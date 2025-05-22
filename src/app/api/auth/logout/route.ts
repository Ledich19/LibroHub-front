// /app/api/auth/logout/route.ts
import { NextResponse } from 'next/server';

export async function POST() {
  const res = new NextResponse(null, { status: 200 });
  res.cookies.set('session', '', {
    httpOnly: true,
    path: '/',
    maxAge: 0 // удалить cookie
  });
  return res;
}