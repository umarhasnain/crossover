import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema(
  {
    email: String,
    amount: Number,
    packageName: String,
    paymentId: String,
  },
  { timestamps: true }
);

export default mongoose.models.Transaction ||
  mongoose.model('Transaction', TransactionSchema);
