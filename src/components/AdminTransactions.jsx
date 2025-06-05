'use client';
import React, { useEffect, useState } from 'react';

const AdminTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch('/api/transactions');
        const data = await res.json();
        setTransactions(data);
      } catch (err) {
        console.error('Failed to load transactions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold text-center mb-8 text-[#471300]">All Transactions</h1>
      {loading ? (
        <p className="text-center text-lg">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-md">
            <thead className="bg-orange-200">
              <tr>
                <th className="py-2 px-4 text-left">Email</th>
                <th className="py-2 px-4 text-left">Package</th>
                <th className="py-2 px-4 text-left">Amount</th>
                <th className="py-2 px-4 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn) => (
                <tr key={txn.id} className="border-t">
                  <td className="py-2 px-4">{txn.email}</td>
                  <td className="py-2 px-4">{txn.packageName}</td>
                  <td className="py-2 px-4">${txn.amount / 100}</td>
                  <td className="py-2 px-4">{new Date(txn.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminTransactions;
