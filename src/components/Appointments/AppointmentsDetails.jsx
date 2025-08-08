"use client";

import React, { useState, useEffect, useRef } from "react";

const exampleAppointment = {
  patient: "John Doe",
  type: "Consultation",
  datetime: new Date("2025-08-10T09:30"),
  status: "Confirmed",
  notes: "Patient has a history of hypertension.\nDiscuss medication adjustments.",
};

const statusColors = {
  Confirmed: "bg-green-100 text-green-800",
  Pending: "bg-yellow-100 text-yellow-800",
  Cancelled: "bg-red-100 text-red-800",
};

export default function AppointmentDetailsPanel() {
  const [showDetails, setShowDetails] = useState(false);
  const detailsRef = useRef(null);

  // Focus the details container when it appears
  useEffect(() => {
    if (showDetails && detailsRef.current) {
      detailsRef.current.focus();
    }
  }, [showDetails]);

  return (
    <main className=" my-10 bg-gray-50 flex items-center justify-center p-6">
      {!showDetails ? (
        <button
          onClick={() => setShowDetails(true)}
          className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-400 transition-shadow shadow-lg"
          aria-label="Show appointment details"
        >
          Show Appointment Details
        </button>
      ) : (
        <section
          aria-label="Appointment Details"
          role="dialog"
          tabIndex={-1}
          ref={detailsRef}
          className="max-w-xl mx-auto bg-white shadow-2xl rounded-3xl p-10 select-none outline-none focus:ring-4 focus:ring-indigo-300"
        >
          {/* Header */}
          <header className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900 leading-tight">
              Appointment Details
            </h2>
            <button
              onClick={() => setShowDetails(false)}
              aria-label="Close appointment details"
              className="text-gray-500 hover:text-gray-900 rounded-full p-2 transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </header>

          {/* Content */}
          <div className="space-y-8 text-gray-800 text-lg">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Patient</h3>
              <p>{exampleAppointment.patient}</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Appointment Type</h3>
              <p className="text-indigo-600 font-semibold">{exampleAppointment.type}</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Date &amp; Time</h3>
              <time
                dateTime={exampleAppointment.datetime.toISOString()}
                className="font-mono text-gray-700 text-base"
              >
                {exampleAppointment.datetime.toLocaleDateString(undefined, {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
                at{" "}
                {exampleAppointment.datetime.toLocaleTimeString(undefined, {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </time>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Status</h3>
              <span
                className={`inline-block px-5 py-2 rounded-full text-sm font-semibold select-none ${
                  statusColors[exampleAppointment.status] || "bg-gray-100 text-gray-700"
                }`}
              >
                {exampleAppointment.status}
              </span>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Notes</h3>
              <p className="whitespace-pre-line text-gray-700">{exampleAppointment.notes}</p>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
