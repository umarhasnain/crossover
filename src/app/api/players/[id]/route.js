import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb.js';
import Player from '@/backend/models/player.js';

export async function DELETE(req, { params }) {
  await connectDB();
  const { id } = params;

  try {
    await Player.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  await connectDB();
  const { id } = params;
  const updatedData = await req.json();

  try {
    const updatedPlayer = await Player.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedPlayer) {
      return NextResponse.json({ success: false, message: 'Player not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: updatedPlayer });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
