"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MENU_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Appointments", href: "/appointments" },
  { label: "Patient Info", href: "/patient-info" },
  { label: "Emergency", href: "/emergency" },
  { label: "Our Team", href: "/ourteam" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Blog", href: "/blog" },
  { label: "FAQs", href: "/faqs" },
];

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef(null);
  const pathname = usePathname() || "/";

  // Close drawer on Escape
  useEffect(() => {
    const onEsc = (e) => {
      if (e.key === "Escape") {
        setDrawerOpen(false);
        setMoreOpen(false);
      }
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  // Close "More" dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (moreRef.current && !moreRef.current.contains(e.target)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  // Split menu into main and "More"
  const mainItems = MENU_ITEMS.slice(0, 5);
  const moreItems = MENU_ITEMS.slice(5);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <nav
            className="flex items-center justify-between h-16"
            role="navigation"
            aria-label="Primary Navigation"
          >
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link
                href="/"
                className="text-2xl font-extrabold text-blue-700 select-none hover:text-blue-800 whitespace-nowrap"
                aria-label="NovaHealth Home"
                onClick={() => setDrawerOpen(false)}
              >
                NovaHealth
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-10 font-semibold text-gray-700 text-sm select-none">
              {mainItems.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className={`relative py-2 border-b-2 ${
                    isActive(href)
                      ? "border-blue-700 text-blue-700"
                      : "border-transparent hover:border-blue-700 hover:text-blue-700"
                  } transition-colors duration-300 focus:outline-none focus:border-blue-700`}
                  onClick={() => setDrawerOpen(false)}
                >
                  {label}
                </Link>
              ))}

              {/* More Dropdown */}
              <div className="relative" ref={moreRef}>
                <button
                  onClick={() => setMoreOpen((o) => !o)}
                  className={`flex items-center gap-1 text-gray-700 border-b-2 border-transparent hover:border-blue-700 hover:text-blue-700 focus:outline-none focus:border-blue-700 transition-colors duration-300 py-2 px-0 text-sm leading-tight ${
                    moreOpen ? "text-blue-700 border-blue-700" : ""
                  }`}
                  aria-haspopup="true"
                  aria-expanded={moreOpen}
                  type="button"
                >
                  <span className="leading-none select-none cursor-pointer">More</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 ${
                      moreOpen ? "rotate-180" : "rotate-0"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {moreOpen && (
                  <ul className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                    {moreItems.map(({ label, href }) => (
                      <li key={label}>
                        <Link
                          href={href}
                          className={`block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-300 ${
                            isActive(href) ? "font-semibold bg-blue-50 text-blue-700" : ""
                          }`}
                          onClick={() => {
                            setMoreOpen(false);
                            setDrawerOpen(false);
                          }}
                        >
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Patient Login CTA */}
              <Link
                href="/dashboard"
                className="ml-6 px-5 py-2 rounded-md bg-blue-700 text-white font-semibold hover:bg-blue-800 transition-colors duration-300 whitespace-nowrap"
                onClick={() => setDrawerOpen(false)}
              >
                Patient Login
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              aria-label={drawerOpen ? "Close menu" : "Open menu"}
              aria-expanded={drawerOpen}
              aria-controls="mobile-menu"
              className="md:hidden p-2 rounded-md text-blue-700 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              onClick={() => setDrawerOpen((o) => !o)}
              type="button"
            >
              {drawerOpen ? (
                <svg
                  className="w-7 h-7"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  className="w-7 h-7"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </nav>
        </div>
      </header>

      {/* Overlay for mobile drawer */}
      <div
        aria-hidden="true"
        className={`fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          drawerOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
        onClick={() => setDrawerOpen(false)}
      />

      {/* Mobile Drawer */}
      <aside
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        className={`fixed top-0 right-0 h-full w-72 max-w-full bg-white/95 backdrop-blur-md shadow-xl z-50 transform transition-transform duration-300 ease-out
        ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <nav className="flex flex-col h-full px-6 py-8 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
          {/* Drawer Header */}
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/"
              className="text-2xl font-extrabold text-blue-700 select-none hover:text-blue-800 whitespace-nowrap"
              onClick={() => setDrawerOpen(false)}
              aria-label="NovaHealth Home"
            >
              NovaHealth
            </Link>
            <button
              aria-label="Close menu"
              onClick={() => setDrawerOpen(false)}
              className="text-gray-600 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-2 transition-transform duration-300 hover:scale-110 active:scale-95"
              type="button"
            >
              <svg
                className="w-7 h-7"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Menu Links */}
          <ul className="flex flex-col space-y-6 font-semibold text-gray-900 text-lg select-none">
            {MENU_ITEMS.map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  className={`block px-6 py-4 rounded-lg border-l-4 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    isActive(href)
                      ? "border-blue-700 bg-blue-50 text-blue-700 shadow-lg"
                      : "border-transparent hover:border-blue-700 hover:bg-blue-50 hover:text-blue-700"
                  }`}
                  onClick={() => setDrawerOpen(false)}
                  tabIndex={0}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <div className="mt-auto px-6 pt-10 pb-6">
            <Link
              href="/dashboard"
              className="block w-full text-center bg-blue-700 text-white font-semibold rounded-md py-3 shadow-md hover:bg-blue-800 transition-colors duration-300"
              onClick={() => setDrawerOpen(false)}
              tabIndex={0}
              aria-label="Patient Login"
            >
              Patient Login
            </Link>
          </div>

          {/* Footer */}
          <footer className="text-center text-sm text-gray-500 select-none border-t border-gray-300 py-3">
            &copy; {new Date().getFullYear()} NovaHealth. All rights reserved.
          </footer>
        </nav>
      </aside>
    </>
  );
};

export default Navbar;
