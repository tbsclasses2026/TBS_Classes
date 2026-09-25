"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, BookOpen } from 'lucide-react';
import Image from 'next/image';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Subjects', href: '/subjects' },
    { name: 'Coding', href: '/coding' },
    { name: 'Notes', href: '/notes' },
    { name: 'Faculty', href: '/faculty' },
    { name: 'Resources', href: '/resources' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Warehouse', href: '/warehouse' },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/images/logo.png" alt="TBS Classes Logo" width={48} height={48} className="object-contain" />
              <span className="font-bold text-xl text-navy">TBS Classes</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-navy-light hover:text-primary transition-colors text-sm font-medium"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <button className="bg-primary text-navy font-semibold px-4 py-2 rounded-lg hover:bg-primary-hover transition-colors shadow-sm">
              Join Community
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-navy-light hover:text-navy focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg absolute w-full">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-navy-light hover:text-primary hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="px-3 py-2 mt-4">
              <button className="w-full bg-primary text-navy font-semibold px-4 py-2 rounded-lg hover:bg-primary-hover transition-colors shadow-sm">
                Join Community
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
