'use client';

import { PaymentForm, CreditCard } from 'react-square-web-payments-sdk';
import { useCallback } from 'react';

export default function SquarePaymentForm({ amount, name, email, packageName }) {
  const handlePayment = useCallback(async (tokenResult) => {
    try {
      const token = tokenResult.token;
      if (!token) throw new Error("Token not received from Square.");

      const res = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sourceId: token,
          amount,
          name,
          email,
          packageName,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error('❌ Payment failed:', data);
        return;
      }

      console.log('✅ Payment successful:', data);
      alert('✅ Payment successful! Thank you.');
    } catch (err) {
      console.error('❌ Unexpected error:', err);
      alert('Payment failed. Please try again.');
    }
  }, [amount, name, email, packageName]);

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-4">Pay with Card</h2>
      <PaymentForm
        applicationId={process.env.NEXT_PUBLIC_SQUARE_APP_ID}
        locationId={process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID}
        cardTokenizeResponseReceived={handlePayment}
      >
        <CreditCard />
      </PaymentForm>
    </div>
  );
}
