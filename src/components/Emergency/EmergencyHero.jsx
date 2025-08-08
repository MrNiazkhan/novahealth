"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EmergencyHero = () => {
  const modalRef = useRef(null);
  const firstInputRef = useRef(null);
  const lastFocusRef = useRef(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    emergencyType: "",
    description: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    if (!modalOpen) return;

    lastFocusRef.current = document.activeElement;

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
        const focusable = modalRef.current.querySelectorAll(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        const firstEl = focusable[0];
        const lastEl = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstEl) {
            e.preventDefault();
            lastEl.focus();
          }
        } else {
          if (document.activeElement === lastEl) {
            e.preventDefault();
            firstEl.focus();
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

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^\+?\d{7,15}$/.test(formData.phone.trim())) {
      errors.phone = "Enter a valid phone number";
    }
    if (!formData.emergencyType) errors.emergencyType = "Please select emergency type";
    if (!formData.description.trim()) errors.description = "Please describe the emergency";
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
    setSubmitError("");
  };

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
      await new Promise((res) => setTimeout(res, 1500));
      if (Math.random() < 0.15) throw new Error("Simulated server error");

      setSubmitSuccess(true);
      setFormData({
        name: "",
        phone: "",
        emergencyType: "",
        description: "",
      });
    } catch {
      setSubmitError("Failed to submit emergency request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setFormErrors({});
    setSubmitError("");
    setSubmitSuccess(false);
    setFormData({
      name: "",
      phone: "",
      emergencyType: "",
      description: "",
    });
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.3, duration: 0.6, ease: "easeOut" },
    }),
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.35, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: 15,
      scale: 0.95,
      transition: { duration: 0.25, ease: "easeIn" },
    },
  };

  return (
    <>
      <section
        aria-label="Emergency Services Hero"
        className="bg-white text-black min-h-[440px] flex items-center px-5 sm:px-8 md:px-12 my-16 md:my-20 "
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center w-full gap-10 md:gap-16">
          <motion.div
            className="flex-1 text-center md:text-left"
            initial="hidden"
            animate="visible"
            viewport={{ once: true }}
          >
           <motion.h1
  custom={0}
  variants={textVariants}
  className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight"
>
  <span className="text-blue-700">Immediate</span>{" "}
  <span className="text-black">Emergency Assistance</span>
</motion.h1>


            <motion.p
              custom={1}
              variants={textVariants}
              className="mt-4 text-base sm:text-lg md:text-xl font-light max-w-lg mx-auto md:mx-0 leading-relaxed"
            >
              If you are facing an emergency, please fill out the form below so
              our team can respond quickly and effectively.
            </motion.p>

            <motion.button
              custom={2}
              variants={textVariants}
              type="button"
              onClick={() => setModalOpen(true)}
              className="mt-7 px-8 py-2.5 bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:bg-blue-800 transition-colors focus:outline-none focus:ring-4 focus:ring-blue-300"
              aria-label="Open Emergency Contact Form"
            >
              Request Help Now
            </motion.button>
          </motion.div>

          <motion.div
            className="flex-1 max-w-sm mx-auto md:mx-0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          >
            <img
              src="https://images.unsplash.com/photo-1612574935301-af13ccce9258?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Emergency medical responders assisting patient"
              className="rounded-xl shadow-xl w-full object-cover"
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
            aria-labelledby="emergency-modal-title"
            aria-describedby="emergency-modal-desc"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) closeModal();
            }}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={backdropVariants}
          >
            <motion.div
              ref={modalRef}
              tabIndex={-1}
              className="bg-white rounded-lg max-w-md w-full p-5 relative shadow-xl ring-1 ring-black ring-opacity-10 focus:outline-none"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              role="document"
            >
              <button
                type="button"
                onClick={closeModal}
                className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 focus:outline-none"
                aria-label="Close emergency contact form"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <h2
                id="emergency-modal-title"
                className="text-xl font-bold mb-4 text-blue-700"
                tabIndex={-1}
              >
                Emergency Contact Form
              </h2>

              <p id="emergency-modal-desc" className="mb-5 text-gray-700 text-sm sm:text-base">
                Please provide accurate information so our emergency team can
                assist you immediately.
              </p>

              {submitSuccess ? (
                <div
                  role="alert"
                  className="text-green-600 font-semibold text-center my-5 animate-fadeIn text-sm sm:text-base"
                >
                  Your request has been received. Help is on the way.
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-3">
                    <label
                      htmlFor="name"
                      className="block font-semibold mb-1 text-gray-800 text-sm sm:text-base"
                    >
                      Full Name<span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      ref={firstInputRef}
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-2.5 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors text-sm sm:text-base ${
                        formErrors.name ? "border-red-500" : "border-gray-300"
                      }`}
                      aria-invalid={!!formErrors.name}
                      aria-describedby={formErrors.name ? "name-error" : undefined}
                      placeholder="John Doe"
                      disabled={submitting}
                      autoComplete="name"
                      required
                    />
                    {formErrors.name && (
                      <p
                        id="name-error"
                        className="text-red-600 text-xs sm:text-sm mt-1"
                        role="alert"
                      >
                        {formErrors.name}
                      </p>
                    )}
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="phone"
                      className="block font-semibold mb-1 text-gray-800 text-sm sm:text-base"
                    >
                      Phone Number<span className="text-red-600">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-2.5 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors text-sm sm:text-base ${
                        formErrors.phone ? "border-red-500" : "border-gray-300"
                      }`}
                      aria-invalid={!!formErrors.phone}
                      aria-describedby={formErrors.phone ? "phone-error" : undefined}
                      placeholder="+1234567890"
                      disabled={submitting}
                      autoComplete="tel"
                      required
                    />
                    {formErrors.phone && (
                      <p
                        id="phone-error"
                        className="text-red-600 text-xs sm:text-sm mt-1"
                        role="alert"
                      >
                        {formErrors.phone}
                      </p>
                    )}
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="emergencyType"
                      className="block font-semibold mb-1 text-gray-800 text-sm sm:text-base"
                    >
                      Emergency Type<span className="text-red-600">*</span>
                    </label>
                    <select
                      id="emergencyType"
                      name="emergencyType"
                      value={formData.emergencyType}
                      onChange={handleChange}
                      className={`w-full px-2.5 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors text-sm sm:text-base ${
                        formErrors.emergencyType ? "border-red-500" : "border-gray-300"
                      }`}
                      aria-invalid={!!formErrors.emergencyType}
                      aria-describedby={
                        formErrors.emergencyType ? "emergencyType-error" : undefined
                      }
                      disabled={submitting}
                      required
                    >
                      <option value="">Select Emergency Type</option>
                      <option value="medical">Medical</option>
                      <option value="fire">Fire</option>
                      <option value="police">Police</option>
                      <option value="other">Other</option>
                    </select>
                    {formErrors.emergencyType && (
                      <p
                        id="emergencyType-error"
                        className="text-red-600 text-xs sm:text-sm mt-1"
                        role="alert"
                      >
                        {formErrors.emergencyType}
                      </p>
                    )}
                  </div>

                  <div className="mb-5">
                    <label
                      htmlFor="description"
                      className="block font-semibold mb-1 text-gray-800 text-sm sm:text-base"
                    >
                      Description<span className="text-red-600">*</span>
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={3}
                      value={formData.description}
                      onChange={handleChange}
                      className={`w-full px-2.5 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors resize-none text-sm sm:text-base ${
                        formErrors.description ? "border-red-500" : "border-gray-300"
                      }`}
                      aria-invalid={!!formErrors.description}
                      aria-describedby={
                        formErrors.description ? "description-error" : undefined
                      }
                      placeholder="Briefly describe the emergency..."
                      disabled={submitting}
                      required
                    />
                    {formErrors.description && (
                      <p
                        id="description-error"
                        className="text-red-600 text-xs sm:text-sm mt-1"
                        role="alert"
                      >
                        {formErrors.description}
                      </p>
                    )}
                  </div>

                  {submitError && (
                    <p
                      className="text-red-600 mb-4 font-semibold text-center text-sm sm:text-base"
                      role="alert"
                    >
                      {submitError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-blue-700 hover:bg-blue-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-lg transition-colors flex justify-center items-center text-sm sm:text-base"
                  >
                    {submitting ? (
                      <>
                        <svg
                          className="animate-spin h-4 w-4 mr-2 text-white"
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
                        Sending...
                      </>
                    ) : (
                      "Send Request"
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

export default EmergencyHero;
