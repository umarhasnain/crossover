import { NextResponse } from 'next/server';

// Dummy in-memory store (replace with real DB like MongoDB or Prisma)
let transactions = [];

export function POST(req) {
  return req.json().then(({ email, packageName, amount }) => {
    const transaction = {
      id: Date.now().toString(),
      email,
      packageName,
      amount,
      timestamp: new Date().toISOString(),
    };

    transactions.push(transaction);

    return NextResponse.json({ success: true });
  });
}

export function GET() {
  return NextResponse.json(transactions);
}
