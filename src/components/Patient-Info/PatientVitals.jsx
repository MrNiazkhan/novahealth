"use client";

import React, { useState } from "react";

const initialVitals = [
  {
    id: 1,
    type: "Blood Pressure",
    unit: "mmHg",
    values: [
      { date: "2024-08-01", value: "120/80" }, // Normal
      { date: "2024-07-25", value: "130/85" }, // Slightly elevated
      { date: "2024-07-18", value: "140/90" }, // High
    ],
    normalRange: "90/60 - 120/80",
  },
  {
    id: 2,
    type: "Heart Rate",
    unit: "bpm",
    values: [
      { date: "2024-08-01", value: 72 },
      { date: "2024-07-25", value: 80 },
      { date: "2024-07-18", value: 95 },
    ],
    normalRange: "60 - 100",
  },
  {
    id: 3,
    type: "Body Temperature",
    unit: "°C",
    values: [
      { date: "2024-08-01", value: 36.6 },
      { date: "2024-07-25", value: 37.2 },
      { date: "2024-07-18", value: 38.5 }, // Fever
    ],
    normalRange: "36.1 - 37.2",
  },
  {
    id: 4,
    type: "Respiratory Rate",
    unit: "breaths/min",
    values: [
      { date: "2024-08-01", value: 16 },
      { date: "2024-07-25", value: 18 },
      { date: "2024-07-18", value: 22 }, // Slightly elevated
    ],
    normalRange: "12 - 20",
  },
  {
    id: 5,
    type: "Oxygen Saturation",
    unit: "%",
    values: [
      { date: "2024-08-01", value: 98 },
      { date: "2024-07-25", value: 95 },
      { date: "2024-07-18", value: 92 }, // Low
    ],
    normalRange: "95 - 100",
  },
  {
    id: 6,
    type: "Blood Glucose",
    unit: "mg/dL",
    values: [
      { date: "2024-08-01", value: 95 },
      { date: "2024-07-25", value: 105 }, // Slightly elevated
      { date: "2024-07-18", value: 140 }, // High
    ],
    normalRange: "70 - 110",
  },
];

// Helper function to determine if value is abnormal
// For simplicity, numeric values checked with ranges;
// blood pressure string checked separately.
const isAbnormal = (type, value) => {
  if (type === "Blood Pressure") {
    // value format: "systolic/diastolic"
    const [sys, dia] = value.split("/").map(Number);
    if (isNaN(sys) || isNaN(dia)) return false;
    if (sys > 130 || dia > 85) return true; // threshold for high BP
    if (sys < 90 || dia < 60) return true; // low BP
    return false;
  }

  if (typeof value === "number") {
    switch (type) {
      case "Heart Rate":
        return value < 60 || value > 100;
      case "Body Temperature":
        return value < 36.1 || value > 37.2;
      case "Respiratory Rate":
        return value < 12 || value > 20;
      case "Oxygen Saturation":
        return value < 95;
      default:
        return false;
    }
  }
  return false;
};

const PatientVitals = () => {
  const [vitals] = useState(initialVitals);

  return (
    <section className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-3xl font-extrabold text-blue-700 mb-8 text-center">
        Patient Vital Signs
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {vitals.map(({ id, type, unit, values, normalRange }) => (
          <div
            key={id}
            className="border border-gray-300 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow"
            aria-label={`${type} vital sign`}
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{type}</h3>
            <p className="text-sm text-gray-600 mb-3">
              Normal Range: <span className="font-medium">{normalRange} {unit}</span>
            </p>

            <div className="space-y-3">
              {values.map(({ date, value }, idx) => {
                const abnormal = isAbnormal(type, value);
                return (
                  <div
                    key={idx}
                    className="flex justify-between items-center"
                    title={`Recorded on ${new Date(date).toLocaleDateString()}`}
                  >
                    <time className="text-gray-500 text-sm min-w-[90px]">
                      {new Date(date).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                    <span
                      className={`font-semibold text-lg ${
                        abnormal ? "text-red-600" : "text-gray-900"
                      }`}
                      aria-label={`${type} value: ${value} ${unit} ${
                        abnormal ? "(Abnormal)" : ""
                      }`}
                    >
                      {value} {unit}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PatientVitals;
