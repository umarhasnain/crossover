// app/api/players/route.js
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb.js';
import Player from '@/backend/models/player.js';

export async function GET() {
  await connectDB();
  const players = await Player.find();
  return NextResponse.json(players);
}

export async function POST(req) {
  await connectDB();
  const data = await req.json();
  const newPlayer = await Player.create(data);
  return NextResponse.json(newPlayer, { status: 201 });
}
