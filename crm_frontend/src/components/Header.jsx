import React, { useState } from "react";
import {
  FiMenu,
  FiX,
  FiHome,
  FiUser,
  FiMessageSquare,
  FiPackage,
  FiStar,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { name: "Contact Details", icon: FiUser, href: "/" },
    { name: "Short Enquiry", icon: FiMessageSquare, href: "/shortEnquiry" },
    { name: "Long Enquiry", icon: FiMessageSquare, href: "/longEnquiry" },
    { name: "Dream Packages", icon: FiStar, href: "/dream" },
  ];

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-50 shadow-lg border-b border-gray-200 backdrop-blur-sm bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo Section */}
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <FiHome className="h-8 w-8 text-blue-600 mr-3" />
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Ghar Se Farrar CRM
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="group relative px-4 py-2 rounded-lg transition-all duration-200 hover:bg-blue-50"
                  >
                    <div className="flex items-center space-x-2">
                      <Icon className="h-4 w-4 text-gray-600 group-hover:text-blue-600 transition-colors" />
                      <span className="text-gray-700 font-medium group-hover:text-blue-600 transition-colors">
                        {item.name}
                      </span>
                    </div>
                    {/* Hover underline effect */}
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-200"></div>
                  </Link>
                );
              })}
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <FiX className="block h-6 w-6" />
                ) : (
                  <FiMenu className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 pt-2 pb-4 space-y-1 bg-white border-t border-gray-200">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 group"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon className="mr-3 h-5 w-5 text-gray-500 group-hover:text-blue-600 transition-colors" />
                  <span className="font-medium">{item.name}</span>

                  {/* Optional: Add a subtle background color change on hover */}
                  <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </header>

      {/* Backdrop for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 backdrop-blur-sm bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Header;
