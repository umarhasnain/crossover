import { Client, Environment } from 'square';
import { connectDB } from '@/lib/db';
import Transaction from '@/models/Transaction';
import nodemailer from 'nodemailer';

const client = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: Environment.Sandbox,
});

export async function POST(req) {
  try {
    const { nonce, amount, email, packageName } = await req.json();

    if (!nonce || !amount || !email || !packageName) {
      return Response.json({ success: false, message: 'Missing data' }, { status: 400 });
    }

    const paymentsApi = client.paymentsApi;

    const paymentRes = await paymentsApi.createPayment({
      sourceId: nonce,
      idempotencyKey: Date.now().toString(),
      amountMoney: {
        amount: amount * 100,
        currency: 'USD',
      },
    });

    const paymentId = paymentRes.result.payment.id;

    // Save to DB
    await connectDB();
    await Transaction.create({ email, amount, packageName, paymentId });

    // Send Email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER, // your gmail
        pass: process.env.MAIL_PASS, // app password
      },
    });

    await transporter.sendMail({
      from: `"Crossover Report" <${process.env.MAIL_USER}>`,
      to: email,
      subject: 'Payment Confirmation',
      html: `
        <h3>Payment Successful</h3>
        <p>Thank you for purchasing <strong>${packageName}</strong>.</p>
        <p>Amount: $${amount}</p>
        <p>Transaction ID: ${paymentId}</p>
      `,
    });

    return Response.json({ success: true });

  } catch (error) {
    console.error('Payment error:', error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}
