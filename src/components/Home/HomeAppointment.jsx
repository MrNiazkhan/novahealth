"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const APPOINTMENT_REASONS = [
  "General Consultation",
  "Follow-up Visit",
  "Lab Tests",
  "Vaccination",
  "Emergency Care",
  "Other",
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { ease: "easeOut", duration: 0.6 } },
};

const buttonVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

const HomeAppointment = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    reason: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const validate = () => {
    const errors = {};

    if (!formData.name.trim()) errors.name = "Full name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      errors.email = "Invalid email address";
    }
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s-]{7,15}$/.test(formData.phone)) {
      errors.phone = "Invalid phone number";
    }
    if (!formData.date) errors.date = "Date is required";
    else if (new Date(formData.date) < new Date(new Date().toDateString())) {
      errors.date = "Date cannot be in the past";
    }
    if (!formData.time) errors.time = "Time is required";
    if (!formData.reason) errors.reason = "Please select a reason";

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
    setSubmitError("");
    setSubmitSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitSuccess(false);

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setSubmitting(true);

    try {
      await new Promise((res) => setTimeout(res, 1500));

      setSubmitSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        reason: "",
      });
    } catch (error) {
      setSubmitError("Something went wrong. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-white py-16 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-xl mx-auto"
      >
        <motion.h2
          className="text-3xl font-extrabold text-gray-900 mb-4 text-center"
          variants={itemVariants}
        >
          Schedule an <span className="text-blue-700">Appointment</span>
        </motion.h2>

        <motion.p
          className="text-center text-gray-600 max-w-xl mx-auto mb-12"
          variants={itemVariants}
        >
          Book your appointment easily with our expert medical team. We’re here to
          help you.
        </motion.p>

        {submitSuccess && (
          <motion.div
            role="alert"
            className="mb-8 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md max-w-xl mx-auto text-center font-semibold"
            variants={itemVariants}
          >
            Your appointment has been scheduled successfully!
          </motion.div>
        )}

        {submitError && (
          <motion.div
            role="alert"
            className="mb-8 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md max-w-xl mx-auto text-center font-semibold"
            variants={itemVariants}
          >
            {submitError}
          </motion.div>
        )}

        <motion.form
          onSubmit={handleSubmit}
          noValidate
          className="grid grid-cols-1 gap-6 sm:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Name */}
          <motion.div className="sm:col-span-2" variants={itemVariants}>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              disabled={submitting}
              className={`block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                formErrors.name
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300"
              }`}
              aria-invalid={!!formErrors.name}
              aria-describedby={formErrors.name ? "name-error" : undefined}
              placeholder="Your full name"
              required
            />
            {formErrors.name && (
              <p
                className="mt-1 text-red-600 text-sm"
                id="name-error"
                role="alert"
              >
                {formErrors.name}
              </p>
            )}
          </motion.div>

          {/* Email */}
          <motion.div className="sm:col-span-2" variants={itemVariants}>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              disabled={submitting}
              className={`block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                formErrors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300"
              }`}
              aria-invalid={!!formErrors.email}
              aria-describedby={formErrors.email ? "email-error" : undefined}
              placeholder="you@example.com"
              required
            />
            {formErrors.email && (
              <p
                className="mt-1 text-red-600 text-sm"
                id="email-error"
                role="alert"
              >
                {formErrors.email}
              </p>
            )}
          </motion.div>

          {/* Phone */}
          <motion.div className="sm:col-span-2" variants={itemVariants}>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone Number <span className="text-red-600">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={submitting}
              className={`block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                formErrors.phone
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300"
              }`}
              aria-invalid={!!formErrors.phone}
              aria-describedby={formErrors.phone ? "phone-error" : undefined}
              placeholder="+1234567890"
              required
            />
            {formErrors.phone && (
              <p
                className="mt-1 text-red-600 text-sm"
                id="phone-error"
                role="alert"
              >
                {formErrors.phone}
              </p>
            )}
          </motion.div>

          {/* Date */}
          <motion.div variants={itemVariants}>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Preferred Date <span className="text-red-600">*</span>
            </label>
            <input
              type="date"
              name="date"
              id="date"
              value={formData.date}
              onChange={handleChange}
              disabled={submitting}
              min={new Date().toISOString().split("T")[0]}
              className={`block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                formErrors.date
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300"
              }`}
              aria-invalid={!!formErrors.date}
              aria-describedby={formErrors.date ? "date-error" : undefined}
              required
            />
            {formErrors.date && (
              <p
                className="mt-1 text-red-600 text-sm"
                id="date-error"
                role="alert"
              >
                {formErrors.date}
              </p>
            )}
          </motion.div>

          {/* Time */}
          <motion.div variants={itemVariants}>
            <label
              htmlFor="time"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Preferred Time <span className="text-red-600">*</span>
            </label>
            <input
              type="time"
              name="time"
              id="time"
              value={formData.time}
              onChange={handleChange}
              disabled={submitting}
              min="08:00"
              max="18:00"
              className={`block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                formErrors.time
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300"
              }`}
              aria-invalid={!!formErrors.time}
              aria-describedby={formErrors.time ? "time-error" : undefined}
              required
            />
            {formErrors.time && (
              <p
                className="mt-1 text-red-600 text-sm"
                id="time-error"
                role="alert"
              >
                {formErrors.time}
              </p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Available hours: 08:00 AM - 06:00 PM
            </p>
          </motion.div>

          {/* Reason */}
          <motion.div className="sm:col-span-2" variants={itemVariants}>
            <label
              htmlFor="reason"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Reason for Appointment <span className="text-red-600">*</span>
            </label>
            <select
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              disabled={submitting}
              className={`block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                formErrors.reason
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300"
              }`}
              aria-invalid={!!formErrors.reason}
              aria-describedby={formErrors.reason ? "reason-error" : undefined}
              required
            >
              <option value="" disabled>
                Select reason
              </option>
              {APPOINTMENT_REASONS.map((reason) => (
                <option key={reason} value={reason}>
                  {reason}
                </option>
              ))}
            </select>
            {formErrors.reason && (
              <p
                className="mt-1 text-red-600 text-sm"
                id="reason-error"
                role="alert"
              >
                {formErrors.reason}
              </p>
            )}
          </motion.div>

          {/* Submit button */}
          <motion.div
            className="sm:col-span-2"
            variants={itemVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            animate="rest"
          >
            <motion.button
              type="submit"
              disabled={submitting}
              className="w-full bg-blue-700 hover:bg-blue-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors"
              variants={buttonVariants}
            >
              {submitting ? "Scheduling..." : "Schedule Appointment"}
            </motion.button>
          </motion.div>
        </motion.form>
      </motion.div>
    </section>
  );
};

export default HomeAppointment;
