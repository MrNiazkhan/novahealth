"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HomeContact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
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
    if (!formData.subject.trim()) errors.subject = "Subject is required";
    if (!formData.message.trim()) errors.message = "Message cannot be empty";
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
      await new Promise((res) => setTimeout(res, 1800));

      setSubmitSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      setSubmitError("Oops! Something went wrong. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
        ease: "easeOut",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } },
  };

  return (
    <motion.section
      aria-labelledby="contact-title"
      className="max-w-4xl mx-auto bg-white p-10 rounded-lg shadow-lg my-16 sm:my-24 mb-5"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h2
        id="contact-title"
        className="text-3xl font-extrabold text-gray-900 mb-8 text-center"
        variants={itemVariants}
      >
        Get In <span className="text-blue-700">Touch</span>
      </motion.h2>

      <AnimatePresence>
        {submitSuccess && (
          <motion.div
            role="alert"
            className="mb-8 bg-green-100 border border-green-400 text-green-700 px-5 py-3 rounded-md text-center font-semibold"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            Thank you! Your message has been sent successfully.
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {submitError && (
          <motion.div
            role="alert"
            className="mb-8 bg-red-100 border border-red-400 text-red-700 px-5 py-3 rounded-md text-center font-semibold"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {submitError}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.form
        onSubmit={handleSubmit}
        noValidate
        className="grid gap-6 sm:grid-cols-2"
        variants={containerVariants}
      >
        {/* Name */}
        <motion.div className="sm:col-span-1" variants={itemVariants}>
          <label
            htmlFor="name"
            className="block mb-2 font-semibold text-gray-700"
          >
            Full Name <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={submitting}
            placeholder="Your full name"
            className={`w-full rounded-md border px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              formErrors.name
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300"
            }`}
            aria-invalid={!!formErrors.name}
            aria-describedby={formErrors.name ? "name-error" : undefined}
            required
          />
          {formErrors.name && (
            <p
              id="name-error"
              role="alert"
              className="text-sm mt-1 text-red-600 font-medium"
            >
              {formErrors.name}
            </p>
          )}
        </motion.div>

        {/* Email */}
        <motion.div className="sm:col-span-1" variants={itemVariants}>
          <label
            htmlFor="email"
            className="block mb-2 font-semibold text-gray-700"
          >
            Email Address <span className="text-red-600">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={submitting}
            placeholder="you@example.com"
            className={`w-full rounded-md border px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              formErrors.email
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300"
            }`}
            aria-invalid={!!formErrors.email}
            aria-describedby={formErrors.email ? "email-error" : undefined}
            required
          />
          {formErrors.email && (
            <p
              id="email-error"
              role="alert"
              className="text-sm mt-1 text-red-600 font-medium"
            >
              {formErrors.email}
            </p>
          )}
        </motion.div>

        {/* Phone */}
        <motion.div className="sm:col-span-2" variants={itemVariants}>
          <label
            htmlFor="phone"
            className="block mb-2 font-semibold text-gray-700"
          >
            Phone Number <span className="text-red-600">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            disabled={submitting}
            placeholder="+1234567890"
            className={`w-full rounded-md border px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              formErrors.phone
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300"
            }`}
            aria-invalid={!!formErrors.phone}
            aria-describedby={formErrors.phone ? "phone-error" : undefined}
            required
          />
          {formErrors.phone && (
            <p
              id="phone-error"
              role="alert"
              className="text-sm mt-1 text-red-600 font-medium"
            >
              {formErrors.phone}
            </p>
          )}
        </motion.div>

        {/* Subject */}
        <motion.div className="sm:col-span-2" variants={itemVariants}>
          <label
            htmlFor="subject"
            className="block mb-2 font-semibold text-gray-700"
          >
            Subject <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            disabled={submitting}
            placeholder="Brief subject"
            className={`w-full rounded-md border px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              formErrors.subject
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300"
            }`}
            aria-invalid={!!formErrors.subject}
            aria-describedby={formErrors.subject ? "subject-error" : undefined}
            required
          />
          {formErrors.subject && (
            <p
              id="subject-error"
              role="alert"
              className="text-sm mt-1 text-red-600 font-medium"
            >
              {formErrors.subject}
            </p>
          )}
        </motion.div>

        {/* Message */}
        <motion.div className="sm:col-span-2" variants={itemVariants}>
          <label
            htmlFor="message"
            className="block mb-2 font-semibold text-gray-700"
          >
            Message <span className="text-red-600">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            disabled={submitting}
            placeholder="Write your message here..."
            className={`w-full rounded-md border px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
              formErrors.message
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300"
            }`}
            aria-invalid={!!formErrors.message}
            aria-describedby={formErrors.message ? "message-error" : undefined}
            required
          />
          {formErrors.message && (
            <p
              id="message-error"
              role="alert"
              className="text-sm mt-1 text-red-600 font-medium"
            >
              {formErrors.message}
            </p>
          )}
        </motion.div>

        {/* Submit Button */}
        <motion.div className="sm:col-span-2" variants={itemVariants}>
          <motion.button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-700 hover:bg-blue-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors"
            aria-live="polite"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            whileFocus={{ scale: 1.03 }}
          >
            {submitting ? "Sending..." : "Send Message"}
          </motion.button>
        </motion.div>
      </motion.form>
    </motion.section>
  );
};

export default HomeContact;
