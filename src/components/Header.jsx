'use client';
import React, { useState, useRef, useEffect } from 'react';
import Sidebar from './Sidebar';
import { Menu } from 'lucide-react';
import Image from 'next/image';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
          <div className="hidden md:flex gap-6 font-medium text-sm mx-auto">
            <a href="#" className="hover:underline">Dashboard</a>
            <a href="#" className="hover:underline">Players</a>
            <a href="#" className="hover:underline">About</a>
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
                <a
                  href="/profile"
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Profile
                </a>
                <a
                  href="/logout"
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Logout
                </a>
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
