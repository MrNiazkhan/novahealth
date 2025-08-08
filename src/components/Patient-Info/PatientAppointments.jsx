"use client";

import React, { useState } from "react";

const initialAppointments = [
  {
    id: 1,
    date: "2025-09-15",
    time: "10:30",
    doctor: "Dr. Sarah Connor",
    department: "Cardiology",
    status: "Confirmed",
  },
  {
    id: 2,
    date: "2025-09-25",
    time: "14:00",
    doctor: "Dr. John Smith",
    department: "Neurology",
    status: "Pending",
  },
];

const PatientAppointments = () => {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    doctor: "",
    department: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(null); // appointment id to cancel

  // Simple validation for booking
  const validate = () => {
    const errors = {};
    if (!formData.date) errors.date = "Date is required";
    else if (formData.date < new Date().toISOString().split("T")[0])
      errors.date = "Date cannot be in the past";
    if (!formData.time) errors.time = "Time is required";
    if (!formData.doctor.trim()) errors.doctor = "Doctor name is required";
    if (!formData.department.trim()) errors.department = "Department is required";
    return errors;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (formErrors[e.target.name]) {
      setFormErrors((prev) => {
        const copy = { ...prev };
        delete copy[e.target.name];
        return copy;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors({});
    const errors = validate();
    if (Object.keys(errors).length) {
      setFormErrors(errors);
      return;
    }
    setSubmitting(true);

    // Simulate API delay
    await new Promise((res) => setTimeout(res, 1200));

    setAppointments((prev) => [
      ...prev,
      {
        id: prev.length ? prev[prev.length - 1].id + 1 : 1,
        date: formData.date,
        time: formData.time,
        doctor: formData.doctor.trim(),
        department: formData.department.trim(),
        status: "Pending",
      },
    ]);
    setFormData({ date: "", time: "", doctor: "", department: "" });
    setSubmitting(false);
  };

  const confirmCancel = (id) => setShowCancelConfirm(id);
  const cancelAppointment = () => {
    setAppointments((prev) => prev.filter((a) => a.id !== showCancelConfirm));
    setShowCancelConfirm(null);
  };
  const cancelCancel = () => setShowCancelConfirm(null);

  return (
    <section className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-3xl font-extrabold text-blue-700 mb-8 text-center">
        Your Appointments
      </h2>

      {/* Appointments List */}
      {appointments.length === 0 ? (
        <p className="text-center text-gray-600 mb-10">
          You have no scheduled appointments.
        </p>
      ) : (
        <>
          {/* Desktop Table */}
          <table className="hidden md:table w-full mb-12 border-collapse">
            <thead>
              <tr className="bg-blue-100 text-blue-800 font-semibold">
                <th className="p-3 border border-blue-200 text-left rounded-tl-lg">Date</th>
                <th className="p-3 border border-blue-200 text-left">Time</th>
                <th className="p-3 border border-blue-200 text-left">Doctor</th>
                <th className="p-3 border border-blue-200 text-left">Department</th>
                <th className="p-3 border border-blue-200 text-left">Status</th>
                <th className="p-3 border border-blue-200 text-center rounded-tr-lg">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map(({ id, date, time, doctor, department, status }) => (
                <tr
                  key={id}
                  className="even:bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <td className="p-3 border border-blue-200">{date}</td>
                  <td className="p-3 border border-blue-200">{time}</td>
                  <td className="p-3 border border-blue-200">{doctor}</td>
                  <td className="p-3 border border-blue-200">{department}</td>
                  <td
                    className={`p-3 border border-blue-200 font-semibold ${
                      status === "Confirmed"
                        ? "text-green-600"
                        : status === "Pending"
                        ? "text-yellow-600"
                        : "text-gray-600"
                    }`}
                  >
                    {status}
                  </td>
                  <td className="p-3 border border-blue-200 text-center">
                    <button
                      className="text-red-600 hover:text-red-800 font-semibold"
                      onClick={() => confirmCancel(id)}
                      aria-label={`Cancel appointment on ${date} with ${doctor}`}
                      type="button"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-6 mb-12">
            {appointments.map(({ id, date, time, doctor, department, status }) => (
              <article
                key={id}
                className="border border-gray-300 rounded-lg p-4 shadow-sm bg-white"
                role="listitem"
              >
                <div className="flex justify-between mb-2">
                  <div>
                    <p className="font-semibold text-blue-700 text-lg">{date}</p>
                    <p className="text-gray-700">{time}</p>
                  </div>
                  <div
                    className={`font-semibold ${
                      status === "Confirmed"
                        ? "text-green-600"
                        : status === "Pending"
                        ? "text-yellow-600"
                        : "text-gray-600"
                    }`}
                    aria-label={`Status: ${status}`}
                  >
                    {status}
                  </div>
                </div>
                <p>
                  <span className="font-semibold">Doctor: </span>
                  {doctor}
                </p>
                <p>
                  <span className="font-semibold">Department: </span>
                  {department}
                </p>
                <button
                  className="mt-3 w-full text-center bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg focus:outline-none focus:ring-4 focus:ring-red-300 transition"
                  onClick={() => confirmCancel(id)}
                  aria-label={`Cancel appointment on ${date} with ${doctor}`}
                  type="button"
                >
                  Cancel Appointment
                </button>
              </article>
            ))}
          </div>
        </>
      )}

      {/* New Appointment Form */}
      <div className="border-t border-gray-300 pt-10">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
          Book a New Appointment
        </h3>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6"
        >
          <div>
            <label
              htmlFor="date"
              className="block font-semibold mb-2 text-gray-900"
            >
              Date <span className="text-red-600">*</span>
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              disabled={submitting}
              min={new Date().toISOString().split("T")[0]}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-gray-900 ${
                formErrors.date ? "border-red-500" : "border-gray-300"
              }`}
              aria-invalid={!!formErrors.date}
              aria-describedby={formErrors.date ? "date-error" : undefined}
              required
            />
            {formErrors.date && (
              <p
                className="text-red-600 mt-1 text-sm font-medium"
                role="alert"
                id="date-error"
              >
                {formErrors.date}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="time"
              className="block font-semibold mb-2 text-gray-900"
            >
              Time <span className="text-red-600">*</span>
            </label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              disabled={submitting}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-gray-900 ${
                formErrors.time ? "border-red-500" : "border-gray-300"
              }`}
              aria-invalid={!!formErrors.time}
              aria-describedby={formErrors.time ? "time-error" : undefined}
              required
              min="08:00"
              max="18:00"
            />
            {formErrors.time && (
              <p
                className="text-red-600 mt-1 text-sm font-medium"
                role="alert"
                id="time-error"
              >
                {formErrors.time}
              </p>
            )}
            <p className="text-xs text-gray-500 mt-1 select-none">
              Available hours: 08:00 AM - 06:00 PM
            </p>
          </div>

          <div>
            <label
              htmlFor="doctor"
              className="block font-semibold mb-2 text-gray-900"
            >
              Doctor <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="doctor"
              name="doctor"
              value={formData.doctor}
              onChange={handleChange}
              disabled={submitting}
              placeholder="Dr. Jane Doe"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-gray-900 ${
                formErrors.doctor ? "border-red-500" : "border-gray-300"
              }`}
              aria-invalid={!!formErrors.doctor}
              aria-describedby={formErrors.doctor ? "doctor-error" : undefined}
              required
            />
            {formErrors.doctor && (
              <p
                className="text-red-600 mt-1 text-sm font-medium"
                role="alert"
                id="doctor-error"
              >
                {formErrors.doctor}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="department"
              className="block font-semibold mb-2 text-gray-900"
            >
              Department <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              disabled={submitting}
              placeholder="Cardiology"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-gray-900 ${
                formErrors.department ? "border-red-500" : "border-gray-300"
              }`}
              aria-invalid={!!formErrors.department}
              aria-describedby={formErrors.department ? "department-error" : undefined}
              required
            />
            {formErrors.department && (
              <p
                className="text-red-600 mt-1 text-sm font-medium"
                role="alert"
                id="department-error"
              >
                {formErrors.department}
              </p>
            )}
          </div>

          <div className="md:col-span-2 text-center mt-4">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center gap-3 bg-blue-700 hover:bg-blue-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              {submitting ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
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
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  Booking...
                </>
              ) : (
                "Book Appointment"
              )}
            </button>
          </div>
        </form>

        {/* Cancel Confirmation Modal */}
        {showCancelConfirm !== null && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cancel-dialog-title"
            aria-describedby="cancel-dialog-desc"
            className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50"
            onClick={(e) => {
              if (e.target === e.currentTarget) cancelCancel();
            }}
          >
            <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-lg relative">
              <h3
                id="cancel-dialog-title"
                className="text-xl font-semibold mb-4 text-gray-900"
              >
                Cancel Appointment
              </h3>
              <p
                id="cancel-dialog-desc"
                className="mb-6 text-gray-700"
              >
                Are you sure you want to cancel this appointment?
              </p>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={cancelCancel}
                  className="py-2 px-6 rounded-lg border border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  No, Keep
                </button>
                <button
                  type="button"
                  onClick={cancelAppointment}
                  className="py-2 px-6 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                  Yes, Cancel
                </button>
              </div>
              <button
                onClick={cancelCancel}
                aria-label="Close cancel confirmation"
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PatientAppointments;
