"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, BookOpen, LogOut, LayoutDashboard, UserCircle } from 'lucide-react';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import SearchBar from '@/components/SearchBar';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { data: session } = useSession();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Subjects', href: '/subjects' },
    { name: 'Notes', href: '/notes' },
    { name: 'PYQs', href: '/pyqs' },
    { name: 'Practice', href: '/practice' },
    { name: 'Quizzes', href: '/quizzes' },
    { name: 'Roadmaps', href: '/roadmaps' },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-[100] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/images/logo.png" alt="TBS Classes Logo" width={48} height={48} className="object-contain" />
              <span className="font-bold text-xl text-navy whitespace-nowrap">TBS Classes</span>
            </Link>
            
            {/* Search Bar (Hidden on Mobile) */}
            <div className="hidden lg:block w-64 xl:w-80">
              <SearchBar />
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-5">
            <div className="flex space-x-3 lg:space-x-4 items-center">
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

            {session ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors"
                >
                  {session.user?.image ? (
                    <img src={session.user.image} alt="Profile" className="w-8 h-8 rounded-full" />
                  ) : (
                    <UserCircle className="w-8 h-8 text-primary" />
                  )}
                  <span className="text-sm font-semibold text-navy hidden lg:block">
                    {session.user?.name?.split(' ')[0]}
                  </span>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 border border-gray-100">
                    <Link
                      href="/dashboard"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary"
                      onClick={() => setProfileOpen(false)}
                    >
                      <LayoutDashboard className="w-4 h-4 mr-2" />
                      Dashboard
                    </Link>
                    <button
                      onClick={() => signOut({ callbackUrl: '/' })}
                      className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login">
                <button className="bg-primary text-navy font-semibold px-4 py-2 rounded-lg hover:bg-primary-hover transition-colors shadow-sm">
                  Join Community
                </button>
              </Link>
            )}
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
            {session ? (
              <>
                <Link
                  href="/dashboard"
                  className="block px-3 py-2 rounded-md text-base font-medium text-navy-light hover:text-primary hover:bg-gray-50"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <div className="px-3 py-2 mt-4">
                  <button 
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="w-full bg-red-100 text-red-700 font-semibold px-4 py-2 rounded-lg hover:bg-red-200 transition-colors shadow-sm"
                  >
                    Sign out
                  </button>
                </div>
              </>
            ) : (
              <div className="px-3 py-2 mt-4">
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <button className="w-full bg-primary text-navy font-semibold px-4 py-2 rounded-lg hover:bg-primary-hover transition-colors shadow-sm">
                    Join Community
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
