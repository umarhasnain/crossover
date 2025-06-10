'use client';
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from './Footer';
import SquarePaymentForm from './SquarePaymentForm';

const PaymentPage = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

const packages = [
  {
    id: 1,
    name: 'Platinum Package',
    price: 3500,
    features: [
      'Evaluations for players in grades 8–12',
      '4 quarterly reports catered to your needs',
      'Unlimited access to evaluators',
      'Access to @co_bballreport social media page updated around the clock with rising prospect content',
    ],
  },
  {
    id: 2,
    name: 'Gold Package',
    price: 2500,
    features: [
      'Evaluations for players in grades 10–12',
      '4 quarterly reports catered to your needs',
      'Unlimited access to evaluators',
      'Access to @co_bballreport social media page updated around the clock with rising prospect content',
    ],
  },
  {
    id: 3,
    name: 'Silver Package',
    price: 1500,
    features: [
      'Evaluations for 100 top rising prospects in grades 8–9',
      '4 quarterly reports catered to your needs',
      'Unlimited access to evaluators',
      'Access to @co_bballreport social media page updated around the clock with rising prospect content',
    ],
  },
];


  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg);
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      
      <div className="flex-grow py-10 px-4">
        <h2 className="text-2xl font-bold text-center mb-6 text-[#471300]">Choose Your Package</h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-10">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-md border-2 p-6 shadow-md transition cursor-pointer ${
                selectedPackage?.id === pkg.id ? 'border-[#e64400] bg-orange-50' : 'border-gray-300 bg-white'
              }`}
              onClick={() => handlePackageSelect(pkg)}
            >
              <h3 className="text-xl font-bold text-[#471300] mb-2">{pkg.name}</h3>
              <p className="text-lg font-semibold mb-4">${pkg.price}</p>
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
                <Input name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
                <Input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                <Input type="number" placeholder="Amount" value={selectedPackage.price} readOnly />

                <div className="border rounded-md p-4 space-y-2">
                  <SquarePaymentForm
                    amount={selectedPackage.price}
                    name={formData.name}
                    email={formData.email}
                    packageName={selectedPackage.name}
                  />
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

const Input = ({ name, type = 'text', placeholder, value, onChange, readOnly }) => (
  <input
    type={type}
    name={name}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    readOnly={readOnly}
    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
  />
);

export default PaymentPage;
