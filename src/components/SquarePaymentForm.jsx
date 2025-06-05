'use client';
// import { PaymentForm, CreditCard } from 'react-square-web-payments-sdk';

const SquarePaymentForm = ({ applicationId, locationId, amount, onPaymentSuccess }) => {
  const cardTokenizeResponseReceived = async (token) => {
    const res = await fetch('/api/process-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nonce: token.token,
        amount,
      }),
    });

    const data = await res.json();
    if (data.success) {
      onPaymentSuccess();
    } else {
      alert('Payment failed: ' + data.message);
    }
  };

  return (
    <PaymentForm
      applicationId={applicationId}
      locationId={locationId}
      cardTokenizeResponseReceived={cardTokenizeResponseReceived}
    >
      <CreditCard />
    </PaymentForm>
  );
};

export default SquarePaymentForm;
