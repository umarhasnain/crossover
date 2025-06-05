
import mongoose from 'mongoose';

let isConnected = false;

export async function connectDB() {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'payments',
    });

    isConnected = true;
    console.log('MongoDB connected!');
  } catch (error) {
    console.error('MongoDB error:', error);
  }
}
