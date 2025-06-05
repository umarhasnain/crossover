'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const InputField = ({ label, type = 'text', value, onChange, name, showToggle = false }) => {
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const inputType = showToggle ? (visible ? 'text' : 'password') : type;

  return (
    <div className="relative w-full">
      <input
        type={inputType}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={(e) => !e.target.value && setFocused(false)}
        placeholder=" "
        className="peer w-full text-black px-4 pt-5 pb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 placeholder-transparent"
        required
      />
      <label
        className={`absolute left-4 transition-all duration-200 bg-white px-1 pointer-events-none text-gray-500 ${
          focused || value ? 'text-xs -top-2' : 'text-base top-3.5'
        }`}
      >
        {label}
      </label>
      {showToggle && (
        <button
          type="button"
          onClick={() => setVisible((prev) => !prev)}
          className="absolute right-4 top-3.5 text-gray-600 text-lg focus:outline-none"
        >
          {visible ? '🙈' : '👁️'}
        </button>
      )}
    </div>
  );
};

export default function SigninForm() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMessage('');

  try {
    const res = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.error || 'Something went wrong');
    } else {
      toast.success('Sign in successful!');

      // ✅ Redirect based on email
      if (form.email === "crossoveradmin01@gmail.com") {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
    }
  } catch (error) {
    console.error('Sign-in error:', error);
    toast.error('Something went wrong');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-black via-red-700 to-black px-4">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <Image src="/assets/images/logo.png" alt="Logo" width={100} height={100} />
        </div>
        <h2 className="text-2xl font-bold text-red-600 mb-6">Welcome Back</h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <InputField
            label="Email *"
            type="email"
            value={form.email}
            onChange={handleChange}
            name="email"
          />
          <InputField
            label="Password *"
            type="password"
            value={form.password}
            onChange={handleChange}
            name="password"
            showToggle={true}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white font-semibold py-2 rounded-md hover:bg-red-700 transition"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        {message && <p className="mt-4 text-sm text-red-600">{message}</p>}

        <p className="mt-4 text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <Link href="/sign-up" className="text-red-600 font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
