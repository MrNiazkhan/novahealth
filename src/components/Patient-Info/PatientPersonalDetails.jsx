"use client";

import React, { useState } from "react";

const PatientPersonalDetails = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Validation rules
  const validate = () => {
    const errs = {};

    if (!formData.fullName.trim()) {
      errs.fullName = "Full Name is required";
    }

    if (!formData.email.trim()) {
      errs.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      errs.email = "Invalid email address";
    }

    if (!formData.phone.trim()) {
      errs.phone = "Phone number is required";
    } else if (!/^\+?\d{7,15}$/.test(formData.phone.trim())) {
      errs.phone = "Enter a valid phone number";
    }

    if (!formData.dob) {
      errs.dob = "Date of Birth is required";
    }

    if (!formData.gender) {
      errs.gender = "Please select your gender";
    }

    if (!formData.address.trim()) {
      errs.address = "Address is required";
    }

    return errs;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy[e.target.name];
      return copy;
    });
    setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccess(false);

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);

    try {
      await new Promise((res) => setTimeout(res, 1500)); // simulate API delay
      setSuccess(true);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        dob: "",
        gender: "",
        address: "",
      });
    } catch {
      setErrors({ submit: "Submission failed. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      aria-labelledby="personal-details-title"
      className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md"
    >
      <h2
        id="personal-details-title"
        className="text-3xl font-bold text-blue-700 mb-6 text-center"
      >
        Patient Personal Details
      </h2>

      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label
              htmlFor="fullName"
              className="block font-semibold mb-1 text-gray-800"
            >
              Full Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              disabled={submitting}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors ${
                errors.fullName ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Jane Doe"
              aria-invalid={!!errors.fullName}
              aria-describedby={errors.fullName ? "fullName-error" : undefined}
              autoComplete="name"
              required
            />
            {errors.fullName && (
              <p
                id="fullName-error"
                className="text-red-600 mt-1 text-sm"
                role="alert"
              >
                {errors.fullName}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block font-semibold mb-1 text-gray-800"
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
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="jane@example.com"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              autoComplete="email"
              required
            />
            {errors.email && (
              <p
                id="email-error"
                className="text-red-600 mt-1 text-sm"
                role="alert"
              >
                {errors.email}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="block font-semibold mb-1 text-gray-800"
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
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="+1234567890"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              autoComplete="tel"
              required
            />
            {errors.phone && (
              <p
                id="phone-error"
                className="text-red-600 mt-1 text-sm"
                role="alert"
              >
                {errors.phone}
              </p>
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <label
              htmlFor="dob"
              className="block font-semibold mb-1 text-gray-800"
            >
              Date of Birth <span className="text-red-600">*</span>
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              disabled={submitting}
              max={new Date().toISOString().split("T")[0]}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors ${
                errors.dob ? "border-red-500" : "border-gray-300"
              }`}
              aria-invalid={!!errors.dob}
              aria-describedby={errors.dob ? "dob-error" : undefined}
              required
            />
            {errors.dob && (
              <p
                id="dob-error"
                className="text-red-600 mt-1 text-sm"
                role="alert"
              >
                {errors.dob}
              </p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label
              htmlFor="gender"
              className="block font-semibold mb-1 text-gray-800"
            >
              Gender <span className="text-red-600">*</span>
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              disabled={submitting}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors ${
                errors.gender ? "border-red-500" : "border-gray-300"
              }`}
              aria-invalid={!!errors.gender}
              aria-describedby={errors.gender ? "gender-error" : undefined}
              required
            >
              <option value="">Select Gender</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="nonbinary">Non-binary</option>
              <option value="other">Other</option>
              <option value="preferNotToSay">Prefer not to say</option>
            </select>
            {errors.gender && (
              <p
                id="gender-error"
                className="text-red-600 mt-1 text-sm"
                role="alert"
              >
                {errors.gender}
              </p>
            )}
          </div>

          {/* Address (full width) */}
          <div className="md:col-span-2">
            <label
              htmlFor="address"
              className="block font-semibold mb-1 text-gray-800"
            >
              Address <span className="text-red-600">*</span>
            </label>
            <textarea
              id="address"
              name="address"
              rows={3}
              value={formData.address}
              onChange={handleChange}
              disabled={submitting}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors resize-none ${
                errors.address ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="123 Main St, City, Country"
              aria-invalid={!!errors.address}
              aria-describedby={errors.address ? "address-error" : undefined}
              required
            />
            {errors.address && (
              <p
                id="address-error"
                className="text-red-600 mt-1 text-sm"
                role="alert"
              >
                {errors.address}
              </p>
            )}
          </div>
        </div>

        {errors.submit && (
          <p
            className="mt-4 text-red-600 font-semibold text-center"
            role="alert"
          >
            {errors.submit}
          </p>
        )}

        {success && (
          <p
            className="mt-4 text-green-600 font-semibold text-center"
            role="alert"
          >
            Details submitted successfully!
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="mt-8 w-full bg-blue-700 hover:bg-blue-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors flex justify-center items-center"
          aria-live="polite"
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
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
              Submitting...
            </>
          ) : (
            "Submit Details"
          )}
        </button>
      </form>
    </section>
  );
};

export default PatientPersonalDetails;
