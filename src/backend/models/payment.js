// import mongoose from 'mongoose';

// const PaymentSchema = new mongoose.Schema({
//   amount: Number,
//   status: String,
//   date: { type: Date, default: Date.now },
// });

// export default mongoose.models.Payment || mongoose.model('Payment', PaymentSchema);


// src/models/payment.js
import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({
  paymentId: String,
  status: String,
  amount: Number,
  email: String,
}, { timestamps: true });

const Payment = mongoose.models.Payment || mongoose.model('Payment', PaymentSchema);

export default Payment;
