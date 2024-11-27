'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-xl font-bold text-blue-600">
              SchoolApp
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            <Link
              href="/"
              className="inline-flex items-center px-1 pt-1 border-b-2 border-blue-500 text-sm font-medium text-gray-900"
            >
              Accueil
            </Link>
            <Link
              href="/tarifs"
              className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
            >
              Nos tarifs
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
            >
              Contact
            </Link>
            <Link
              href="/auth/login"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 ml-3"
            >
              Connexion
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed */}
              <svg
                className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Icon when menu is open */}
              <svg
                className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`${isMobileMenuOpen ? 'block' : 'hidden'} sm:hidden`}
        id="mobile-menu"
      >
        <div className="pt-2 pb-3 space-y-1">
          <Link
            href="/"
            className="bg-blue-50 border-blue-500 text-blue-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
          >
            Accueil
          </Link>
          <Link
            href="/tarifs"
            className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
          >
            Nos tarifs
          </Link>
          <Link
            href="/contact"
            className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
          >
            Contact
          </Link>
          <Link
            href="/auth/login"
            className="block w-full px-4 py-2 text-center text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
          >
            Connexion
          </Link>
        </div>
      </div>
    </nav>
  );
}
