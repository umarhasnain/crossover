"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";

const InputField = ({ label, type = "text", value, onChange, name, showToggle = false }) => {
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
        className={`absolute left-4 transition-all duration-200 bg-white px-1 pointer-events-none text-gray-500 ${focused || value ? "text-xs -top-2" : "text-base top-3.5"
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

export default function SignupForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (form.password !== form.confirm) {
    alert("Passwords do not match!");
    return;
  }

  try {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        password: form.password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Signup failed.");
      return;
    }

    // Signup success, auto-login using NextAuth
    const signInResult = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
      
    });

    if (signInResult?.error) {
      alert("Login after signup failed: " + signInResult.error);
    } else {
      alert("✅ Account created and logged in!");
      window.location.href = "/payment"; // redirect to homepage or dashboard
    }
  } catch (error) {
    console.error("Signup error:", error);
    alert("Something went wrong. Try again.");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-700 via-black to-red-700 px-4">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <Image src="/assets/images/logo.png" alt="Logo" width={100} height={100} />
        </div>
        <h2 className="text-2xl font-bold text-red-600 mb-6">Create Account</h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <InputField label="Full Name *" value={form.name} onChange={handleChange} name="name" />
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
          <InputField
            label="Confirm Password *"
            type="password"
            value={form.confirm}
            onChange={handleChange}
            name="confirm"
            showToggle={true}
          />
          <button
            type="submit"
            className="w-full bg-red-600 text-white font-semibold py-2 rounded-md hover:bg-red-700 transition"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-red-600 font-semibold hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
