
'use client';

import { PaymentForm, CreditCard } from 'react-square-web-payments-sdk';
import { useCallback, useState } from 'react';

export default function SquarePaymentForm({ amount, name, email, packageName }) {
  const [loading, setLoading] = useState(false);

  const handlePayment = useCallback(async (tokenResult) => {
    if (tokenResult.errors) {
      console.error('❌ Square Tokenization Error:', tokenResult.errors);
      alert('Card validation failed. Please check your input.');
      return;
    }

    const token = tokenResult.token;
    if (!token) {
      alert('❌ Token not received from Square.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sourceId: token,
          amount,
          name,
          email,
          packageName,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("❌ Server error response:", errorText);
        alert('Server error occurred during payment. Please try again.');
        return;
      }

      const data = await res.json();
      console.log('✅ Payment successful:', data);
      alert('✅ Payment successful! Thank you.');
    } catch (err) {
      console.error('❌ Unexpected fetch error:', err);
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
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

      {loading && <p className="text-blue-500 mt-4">Processing payment...</p>}
    </div>
  );
}
