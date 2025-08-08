"use client";

import React, { useState } from "react";

const contactMethods = [
  { id: "email", label: "Email" },
  { id: "phone", label: "Phone" },
  { id: "sms", label: "SMS" },
];

const PatientContactPreferences = () => {
  const [selectedMethods, setSelectedMethods] = useState([]);
  const [contactTime, setContactTime] = useState("");
  const [errors, setErrors] = useState({});

  // Toggle contact method checkbox
  const toggleMethod = (methodId) => {
    setSelectedMethods((prev) =>
      prev.includes(methodId)
        ? prev.filter((m) => m !== methodId)
        : [...prev, methodId]
    );
    setErrors((prev) => ({ ...prev, methods: undefined }));
  };

  const handleTimeChange = (e) => {
    setContactTime(e.target.value);
    if (e.target.value) setErrors((prev) => ({ ...prev, time: undefined }));
  };

  // Validate inputs before submission
  const validate = () => {
    const newErrors = {};
    if (selectedMethods.length === 0)
      newErrors.methods = "Please select at least one contact method.";
    if (!contactTime) newErrors.time = "Please select the best time to contact.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Simulate form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    alert(
      `Preferences saved:\nMethods: ${selectedMethods.join(
        ", "
      )}\nBest time to contact: ${contactTime}`
    );
  };

  return (
    <section
      aria-labelledby="contact-preferences-title"
      className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md my-10"
    >
      <h2
        id="contact-preferences-title"
        className="text-3xl font-extrabold text-blue-700 mb-6 text-center"
      >
        Contact Preferences
      </h2>

      <form onSubmit={handleSubmit} noValidate>
        {/* Contact Methods */}
        <fieldset className="mb-6">
          <legend className="text-lg font-semibold text-gray-700 mb-3">
            Preferred Contact Methods <span className="text-red-600">*</span>
          </legend>
          <div className="flex flex-wrap gap-6">
            {contactMethods.map(({ id, label }) => (
              <label
                key={id}
                htmlFor={id}
                className="inline-flex items-center cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  id={id}
                  name="contactMethods"
                  value={id}
                  checked={selectedMethods.includes(id)}
                  onChange={() => toggleMethod(id)}
                  className="form-checkbox h-5 w-5 text-blue-700 transition duration-150 ease-in-out"
                />
                <span className="ml-2 text-gray-900 text-base">{label}</span>
              </label>
            ))}
          </div>
          {errors.methods && (
            <p className="mt-2 text-sm text-red-600" role="alert">
              {errors.methods}
            </p>
          )}
        </fieldset>

        {/* Best Contact Time */}
        <div className="mb-6">
          <label
            htmlFor="contactTime"
            className="block text-lg font-semibold text-gray-700 mb-2"
          >
            Best Time to Contact <span className="text-red-600">*</span>
          </label>
          <select
            id="contactTime"
            name="contactTime"
            value={contactTime}
            onChange={handleTimeChange}
            className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors ${
              errors.time ? "border-red-500" : "border-gray-300"
            }`}
            aria-invalid={errors.time ? "true" : "false"}
            aria-describedby={errors.time ? "contactTime-error" : undefined}
            required
          >
            <option value="" disabled>
              Select a time
            </option>
            <option value="morning">Morning (8AM - 12PM)</option>
            <option value="afternoon">Afternoon (12PM - 4PM)</option>
            <option value="evening">Evening (4PM - 8PM)</option>
          </select>
          {errors.time && (
            <p
              id="contactTime-error"
              className="mt-2 text-sm text-red-600"
              role="alert"
            >
              {errors.time}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-lg shadow-md transition-colors focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Save Preferences
        </button>
      </form>
    </section>
  );
};

export default PatientContactPreferences;
