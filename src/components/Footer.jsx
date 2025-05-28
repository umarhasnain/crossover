import React from 'react';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-[#3c0d00] text-white px-4 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 items-start">
        {/* Logo and Tagline */}
        <div className="flex flex-col items-center md:items-start">
          <Image
          height={100}
          width={300}
            src="/assets/images/logo.png"
            alt="Crossover Logo"
            className="h-28 w-28 border border-white object-contain mb-2"
          />
          <p className="text-sm text-center md:text-left">
            Your trusted source for scouting information
          </p>
        </div>

        {/* Quick Links */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li><a href="/" className="hover:text-orange-400 transition">Home</a></li>
            <li><a href="/about" className="hover:text-orange-400 transition">About</a></li>
            <li><a href="/players" className="hover:text-orange-400 transition">Players</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
          <p className="text-sm">Email: <a href="mailto:info@cobballreport.com" className="hover:text-orange-400">info@cobballreport.com</a></p>
          <p className="text-sm">Phone: (919) 610-3935</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-8 border-t border-white/20 pt-4 text-center text-sm">
        2025 CrossOver Scouting Services
      </div>
    </footer>
  );
};

export default Footer;
