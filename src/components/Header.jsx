'use client';
import React, { useState, useRef, useEffect } from 'react';
import Sidebar from './Sidebar';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useUser } from '@/context/UserContext';  // Import your UserContext

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  // Get user state from context
  const { isAuthenticated, isPaid } = useUser();

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout', { method: 'POST' });
      const data = await res.json();
      if (res.ok) {
       toast.success("Logout Successful!")
        // alert(data.message);
        window.location.href = '/sign-in';
      } else {
       toast.success(data.error)
      }
    } catch (error) {
      alert('Something went wrong during logout');
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Function to prevent navigation when unpaid
  const handleClick = (e) => {
    if (!isPaid) {
      e.preventDefault();
      alert('Please complete the payment to access this page.');
    }
  };

  return (
    <>
      <nav className="bg-[#471300] px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 py-3 text-white w-full shadow-md relative">
        <div className="flex items-center justify-between w-full relative">
          {/* Left: Burger Icon (small devices only) */}
          <div className="flex items-center md:hidden z-10">
            <button onClick={() => setIsOpen(true)}>
              <Menu size={28} />
            </button>
          </div>

          {/* Center: Logo */}
          <div className="absolute md:static left-1/2 md:left-0 transform -translate-x-1/2 md:transform-none z-0">
            <Image
              src="/assets/images/logo.png"
              alt="Logo"
              width={50}
              height={50}
              className="h-14 w-auto object-contain"
            />
          </div>

          {/* Center Nav Links: Only md+ */}
          <div className="hidden md:flex gap-6 font-medium text-md mx-auto">
            {/* Dashboard */}
            <Link
              href={isPaid ? "/dashboard" : "#"}
              className={`hover:underline cursor-pointer ${!isPaid ? 'opacity-50 pointer-events-none' : ''}`}
              onClick={handleClick}
            >
              Dashboard
            </Link>

            {/* Players */}
            <Link
              href={isPaid ? "/players" : "#"}
              className={`hover:underline cursor-pointer ${!isPaid ? 'opacity-50 pointer-events-none' : ''}`}
              onClick={handleClick}
            >
              Players
            </Link>

            {/* About (always accessible) */}
            <Link href="/about" className="hover:underline cursor-pointer">
              About
            </Link>
          </div>

          {/* Right: Avatar with Dropdown */}
          <div className="relative z-10" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="h-9 w-9 rounded-full bg-white text-[#471300] flex items-center justify-center font-bold text-sm"
            >
              U
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-white text-[#471300] rounded shadow-md overflow-hidden">
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setDropdownOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  type="button"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Sidebar for small screens */}
      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default Header;
