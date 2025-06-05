// app/checkout/page.jsx or wherever you're using SquareForm
'use client';

import SquareForm from '@/components/SquareForm';
import Script from 'next/script';

export default function CheckoutPage() {
  return (
    <>
      <Script
        src="https://sandbox.web.squarecdn.com/v1/square.js"
        strategy="beforeInteractive"
        onError={(e) => {
          console.error('❌ Square SDK failed to load', e);
        }}
      />
      <SquareForm />
    </>
  );
}
