"use client";

import React, { useState, useEffect } from "react";

const initialMedications = [
  {
    id: 1,
    name: "Atorvastatin",
    dosage: "20 mg",
    frequency: "Once daily",
    prescribedBy: "Dr. Emily Clark",
    startDate: "2024-06-01",
    notes: "Take with food",
  },
  {
    id: 2,
    name: "Metformin",
    dosage: "500 mg",
    frequency: "Twice daily",
    prescribedBy: "Dr. John Smith",
    startDate: "2023-11-15",
    notes: "",
  },
];

const PatientMedications = () => {
  const [medications, setMedications] = useState(initialMedications);
  const [formData, setFormData] = useState({
    name: "",
    dosage: "",
    frequency: "",
    prescribedBy: "",
    startDate: "",
    notes: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Validate form
  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Medication name is required";
    if (!formData.dosage.trim()) errors.dosage = "Dosage is required";
    if (!formData.frequency.trim()) errors.frequency = "Frequency is required";
    if (!formData.prescribedBy.trim()) errors.prescribedBy = "Prescriber is required";
    if (!formData.startDate) errors.startDate = "Start date is required";
    return errors;
  };

  const resetForm = () => {
    setFormData({
      name: "",
      dosage: "",
      frequency: "",
      prescribedBy: "",
      startDate: "",
      notes: "",
    });
    setFormErrors({});
    setEditingId(null);
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
    const errors = validate();
    if (Object.keys(errors).length) {
      setFormErrors(errors);
      return;
    }

    setSubmitting(true);

    await new Promise((res) => setTimeout(res, 1000)); // simulate delay

    if (editingId !== null) {
      // Update medication
      setMedications((prev) =>
        prev.map((med) =>
          med.id === editingId ? { ...formData, id: editingId } : med
        )
      );
    } else {
      // Add new medication
      setMedications((prev) => [
        ...prev,
        { ...formData, id: prev.length ? prev[prev.length - 1].id + 1 : 1 },
      ]);
    }
    resetForm();
    setSubmitting(false);
  };

  const handleEdit = (id) => {
    const med = medications.find((m) => m.id === id);
    if (med) {
      setFormData({ ...med });
      setEditingId(id);
      setFormErrors({});
    }
  };

  const handleDelete = (id) => {
    if (
      window.confirm(
        "Are you sure you want to remove this medication from your list?"
      )
    ) {
      setMedications((prev) => prev.filter((m) => m.id !== id));
      if (editingId === id) resetForm();
    }
  };

  return (
    <section className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-3xl font-extrabold text-blue-700 mb-8 text-center">
        Current Medications
      </h2>

      {/* Medications List */}
      {medications.length === 0 ? (
        <p className="text-center text-gray-600 mb-10">
          No medications added yet.
        </p>
      ) : (
        <div className="overflow-x-auto mb-12">
          <table className="w-full border-collapse text-left min-w-[600px]">
            <thead>
              <tr className="bg-blue-100 text-blue-800 font-semibold">
                <th className="p-3 border border-blue-200 rounded-tl-lg">Medication</th>
                <th className="p-3 border border-blue-200">Dosage</th>
                <th className="p-3 border border-blue-200">Frequency</th>
                <th className="p-3 border border-blue-200">Prescribed By</th>
                <th className="p-3 border border-blue-200">Start Date</th>
                <th className="p-3 border border-blue-200">Notes</th>
                <th className="p-3 border border-blue-200 rounded-tr-lg text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {medications.map(
                ({
                  id,
                  name,
                  dosage,
                  frequency,
                  prescribedBy,
                  startDate,
                  notes,
                }) => (
                  <tr
                    key={id}
                    className="even:bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <td className="p-3 border border-blue-200">{name}</td>
                    <td className="p-3 border border-blue-200">{dosage}</td>
                    <td className="p-3 border border-blue-200">{frequency}</td>
                    <td className="p-3 border border-blue-200">{prescribedBy}</td>
                    <td className="p-3 border border-blue-200">{startDate}</td>
                    <td className="p-3 border border-blue-200 whitespace-pre-wrap">
                      {notes || "-"}
                    </td>
                    <td className="p-3 border border-blue-200 text-center space-x-2">
                      <button
                        onClick={() => handleEdit(id)}
                        aria-label={`Edit medication ${name}`}
                        className="text-blue-600 hover:text-blue-800 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
                        type="button"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(id)}
                        aria-label={`Delete medication ${name}`}
                        className="text-red-600 hover:text-red-800 font-semibold focus:outline-none focus:ring-2 focus:ring-red-400 rounded"
                        type="button"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Add/Edit Medication Form */}
      <div className="border-t border-gray-300 pt-8 max-w-3xl mx-auto">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
          {editingId !== null ? "Edit Medication" : "Add New Medication"}
        </h3>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6"
        >
          <div>
            <label
              htmlFor="name"
              className="block font-semibold mb-2 text-gray-900"
            >
              Medication Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={submitting}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-gray-900 ${
                formErrors.name ? "border-red-500" : "border-gray-300"
              }`}
              aria-invalid={!!formErrors.name}
              aria-describedby={formErrors.name ? "name-error" : undefined}
              placeholder="Atorvastatin"
              required
            />
            {formErrors.name && (
              <p
                className="text-red-600 mt-1 text-sm font-medium"
                role="alert"
                id="name-error"
              >
                {formErrors.name}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="dosage"
              className="block font-semibold mb-2 text-gray-900"
            >
              Dosage <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="dosage"
              name="dosage"
              value={formData.dosage}
              onChange={handleChange}
              disabled={submitting}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-gray-900 ${
                formErrors.dosage ? "border-red-500" : "border-gray-300"
              }`}
              aria-invalid={!!formErrors.dosage}
              aria-describedby={formErrors.dosage ? "dosage-error" : undefined}
              placeholder="20 mg"
              required
            />
            {formErrors.dosage && (
              <p
                className="text-red-600 mt-1 text-sm font-medium"
                role="alert"
                id="dosage-error"
              >
                {formErrors.dosage}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="frequency"
              className="block font-semibold mb-2 text-gray-900"
            >
              Frequency <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="frequency"
              name="frequency"
              value={formData.frequency}
              onChange={handleChange}
              disabled={submitting}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-gray-900 ${
                formErrors.frequency ? "border-red-500" : "border-gray-300"
              }`}
              aria-invalid={!!formErrors.frequency}
              aria-describedby={formErrors.frequency ? "frequency-error" : undefined}
              placeholder="Once daily"
              required
            />
            {formErrors.frequency && (
              <p
                className="text-red-600 mt-1 text-sm font-medium"
                role="alert"
                id="frequency-error"
              >
                {formErrors.frequency}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="prescribedBy"
              className="block font-semibold mb-2 text-gray-900"
            >
              Prescribed By <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="prescribedBy"
              name="prescribedBy"
              value={formData.prescribedBy}
              onChange={handleChange}
              disabled={submitting}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-gray-900 ${
                formErrors.prescribedBy ? "border-red-500" : "border-gray-300"
              }`}
              aria-invalid={!!formErrors.prescribedBy}
              aria-describedby={
                formErrors.prescribedBy ? "prescribedBy-error" : undefined
              }
              placeholder="Dr. John Doe"
              required
            />
            {formErrors.prescribedBy && (
              <p
                className="text-red-600 mt-1 text-sm font-medium"
                role="alert"
                id="prescribedBy-error"
              >
                {formErrors.prescribedBy}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="startDate"
              className="block font-semibold mb-2 text-gray-900"
            >
              Start Date <span className="text-red-600">*</span>
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              disabled={submitting}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-gray-900 ${
                formErrors.startDate ? "border-red-500" : "border-gray-300"
              }`}
              aria-invalid={!!formErrors.startDate}
              aria-describedby={formErrors.startDate ? "startDate-error" : undefined}
              required
              max={new Date().toISOString().split("T")[0]}
            />
            {formErrors.startDate && (
              <p
                className="text-red-600 mt-1 text-sm font-medium"
                role="alert"
                id="startDate-error"
              >
                {formErrors.startDate}
              </p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="notes"
              className="block font-semibold mb-2 text-gray-900"
            >
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              disabled={submitting}
              rows={3}
              placeholder="Any additional info or instructions"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-gray-900 resize-none"
            />
          </div>

          <div className="sm:col-span-2 text-center mt-4">
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
                  Saving...
                </>
              ) : editingId !== null ? (
                "Update Medication"
              ) : (
                "Add Medication"
              )}
            </button>
            {editingId !== null && (
              <button
                type="button"
                onClick={resetForm}
                className="ml-4 py-3 px-6 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default PatientMedications;
