"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Reusable input field with floating label and password toggle
const InputField = ({
  label,
  type = "text",
  value,
  onChange,
  name,
  showToggle = false,
}) => {
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const inputType = showToggle ? (visible ? "text" : "password") : type;

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
        className="peer w-full text-black focus:text-black px-4 pt-5 pb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 placeholder-transparent"
        required
      />
      <label
        className={`absolute left-4 transition-all duration-200 bg-white px-1 pointer-events-none text-gray-500 ${
          focused || value ? "text-xs -top-2" : "text-base top-3.5"
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
          {visible ? "🙈" : "👁️"}
        </button>
      )}
    </div>
  );
};

export default function LoginForm() {
  const [form, setForm] = useState({
  
    email: "",
    password: "",

  });

  console.log("formData====>",form)
  
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-700 via-black to-red-700 px-4">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <Image
            src="/assets/images/logo.png"
            alt="Logo"
            width={100}
            height={100}
          />
        </div>
        <h2 className="text-2xl font-bold text-red-600 mb-6">Create Account</h2>
        <form className="space-y-5">
         
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
            className="w-full bg-red-600 text-white font-semibold py-2 rounded-md hover:bg-red-700 transition"
          >
            Sign In
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-600">
          Don't have an account?{" "}
          <Link href="/register" className="text-red-600 font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
