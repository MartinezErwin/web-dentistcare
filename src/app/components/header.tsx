"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationLinks, contactLink } from "../../links.js";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Función para verificar si el link está activo
  const isLinkActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="relative">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center">
              <span className="text-orange-500 font-bold text-lg">🦷</span>
            </div>
            <span className="text-xl font-bold font-domine">DentistCare</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navigationLinks.map((link) => {
              const isActive = isLinkActive(link.href);
              return (
                <Link
                  key={link.id}
                  href={link.href}
                  className={`px-3 py-2 xl:px-4 xl:py-2 rounded-lg transition-all duration-200 text-sm xl:text-base ${
                    isActive
                      ? "bg-pink-400 text-white font-semibold"
                      : "text-gray-700 hover:bg-pink-100 hover:text-pink-600"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden lg:block">
            <Link
              href={contactLink.href}
              className="bg-pink-400 hover:bg-pink-500 text-white px-4 py-2 xl:px-6 xl:py-2 rounded-full font-semibold transition-colors duration-200 shadow-lg text-sm xl:text-base"
            >
              {contactLink.label}
            </Link>
          </div>

          {/* Mobile & Tablet Hamburger Button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-pink-500 transition-colors duration-200 relative z-50"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span
                  className={`block w-6 h-0.5 bg-current transform transition-all duration-300 ${
                    isMenuOpen ? "rotate-45 translate-y-1.5" : "-translate-y-1"
                  }`}
                ></span>
                <span
                  className={`block w-6 h-0.5 bg-current transition-all duration-300 ${
                    isMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                ></span>
                <span
                  className={`block w-6 h-0.5 bg-current transform transition-all duration-300 ${
                    isMenuOpen ? "-rotate-45 -translate-y-1.5" : "translate-y-1"
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile & Tablet Menu */}
        <div
          className={`lg:hidden absolute left-0 right-0 top-full bg-white shadow-2xl border-t transition-all duration-300 ease-in-out z-40 ${
            isMenuOpen
              ? "opacity-100 transform translate-y-0 visible"
              : "opacity-0 transform -translate-y-4 invisible"
          }`}
        >
          <div className="container mx-auto px-4 py-6">
            {/* Mobile & Tablet Navigation Links */}
            <nav className="space-y-4">
              {navigationLinks.map((link, index) => {
                const isActive = isLinkActive(link.href);
                return (
                  <Link
                    key={link.id}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-4 py-3 rounded-lg text-center transition-all duration-300 transform hover:scale-105 ${
                      isActive
                        ? "bg-gradient-to-r from-pink-400 to-purple-500 text-white font-semibold shadow-lg"
                        : "text-gray-700 hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 hover:text-pink-600 border border-gray-100"
                    }`}
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animation: isMenuOpen
                        ? `slideInFromTop 0.4s ease-out forwards`
                        : "none",
                    }}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile & Tablet CTA Button */}
            <div className="pt-6 border-t border-gray-100 mt-6">
              <Link
                href={contactLink.href}
                onClick={() => setIsMenuOpen(false)}
                className="block bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white px-6 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-center"
                style={{
                  animationDelay: `${navigationLinks.length * 100 + 100}ms`,
                  animation: isMenuOpen
                    ? `slideInFromTop 0.4s ease-out forwards`
                    : "none",
                }}
              >
                {contactLink.label}
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile & Tablet Menu Backdrop */}
        {isMenuOpen && (
          <div
            className="lg:hidden fixed inset-0  bg-opacity-25 z-30"
            onClick={() => setIsMenuOpen(false)}
          ></div>
        )}
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes slideInFromTop {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </header>
  );
}
