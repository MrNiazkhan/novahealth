"use client";

import React from "react";

const AppointmentsEmptyState = () => {
  return (
    <section className="flex flex-col items-center justify-center  px-6 py-20 bg-white rounded-lg shadow-md max-w-3xl mx-auto text-center my-10">
      {/* Illustration (simple SVG) */}
      <svg
        className="w-32 h-32 mb-8 text-blue-600 mx-auto"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 64 64"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="32" cy="32" r="30" strokeOpacity="0.2" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20 32h24M32 20v24M20 20l24 24"
        />
      </svg>

      {/* Heading */}
      <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
        No Appointments Yet
      </h2>

      {/* Subtext */}
      <p className="text-gray-600 text-base sm:text-lg max-w-md mb-8">
        You haven't booked any appointments yet. Start by scheduling your first consultation with our certified doctors.
      </p>

      {/* Call to action button */}
      <button
        type="button"
        className="px-8 py-3 bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:bg-blue-800 transition focus:outline-none focus:ring-4 focus:ring-blue-300"
        onClick={() => {
          // Replace with your actual booking logic/navigation
          alert("Redirecting to booking page...");
        }}
      >
        Book Appointment
      </button>
    </section>
  );
};

export default AppointmentsEmptyState;
