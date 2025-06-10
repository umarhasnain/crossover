// 'use client';

import SquarePaymentForm from "@/components/SquarePaymentForm";

// import SquareForm from '@/components/SquareForm';
// import Script from 'next/script';

// export default function CheckoutPage() {
//   return (
//     <>
//       <Script
//         src="https://sandbox.web.squarecdn.com/v1/square.js"
//         strategy="beforeInteractive"
//         onError={(e) => {
//           console.error('❌ Square SDK failed to load', e);
//         }}
//       />
//       <SquareForm />
//     </>
//   );
// }


// pages/index.jsx


export default function Home() {
  return (
    <main>
      <h1 className="text-2xl font-bold text-center my-8">Square Payment Integration</h1>
      <SquarePaymentForm />
    </main>
  );
}
