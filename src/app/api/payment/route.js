import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const { sourceId, amount, name, email, packageName } = body;

    // Here, you'd call Square API to process payment
    console.log('🔔 Payment details received:', {
      sourceId,
      amount,
      name,
      email,
      packageName,
    });

    // TODO: Integrate with Square backend SDK to process actual payment

    return NextResponse.json({ success: true, message: 'Payment processed successfully.',data:body });
  } catch (error) {
    console.error('API Payment Error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 },);
  }
}
