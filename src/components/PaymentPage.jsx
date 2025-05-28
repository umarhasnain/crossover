'use client'
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from './Footer';

const PaymentPage = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);

  const packages = [
    {
      id: 1,
      name: 'Starter Pass',
      price: 2500,
      features: [
        'Access to Weekly Tournaments',
        'Basic Profile & Ranking',
        'Email Support',
      ],
    },
    {
      id: 2,
      name: 'Pro Pass',
      price: 5000,
      features: [
        'All Starter features',
        'Daily Matchmaking',
        'Premium Badge',
        'Priority Support',
      ],
    },
    {
      id: 3,
      name: 'Elite Pass',
      price: 7500,
      features: [
        'All Pro features',
        'Invite-only Tournaments',
        'Verified Player Tag',
        '1-on-1 Coaching Session (Monthly)',
      ],
    },
  ];

  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg);
  };

  return (
   <div>
     <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="py-10 px-4">
        <h2 className="text-2xl font-bold text-center mb-6 text-[#471300]">
          Choose Your Package
        </h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-10">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-md border-2 p-6 shadow-md transition cursor-pointer ${
                selectedPackage?.id === pkg.id
                  ? 'border-[#e64400] bg-orange-50'
                  : 'border-gray-300 bg-white'
              }`}
              onClick={() => handlePackageSelect(pkg)}
            >
              <h3 className="text-xl font-bold text-[#471300] mb-2">{pkg.name}</h3>
              <p className="text-lg font-semibold mb-4">PKR {pkg.price}</p>
              <ul className="text-sm space-y-1 text-gray-700">
                {pkg.features.map((feat, idx) => (
                  <li key={idx}>• {feat}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {selectedPackage && (
          <div className="flex justify-center items-center">
            <div className="bg-white shadow-md rounded-md p-8 w-full max-w-md">
              <div className="flex justify-center mb-6">
                <img
                  src="/assets/images/logo.png"
                  alt="Crossover Logo"
                  className="h-24 w-24 object-contain border border-black"
                />
              </div>

              <h2 className="text-xl font-bold text-center text-gray-800 mb-6">
                Complete Payment for <span className="text-[#e64400]">{selectedPackage.name}</span>
              </h2>

              <form className="space-y-4">
                <Input placeholder="Name" />
                <Input type="email" placeholder="Email" />
                <Input type="number" placeholder="Amount" value={selectedPackage.price} readOnly />

                <div className="border rounded-md p-4 space-y-2">
                  <div className="flex items-center space-x-3">
                    <img
                      src="https://img.icons8.com/color/48/mastercard-logo.png"
                      alt="Card"
                      className="h-6"
                    />
                    <span className="text-sm font-medium text-gray-700">5333 3615 0149 5934</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm text-gray-700">
                    <span>03/27</span>
                    <span>275</span>
                    <span>23111</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#e64400] text-white font-semibold py-2 rounded-md hover:bg-[#c93b00] transition"
                >
                  Pay Now
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

    </div>
          <Footer/>
   </div>
  );
};

const Input = ({ type = 'text', placeholder, value, readOnly }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    readOnly={readOnly}
    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
  />
);

export default PaymentPage;
