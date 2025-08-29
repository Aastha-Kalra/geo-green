import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm"><img src="/v2.png" className="rounded-full" /></span>
            </div>
            <span className="text-xl font-bold text-green-800 roboto">Geo Green</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className=" roboto  text-gray-600 hover:text-green-600 px-3 py-2 rounded-md text-md font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              to="/products"
              className=" roboto  text-gray-600 hover:text-green-600 px-3 py-2 rounded-md text-md font-medium transition-colors"
            >
              Products
            </Link>
            <Link
              to="/about"
              className=" roboto  text-gray-600 hover:text-green-600 px-3 py-2 rounded-md text-md font-medium transition-colors"
            >
              About
            </Link>
            <Link
              to="/contact"
              className=" roboto  text-gray-600 hover:text-green-600 px-3 py-2 rounded-md text-md font-medium transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Admin Link */}
          {/* <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/admin"
              className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
            >
              Admin
            </Link>
          </div> */}

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-green-600 focus:outline-none focus:text-green-600"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <Link
                to="/"
                className="text-gray-600 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-gray-600 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                to="/about"
                className="text-gray-600 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-gray-600 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              {/* <Link
                to="/admin"
                className="bg-green-600 text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin
              </Link> */}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
