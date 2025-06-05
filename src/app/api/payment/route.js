// import { NextResponse } from 'next/server';
// import Client from 'square'; // ✅ default import
// import { connectDB } from '@/lib/mongodb.js';
// import Payment from '@/backend/models/payment.js';

// const client = new Client({
//   accessToken: process.env.SQUARE_ACCESS_TOKEN,
//   environment: Client.environments.Sandbox, // ✅ correct way
// });

// export async function POST(req) {
//   const { sourceId, amount, currency } = await req.json();
//   await connectDB();

//   try {
//     const result = await client.paymentsApi.createPayment({
//       sourceId,
//       idempotencyKey: Date.now().toString(),
//       amountMoney: {
//         amount,
//         currency,
//       },
//     });

//     const payment = await Payment.create({
//       amount,
//       status: result.result.payment.status,
//     });

//     return NextResponse.json({ success: true, message: 'Payment successful!' });
//   } catch (error) {
//     console.error('Payment Error:', error);
//     return NextResponse.json({ success: false, error: 'Payment failed!' }, { status: 500 });
//   }
// }



import { NextResponse } from 'next/server';
import { Client, Environment } from 'square'; // ✅ CORRECT way
import { connectDB } from '@/lib/mongodb.js';
import Payment from '@/backend/models/payment.js';

// ✅ initialize Square client
const client = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: Environment.Sandbox, // ✅ correct enum
});

export async function POST(req) {
  try {
    const { sourceId, amount, currency } = await req.json();
    await connectDB();

    const result = await client.paymentsApi.createPayment({
      sourceId,
      idempotencyKey: Date.now().toString(), // you can use uuid too
      amountMoney: {
        amount: Number(amount),
        currency: currency || 'USD',
      },
    });

    await Payment.create({
      amount,
      status: result.result.payment.status,
    });

    return NextResponse.json({ success: true, message: 'Payment successful!' });
  } catch (error) {
    console.error('❌ Payment Error:', error);

    const errorMessage =
      error?.response?.body?.errors?.[0]?.detail || error.message || 'Unknown server error';

    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
