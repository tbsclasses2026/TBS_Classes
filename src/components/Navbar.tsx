"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, BookOpen, LogOut, LayoutDashboard, UserCircle, Home, FileText, FileQuestion, Code2, BrainCircuit, Map } from 'lucide-react';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { data: session } = useSession();

  const navLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Subjects', href: '/subjects', icon: BookOpen },
    { name: 'Notes', href: '/notes', icon: FileText },
    { name: 'PYQs', href: '/pyqs', icon: FileQuestion },
    { name: 'Practice', href: '/practice', icon: Code2 },
    { name: 'Quizzes', href: '/quizzes', icon: BrainCircuit },
    { name: 'Roadmaps', href: '/roadmaps', icon: Map },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-[100] relative">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/images/logo.png" alt="TBS Classes Logo" width={48} height={48} className="object-contain" />
              <span className="font-bold text-xl text-navy whitespace-nowrap">TBS Classes</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-5">
            <div className="flex space-x-1 lg:space-x-2 items-center">
              {navLinks.map(({ name, href, icon: Icon }) => (
                <Link
                  key={name}
                  href={href}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-navy-light hover:text-primary hover:bg-primary/5 transition-all text-sm font-bold"
                >
                  <Icon className="w-4 h-4" />
                  <span>{name}</span>
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
