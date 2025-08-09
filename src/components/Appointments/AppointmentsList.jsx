"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";

const STATUS_OPTIONS = ["All", "Confirmed", "Pending", "Cancelled"];

const statusStyles = {
  Confirmed: "bg-green-100 text-green-800",
  Pending: "bg-yellow-100 text-yellow-800",
  Cancelled: "bg-red-100 text-red-800",
};

const dummyAppointments = [
  {
    id: "a1",
    datetime: new Date("2025-08-10T09:30"),
    patient: "John Doe",
    type: "Consultation",
    status: "Confirmed",
  },
  {
    id: "a2",
    datetime: new Date("2025-08-10T11:00"),
    patient: "Alice Smith",
    type: "Therapy",
    status: "Pending",
  },
  {
    id: "a3",
    datetime: new Date("2025-08-11T14:00"),
    patient: "Michael Johnson",
    type: "Check-up",
    status: "Cancelled",
  },
  {
    id: "a4",
    datetime: new Date("2025-08-12T10:15"),
    patient: "Emma Brown",
    type: "Surgery",
    status: "Confirmed",
  },
  {
    id: "a5",
    datetime: new Date("2025-08-13T08:45"),
    patient: "Liam Wilson",
    type: "Emergency",
    status: "Confirmed",
  },
];

export default function AppointmentsList({ appointments = dummyAppointments }) {
  const [filterStatus, setFilterStatus] = useState("All");

  // Filter and sort appointments by datetime ascending
  const filteredAppointments = useMemo(() => {
    return appointments
      .filter((app) => filterStatus === "All" || app.status === filterStatus)
      .sort((a, b) => a.datetime - b.datetime);
  }, [appointments, filterStatus]);

  function handleAppointmentClick(app) {
    alert(
      `Appointment Details:\n` +
        `Patient: ${app.patient}\n` +
        `Type: ${app.type}\n` +
        `Date & Time: ${app.datetime.toLocaleString()}\n` +
        `Status: ${app.status}`
    );
  }

  return (
    <motion.section
      aria-label="Appointments List"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-lg select-none"
    >
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-6">
        <h1 className="text-3xl font-extrabold text-gray-900">Upcoming Appointments</h1>

        {/* Filter */}
        <div className="flex items-center gap-3">
          <label
            htmlFor="statusFilter"
            className="font-semibold text-gray-700 whitespace-nowrap"
          >
            Filter by Status:
          </label>
          <select
            id="statusFilter"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          >
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </header>

      {/* List */}
      <ul className="divide-y divide-gray-200 max-h-[480px] overflow-y-auto rounded-lg">
        {filteredAppointments.length === 0 ? (
          <li className="py-8 text-center text-gray-500 italic select-text">
            No appointments found.
          </li>
        ) : (
          filteredAppointments.map((app) => {
            return (
              <li
                key={app.id}
                tabIndex={0}
                role="button"
                onClick={() => handleAppointmentClick(app)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleAppointmentClick(app);
                  }
                }}
                aria-label={`Appointment with ${app.patient} on ${app.datetime.toLocaleString()}, status ${app.status}`}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 hover:bg-indigo-50 focus:bg-indigo-100 focus:outline-none cursor-pointer transition rounded-lg"
              >
                {/* Left details */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-6 flex-1 min-w-0">
                  {/* Date & Time */}
                  <time
                    dateTime={app.datetime.toISOString()}
                    className="text-gray-700 font-mono text-sm whitespace-nowrap"
                  >
                    {app.datetime.toLocaleDateString(undefined, {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}{" "}
                    &bull;{" "}
                    {app.datetime.toLocaleTimeString(undefined, {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </time>

                  {/* Patient Name */}
                  <p
                    className="text-gray-900 font-semibold truncate"
                    title={app.patient}
                  >
                    {app.patient}
                  </p>

                  {/* Appointment Type */}
                  <p
                    className="text-indigo-600 font-semibold whitespace-nowrap"
                    title={app.type}
                  >
                    {app.type}
                  </p>
                </div>

                {/* Status Badge */}
                <span
                  className={`ml-0 sm:ml-4 inline-block px-4 py-1.5 rounded-full text-xs font-semibold select-none ${
                    statusStyles[app.status] || "bg-gray-100 text-gray-700"
                  }`}
                >
                  {app.status}
                </span>
              </li>
            );
          })
        )}
      </ul>
    </motion.section>
  );
}
