import React from 'react';
import { X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import InfoIcon from '@mui/icons-material/Info';

const Sidebar = ({ isOpen, onClose }) => {
    return (
        <div
            className={`fixed top-0 left-0 h-full w-64 bg-slate-50 text-black z-50 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
                } transition-transform duration-300 ease-in-out shadow-lg`}
        >
            <div className="flex justify-between items-center px-4 py-4 border-b border-white/20">
                {/* <h2 className="text-lg font-bold">Menu</h2> */}
                <Image src="/assets/images/logo.png" width={50} height={100} alt="Logo" className="h-12" />

                <button onClick={onClose}>
                    <X />
                </button>
            </div>
            <nav className="flex flex-col space-y-4 p-4 text-base ">
                <Link onClick={onClose} href="#" className='flex items-center gap-4'>
                    <DashboardIcon />
                    Dashboard
                </Link>
                <Link onClick={onClose} href="#" className='flex items-center gap-4'>
                    <PeopleIcon />
                    Players
                </Link>
                <Link onClick={onClose} href="#" className='flex items-center gap-4'>
                    <InfoIcon />
                    About
                </Link>
            </nav>
        </div>
    );
};

export default Sidebar;
