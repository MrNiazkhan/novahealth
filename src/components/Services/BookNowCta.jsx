"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BookNowCta = () => {
  const [isBooking, setIsBooking] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  // Simulate booking process
  const handleBookNowClick = () => {
    if (isBooking) return;
    setIsBooking(true);

    // Fake async booking API call
    setTimeout(() => {
      setIsBooking(false);
      setIsBooked(true);
    }, 2500);
  };

  return (
    <section
      aria-labelledby="book-now-cta-heading"
      className="relative bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 text-white py-16 px-6 sm:px-12 md:px-20 rounded-3xl max-w-7xl mx-auto shadow-2xl overflow-hidden"
      style={{ fontFeatureSettings: "'liga' 1" }}
    >
      {/* Background subtle animated shape for premium look */}
      <motion.div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[120vw] h-[120vh] bg-gradient-to-tr from-blue-900 via-blue-700 to-blue-800 opacity-20 rounded-full blur-3xl pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 120, ease: "linear" }}
      />

      <div className="relative max-w-4xl mx-auto text-center space-y-6">
        <motion.h2
          id="book-now-cta-heading"
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight drop-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Ready to Take the Next Step?
        </motion.h2>

        <motion.p
          className="max-w-3xl mx-auto text-lg sm:text-xl font-light leading-relaxed opacity-90 drop-shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
        >
          Book your appointment today and experience exceptional care tailored just for you.
        </motion.p>

        <motion.div
          className="mt-12 flex flex-col sm:flex-row justify-center gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
        >
          {/* Book Now Button */}
          <button
            type="button"
            onClick={handleBookNowClick}
            disabled={isBooking || isBooked}
            aria-live="polite"
            aria-busy={isBooking}
            className={`relative inline-flex items-center justify-center bg-white text-blue-800 font-semibold px-10 py-4 rounded-xl shadow-lg transition-transform transform
              focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 focus-visible:ring-opacity-80
              hover:scale-105 active:scale-95
              disabled:bg-gray-300 disabled:text-gray-600 disabled:cursor-not-allowed`}
          >
            {isBooking && (
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
            )}
            {isBooked ? "Booked!" : isBooking ? "Booking..." : "Book Now"}
          </button>

          {/* Learn More Link */}
          <a
            href="/learn-more"
            className="inline-flex items-center justify-center text-white font-medium underline underline-offset-4 hover:text-blue-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-80 rounded-md px-4 py-4"
          >
            Learn More
          </a>
        </motion.div>

        {/* Small disclaimer / note */}
        <motion.p
          className="mt-6 max-w-md mx-auto text-sm text-blue-200 opacity-80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          * Your privacy and security are our top priorities. We’ll never share your information.
        </motion.p>
      </div>
    </section>
  );
};

export default BookNowCta;
