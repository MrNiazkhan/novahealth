"use client";

import React, { useState } from "react";

const initialAllergies = [
  {
    id: 1,
    allergen: "Peanuts",
    reaction: "Hives, swelling",
    severity: "Severe",
    notes: "Carry epinephrine auto-injector",
  },
  {
    id: 2,
    allergen: "Penicillin",
    reaction: "Rash",
    severity: "Moderate",
    notes: "",
  },
];

const severityOptions = ["Mild", "Moderate", "Severe"];

const PatientAllergies = () => {
  const [allergies, setAllergies] = useState(initialAllergies);
  const [formData, setFormData] = useState({
    allergen: "",
    reaction: "",
    severity: "",
    notes: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Validation
  const validate = () => {
    const errors = {};
    if (!formData.allergen.trim()) errors.allergen = "Allergen is required";
    if (!formData.reaction.trim()) errors.reaction = "Reaction is required";
    if (!formData.severity) errors.severity = "Severity is required";
    return errors;
  };

  const resetForm = () => {
    setFormData({
      allergen: "",
      reaction: "",
      severity: "",
      notes: "",
    });
    setFormErrors({});
    setEditingId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (formErrors[name]) {
      setFormErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
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
    await new Promise((res) => setTimeout(res, 800)); // simulate delay

    if (editingId !== null) {
      setAllergies((prev) =>
        prev.map((a) => (a.id === editingId ? { ...formData, id: editingId } : a))
      );
    } else {
      setAllergies((prev) => [
        ...prev,
        { ...formData, id: prev.length ? prev[prev.length - 1].id + 1 : 1 },
      ]);
    }

    resetForm();
    setSubmitting(false);
  };

  const handleEdit = (id) => {
    const allergy = allergies.find((a) => a.id === id);
    if (allergy) {
      setFormData({ ...allergy });
      setEditingId(id);
      setFormErrors({});
    }
  };

  const handleDelete = (id) => {
    if (
      window.confirm("Are you sure you want to delete this allergy record?")
    ) {
      setAllergies((prev) => prev.filter((a) => a.id !== id));
      if (editingId === id) resetForm();
    }
  };

  return (
    <section className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-3xl font-extrabold text-blue-700 mb-8 text-center">
        Allergy Information
      </h2>

      {/* Allergy List */}
      {allergies.length === 0 ? (
        <p className="text-center text-gray-600 mb-12">No allergies recorded.</p>
      ) : (
        <div className="overflow-x-auto mb-12">
          <table className="min-w-[600px] w-full border-collapse text-left">
            <thead>
              <tr className="bg-blue-100 text-blue-800 font-semibold">
                <th className="p-3 border border-blue-200 rounded-tl-lg">Allergen</th>
                <th className="p-3 border border-blue-200">Reaction</th>
                <th className="p-3 border border-blue-200">Severity</th>
                <th className="p-3 border border-blue-200">Notes</th>
                <th className="p-3 border border-blue-200 rounded-tr-lg text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {allergies.map(({ id, allergen, reaction, severity, notes }) => (
                <tr
                  key={id}
                  className="even:bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <td className="p-3 border border-blue-200">{allergen}</td>
                  <td className="p-3 border border-blue-200 whitespace-pre-wrap">{reaction}</td>
                  <td className="p-3 border border-blue-200">{severity}</td>
                  <td className="p-3 border border-blue-200 whitespace-pre-wrap">
                    {notes || "-"}
                  </td>
                  <td className="p-3 border border-blue-200 text-center space-x-2">
                    <button
                      onClick={() => handleEdit(id)}
                      aria-label={`Edit allergy ${allergen}`}
                      className="text-blue-600 hover:text-blue-800 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
                      type="button"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(id)}
                      aria-label={`Delete allergy ${allergen}`}
                      className="text-red-600 hover:text-red-800 font-semibold focus:outline-none focus:ring-2 focus:ring-red-400 rounded"
                      type="button"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add/Edit Form */}
      <div className="border-t border-gray-300 pt-8 max-w-3xl mx-auto">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
          {editingId !== null ? "Edit Allergy" : "Add New Allergy"}
        </h3>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6"
        >
          <div>
            <label
              htmlFor="allergen"
              className="block font-semibold mb-2 text-gray-900"
            >
              Allergen <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="allergen"
              name="allergen"
              value={formData.allergen}
              onChange={handleChange}
              disabled={submitting}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-gray-900 ${
                formErrors.allergen ? "border-red-500" : "border-gray-300"
              }`}
              aria-invalid={!!formErrors.allergen}
              aria-describedby={formErrors.allergen ? "allergen-error" : undefined}
              placeholder="Peanuts"
              required
            />
            {formErrors.allergen && (
              <p
                className="text-red-600 mt-1 text-sm font-medium"
                role="alert"
                id="allergen-error"
              >
                {formErrors.allergen}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="reaction"
              className="block font-semibold mb-2 text-gray-900"
            >
              Reaction <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="reaction"
              name="reaction"
              value={formData.reaction}
              onChange={handleChange}
              disabled={submitting}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-gray-900 ${
                formErrors.reaction ? "border-red-500" : "border-gray-300"
              }`}
              aria-invalid={!!formErrors.reaction}
              aria-describedby={formErrors.reaction ? "reaction-error" : undefined}
              placeholder="Hives, swelling"
              required
            />
            {formErrors.reaction && (
              <p
                className="text-red-600 mt-1 text-sm font-medium"
                role="alert"
                id="reaction-error"
              >
                {formErrors.reaction}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="severity"
              className="block font-semibold mb-2 text-gray-900"
            >
              Severity <span className="text-red-600">*</span>
            </label>
            <select
              id="severity"
              name="severity"
              value={formData.severity}
              onChange={handleChange}
              disabled={submitting}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-gray-900 ${
                formErrors.severity ? "border-red-500" : "border-gray-300"
              }`}
              aria-invalid={!!formErrors.severity}
              aria-describedby={formErrors.severity ? "severity-error" : undefined}
              required
            >
              <option value="" disabled>
                Select severity
              </option>
              {severityOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            {formErrors.severity && (
              <p
                className="text-red-600 mt-1 text-sm font-medium"
                role="alert"
                id="severity-error"
              >
                {formErrors.severity}
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
              placeholder="Additional information or precautions"
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
                "Update Allergy"
              ) : (
                "Add Allergy"
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

export default PatientAllergies;
