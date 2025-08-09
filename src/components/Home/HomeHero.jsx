"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HomeHero = () => {
  const modalRef = useRef(null);
  const firstInputRef = useRef(null);
  const lastFocusRef = useRef(null);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  // Form fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
  });
  // Form status
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Focus trap and background scroll logic
  useEffect(() => {
    if (!modalOpen) return;

    lastFocusRef.current = document.activeElement;

    // Focus first input after modal opens
    setTimeout(() => {
      firstInputRef.current?.focus();
    }, 150);

    document.body.style.overflow = "hidden";

    const handleFocus = (e) => {
      if (!modalRef.current?.contains(e.target)) {
        e.preventDefault();
        firstInputRef.current?.focus();
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeModal();
      }
      if (e.key === "Tab") {
        const focusableElements = modalRef.current.querySelectorAll(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener("focus", handleFocus, true);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("focus", handleFocus, true);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      lastFocusRef.current?.focus();
    };
  }, [modalOpen]);

  // Form validation function
  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      errors.email = "Invalid email address";
    }
    if (!formData.date) errors.date = "Date is required";
    if (!formData.time) errors.time = "Time is required";
    return errors;
  };

  // Handle input change
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (formErrors[e.target.name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[e.target.name];
        return newErrors;
      });
    }
    setSubmitError("");
  };

  // Simulate form submission with random failure (30% fail rate)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors({});
    setSubmitError("");
    setSubmitSuccess(false);

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (Math.random() < 0.3) throw new Error("Simulated failure");

      setSubmitSuccess(true);
      setFormData({
        name: "",
        email: "",
        date: "",
        time: "",
      });
    } catch (err) {
      setSubmitError("Oops! Something went wrong. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  // Close modal and reset form
  const closeModal = () => {
    setModalOpen(false);
    setFormErrors({});
    setSubmitError("");
    setSubmitSuccess(false);
    setFormData({
      name: "",
      email: "",
      date: "",
      time: "",
    });
  };

  // Framer Motion variants for hero text and image, trigger on page load
  const heroVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.3, duration: 1, ease: "easeOut" },
    }),
  };

  // Modal animation variants
  const modalBackdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const modalContentVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: 40,
      scale: 0.95,
      transition: { duration: 0.3, ease: "easeIn" },
    },
  };

  return (
    <>
      <section
        className="relative bg-white overflow-hidden"
        aria-label="Home Hero Section"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 flex flex-col md:flex-row items-center min-h-[480px]">
          <motion.div
            className="flex-1 text-center md:text-left"
            initial="hidden"
            animate="visible"
            viewport={{ once: true }}
          >
            <motion.h1
              custom={0}
              variants={heroVariants}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-blue-700 drop-shadow-sm"
            >
              Your Health,{" "}
              <span className="text-black" aria-label="Our Priority">
                Our Priority
              </span>
            </motion.h1>

            <motion.p
              custom={1}
              variants={heroVariants}
              className="mt-5 text-lg sm:text-xl md:text-2xl max-w-xl mx-auto md:mx-0 font-light text-gray-900"
            >
              Providing expert healthcare solutions with compassion and cutting-edge
              technology.
            </motion.p>

            <motion.button
              custom={2}
              variants={heroVariants}
              className="mt-8 inline-block bg-blue-700 hover:bg-blue-800 transition-colors duration-300 text-white font-semibold px-8 py-3 rounded-lg shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
              aria-label="Schedule an Appointment"
              onClick={() => setModalOpen(true)}
              type="button"
            >
              Schedule Appointment
            </motion.button>
          </motion.div>

          <motion.div
            className="flex-1 mt-12 md:mt-0 md:ml-16 flex justify-center md:justify-end"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          >
            <img
              src="https://plus.unsplash.com/premium_photo-1661382210749-759c11c197a4?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Healthcare professional helping patient"
              className="rounded-xl shadow-xl max-w-full w-80 sm:w-96 object-cover"
              loading="lazy"
              decoding="async"
            />
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {modalOpen && (
          <motion.div
            aria-modal="true"
            role="dialog"
            aria-labelledby="appointment-modal-title"
            aria-describedby="appointment-modal-desc"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={(e) => {
              if (e.target === e.currentTarget) closeModal();
            }}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalBackdropVariants}
          >
            <motion.div
              ref={modalRef}
              tabIndex={-1}
              className="bg-white rounded-lg max-w-md w-full p-6 mx-4 relative shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none"
              variants={modalContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              role="document"
            >
              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 focus:outline-none"
                aria-label="Close appointment form"
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

              <h2
                id="appointment-modal-title"
                className="text-2xl font-bold mb-4 text-blue-700"
                tabIndex={-1}
              >
                Schedule an Appointment
              </h2>

              <p id="appointment-modal-desc" className="mb-6 text-gray-700">
                Please fill out the form below and we will contact you to confirm your
                appointment.
              </p>

              {submitSuccess ? (
                <div
                  role="alert"
                  className="text-green-600 font-semibold text-center my-6 animate-fadeIn"
                >
                  Your appointment request has been sent successfully!
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-4">
                    <label htmlFor="name" className="block font-semibold mb-1">
                      Full Name<span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      ref={firstInputRef}
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors ${
                        formErrors.name ? "border-red-500" : "border-gray-300"
                      }`}
                      aria-invalid={!!formErrors.name}
                      aria-describedby={formErrors.name ? "name-error" : undefined}
                      required
                      autoComplete="name"
                      disabled={submitting}
                      placeholder="John Doe"
                    />
                    {formErrors.name && (
                      <p id="name-error" className="text-red-600 text-sm mt-1" role="alert">
                        {formErrors.name}
                      </p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="email" className="block font-semibold mb-1">
                      Email Address<span className="text-red-600">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors ${
                        formErrors.email ? "border-red-500" : "border-gray-300"
                      }`}
                      aria-invalid={!!formErrors.email}
                      aria-describedby={formErrors.email ? "email-error" : undefined}
                      required
                      autoComplete="email"
                      disabled={submitting}
                      placeholder="john@example.com"
                    />
                    {formErrors.email && (
                      <p id="email-error" className="text-red-600 text-sm mt-1" role="alert">
                        {formErrors.email}
                      </p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="date" className="block font-semibold mb-1">
                      Preferred Date<span className="text-red-600">*</span>
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors ${
                        formErrors.date ? "border-red-500" : "border-gray-300"
                      }`}
                      aria-invalid={!!formErrors.date}
                      aria-describedby={formErrors.date ? "date-error" : undefined}
                      required
                      disabled={submitting}
                      min={new Date().toISOString().split("T")[0]}
                    />
                    {formErrors.date && (
                      <p id="date-error" className="text-red-600 text-sm mt-1" role="alert">
                        {formErrors.date}
                      </p>
                    )}
                  </div>

                  <div className="mb-6">
                    <label htmlFor="time" className="block font-semibold mb-1">
                      Preferred Time<span className="text-red-600">*</span>
                    </label>
                    <input
                      type="time"
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors ${
                        formErrors.time ? "border-red-500" : "border-gray-300"
                      }`}
                      aria-invalid={!!formErrors.time}
                      aria-describedby={formErrors.time ? "time-error" : undefined}
                      required
                      disabled={submitting}
                      min="08:00"
                      max="18:00"
                    />
                    {formErrors.time && (
                      <p id="time-error" className="text-red-600 text-sm mt-1" role="alert">
                        {formErrors.time}
                      </p>
                    )}
                    <p className="text-xs text-gray-500 mt-1 select-none">
                      Available hours: 08:00 AM - 06:00 PM
                    </p>
                  </div>

                  {submitError && (
                    <p className="text-red-600 mb-4 font-semibold text-center" role="alert">
                      {submitError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-blue-700 hover:bg-blue-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors flex justify-center items-center"
                  >
                    {submitting ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5 mr-2 text-white"
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
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8H4z"
                          ></path>
                        </svg>
                        Scheduling...
                      </>
                    ) : (
                      "Confirm Appointment"
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HomeHero;
