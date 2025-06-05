'use client';

import { useEffect, useRef, useState } from 'react';

export default function SquareForm() {
  const paymentsRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [sdkReady, setSdkReady] = useState(false);

  useEffect(() => {
    if (window.Square) {
      initializeSquare();
    } else {
      const interval = setInterval(() => {
        if (window.Square) {
          clearInterval(interval);
          initializeSquare();
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, []);

  const initializeSquare = async () => {
    try {
      const payments = window.Square.payments(
        process.env.NEXT_PUBLIC_SQUARE_APP_ID,
        process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID
      );

      const card = await payments.card();
      await card.attach('#card-container');

      paymentsRef.current = { payments, card };
      setSdkReady(true);
    } catch (error) {
      console.error('Square Initialization Error:', error);
    }
  };

  const handlePayment = async () => {
    setLoading(true);

    try {
      const { card } = paymentsRef.current;
      const result = await card.tokenize();

      if (result.status === 'OK') {
        const res = await fetch('/api/payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sourceId: result.token,
            amount: 1000, // $10.00
            currency: 'USD',
          }),
        });

        const data = await res.json();

        if (data.success) {
          alert('✅ Payment successful!');
        } else {
          alert('❌ Payment failed: ' + (data.error || 'Unknown error'));
        }
      } else {
        alert('❌ Tokenization failed. Please check your card details.');
      }
    } catch (error) {
      console.error('Handle Payment Error:', error);
      alert('❌ Unexpected error occurred while processing payment.');
    }

    setLoading(false);
  };

  return (
    <div className="bg-white p-6 rounded shadow-md w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Pay with Card</h2>
      <div id="card-container" className="mb-4"></div>
      <button
        onClick={handlePayment}
        disabled={loading || !sdkReady}
        className={`bg-blue-600 text-white px-4 py-2 rounded w-full ${
          loading || !sdkReady ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </div>
  );
}
