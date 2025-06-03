// app/api/players/[id]/route.js
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb.js';
import Player from '@/backend/models/player.js';

export async function DELETE(req, { params }) {
  await connectDB();
  const { id } = params;
  await Player.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
