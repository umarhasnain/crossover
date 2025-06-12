// import { NextResponse } from 'next/server';

// export async function POST(req) {
//   try {
//     const body = await req.json();
//     const { sourceId, amount, name, email, packageName } = body;

//     // Here, you'd call Square API to process payment
//     console.log('🔔 Payment details received:', {
//       sourceId,
//       amount,
//       name,
//       email,
//       packageName,
//     });

//     // TODO: Integrate with Square backend SDK to process actual payment

//     return NextResponse.json({ success: true, message: 'Payment processed successfully.',data:body });
//   } catch (error) {
//     console.error('API Payment Error:', error);
//     return NextResponse.json({ error: 'Something went wrong' }, { status: 500 },);
//   }
// }

"use server";

import { NextResponse } from 'next/server';
import { Client, Environment } from 'square'; // ✅ Correct import

export async function POST(req) {
  try {
    const body = await req.json();

    // ✅ Initialize Square client
    const client = new Client({
      accessToken: process.env.SQUARE_ACCESS_TOKEN,
      environment: Environment.Sandbox, // ✅ Correct usage
    });

    // ✅ Create payment
    const { result } = await client.paymentsApi.createPayment({
      sourceId: body.sourceId,
      idempotencyKey: crypto.randomUUID(),
      amountMoney: {
        amount: Number(body.amount), // ✅ No BigInt here
        currency: 'USD',
      },
      locationId: process.env.SQUARE_LOCATION_ID,
    });

    // ✅ Convert BigInt fields before returning JSON
    const sanitizedResult = JSON.parse(
      JSON.stringify(result, (_, value) =>
        typeof value === 'bigint' ? Number(value) : value
      )
    );

    return NextResponse.json({ success: true, payment: sanitizedResult });

  } catch (error) {
    console.error('Payment error:', error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
