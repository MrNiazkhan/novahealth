"use client";

import React, { useState } from "react";

const CONDITIONS = [
  "Diabetes",
  "Hypertension",
  "Heart Disease",
  "Asthma",
  "Cancer",
  "Kidney Disease",
  "Arthritis",
  "Other",
];

const PatientMedicalHistory = () => {
  const [formData, setFormData] = useState({
    existingConditions: [],
    medications: "",
    allergies: "",
    familyHistory: "",
    smoking: "",
    alcohol: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const toggleCondition = (condition) => {
    setFormData((prev) => {
      const exists = prev.existingConditions.includes(condition);
      const updated = exists
        ? prev.existingConditions.filter((c) => c !== condition)
        : [...prev.existingConditions, condition];
      return { ...prev, existingConditions: updated };
    });
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy.existingConditions;
      return copy;
    });
    setSuccess(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy[name];
      return copy;
    });
    setSuccess(false);
  };

  const validate = () => {
    const errs = {};
    if (formData.existingConditions.length === 0)
      errs.existingConditions = "Please select at least one existing condition or 'None'.";
    if (!formData.medications.trim())
      errs.medications = "Please list any current medications or enter 'None'.";
    if (!formData.allergies.trim())
      errs.allergies = "Please list any allergies or enter 'None'.";
    if (!formData.familyHistory.trim())
      errs.familyHistory = "Please provide family medical history or enter 'None'.";
    if (!formData.smoking) errs.smoking = "Please select your smoking status.";
    if (!formData.alcohol) errs.alcohol = "Please select your alcohol consumption status.";
    return errs;
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
      await new Promise((res) => setTimeout(res, 1500));
      setSuccess(true);
      setFormData({
        existingConditions: [],
        medications: "",
        allergies: "",
        familyHistory: "",
        smoking: "",
        alcohol: "",
      });
    } catch {
      setErrors({ submit: "Submission failed. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      aria-labelledby="medical-history-title"
      className="max-w-5xl mx-auto bg-white p-10 rounded-xl shadow-md"
    >
      <h2
        id="medical-history-title"
        className="text-3xl font-extrabold text-blue-700 mb-10 text-center"
      >
        Patient Medical History
      </h2>

      <form onSubmit={handleSubmit} noValidate>
        {/* Responsive Existing Conditions */}
        <fieldset className="mb-10">
          <legend className="font-semibold text-gray-900 mb-5 text-lg">
            Existing Medical Conditions <span className="text-red-600">*</span>
          </legend>
          <div
            className="
              flex flex-wrap
              gap-x-16 gap-y-4
              md:gap-x-12 md:gap-y-6
              justify-start
              max-w-full
            "
          >
            {CONDITIONS.map((condition) => (
              <label
                key={condition}
                className="
                  flex items-center cursor-pointer select-none
                  text-gray-800
                  whitespace-nowrap
                  font-medium
                  text-base
                  md:text-lg
                  min-w-[180px]
                "
              >
                <input
                  type="checkbox"
                  name="existingConditions"
                  value={condition}
                  checked={formData.existingConditions.includes(condition)}
                  onChange={() => toggleCondition(condition)}
                  disabled={submitting}
                  className="form-checkbox h-5 w-5 md:h-6 md:w-6 text-blue-600"
                  aria-checked={formData.existingConditions.includes(condition)}
                />
                <span className="ml-3">{condition}</span>
              </label>
            ))}
          </div>
          {errors.existingConditions && (
            <p
              className="text-red-600 mt-3 text-sm font-medium"
              role="alert"
              id="existingConditions-error"
            >
              {errors.existingConditions}
            </p>
          )}
        </fieldset>

        {/* Other form parts remain same as before */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          <div>
            <label
              htmlFor="medications"
              className="block font-semibold mb-2 text-gray-900 text-lg"
            >
              Current Medications <span className="text-red-600">*</span>
            </label>
            <textarea
              id="medications"
              name="medications"
              rows={4}
              value={formData.medications}
              onChange={handleChange}
              disabled={submitting}
              placeholder="List all current medications or enter 'None'"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-none text-gray-900 text-base ${
                errors.medications ? "border-red-500" : "border-gray-300"
              }`}
              aria-invalid={!!errors.medications}
              aria-describedby={errors.medications ? "medications-error" : undefined}
              required
            />
            {errors.medications && (
              <p
                id="medications-error"
                className="text-red-600 mt-2 text-sm font-medium"
                role="alert"
              >
                {errors.medications}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="allergies"
              className="block font-semibold mb-2 text-gray-900 text-lg"
            >
              Allergies <span className="text-red-600">*</span>
            </label>
            <textarea
              id="allergies"
              name="allergies"
              rows={4}
              value={formData.allergies}
              onChange={handleChange}
              disabled={submitting}
              placeholder="List any allergies or enter 'None'"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-none text-gray-900 text-base ${
                errors.allergies ? "border-red-500" : "border-gray-300"
              }`}
              aria-invalid={!!errors.allergies}
              aria-describedby={errors.allergies ? "allergies-error" : undefined}
              required
            />
            {errors.allergies && (
              <p
                id="allergies-error"
                className="text-red-600 mt-2 text-sm font-medium"
                role="alert"
              >
                {errors.allergies}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="familyHistory"
              className="block font-semibold mb-2 text-gray-900 text-lg"
            >
              Family Medical History <span className="text-red-600">*</span>
            </label>
            <textarea
              id="familyHistory"
              name="familyHistory"
              rows={5}
              value={formData.familyHistory}
              onChange={handleChange}
              disabled={submitting}
              placeholder="Describe any relevant family medical history or enter 'None'"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-none text-gray-900 text-base ${
                errors.familyHistory ? "border-red-500" : "border-gray-300"
              }`}
              aria-invalid={!!errors.familyHistory}
              aria-describedby={errors.familyHistory ? "familyHistory-error" : undefined}
              required
            />
            {errors.familyHistory && (
              <p
                id="familyHistory-error"
                className="text-red-600 mt-2 text-sm font-medium"
                role="alert"
              >
                {errors.familyHistory}
              </p>
            )}
          </div>
        </div>

        {/* Smoking */}
        <fieldset className="mt-10">
          <legend className="font-semibold text-gray-900 mb-4 text-lg">
            Do you smoke? <span className="text-red-600">*</span>
          </legend>
          <div className="flex flex-wrap gap-8">
            {["Yes", "No", "Occasionally", "Prefer not to say"].map((option) => (
              <label
                key={option}
                className="inline-flex items-center cursor-pointer text-gray-800 text-base"
              >
                <input
                  type="radio"
                  name="smoking"
                  value={option}
                  checked={formData.smoking === option}
                  onChange={handleChange}
                  disabled={submitting}
                  className="form-radio h-5 w-5 text-blue-600"
                  aria-checked={formData.smoking === option}
                  required
                />
                <span className="ml-3">{option}</span>
              </label>
            ))}
          </div>
          {errors.smoking && (
            <p
              className="text-red-600 mt-3 text-sm font-medium"
              role="alert"
              id="smoking-error"
            >
              {errors.smoking}
            </p>
          )}
        </fieldset>

        {/* Alcohol */}
        <fieldset className="mt-10">
          <legend className="font-semibold text-gray-900 mb-4 text-lg">
            Do you consume alcohol? <span className="text-red-600">*</span>
          </legend>
          <div className="flex flex-wrap gap-8">
            {["Yes", "No", "Occasionally", "Prefer not to say"].map((option) => (
              <label
                key={option}
                className="inline-flex items-center cursor-pointer text-gray-800 text-base"
              >
                <input
                  type="radio"
                  name="alcohol"
                  value={option}
                  checked={formData.alcohol === option}
                  onChange={handleChange}
                  disabled={submitting}
                  className="form-radio h-5 w-5 text-blue-600"
                  aria-checked={formData.alcohol === option}
                  required
                />
                <span className="ml-3">{option}</span>
              </label>
            ))}
          </div>
          {errors.alcohol && (
            <p
              className="text-red-600 mt-3 text-sm font-medium"
              role="alert"
              id="alcohol-error"
            >
              {errors.alcohol}
            </p>
          )}
        </fieldset>

        {errors.submit && (
          <p className="mt-8 text-red-600 font-semibold text-center" role="alert">
            {errors.submit}
          </p>
        )}

        {success && (
          <p className="mt-8 text-green-600 font-semibold text-center" role="alert">
            Medical history submitted successfully!
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="mt-10 w-full bg-blue-700 hover:bg-blue-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors flex justify-center items-center"
          aria-live="polite"
        >
          {submitting ? (
            <>
              <svg
                className="animate-spin h-5 w-5 mr-3 text-white"
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
            "Submit Medical History"
          )}
        </button>
      </form>
    </section>
  );
};

export default PatientMedicalHistory;
