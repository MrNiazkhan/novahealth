"use client";

import React from "react";

const emergencyContacts = [
  {
    id: 1,
    name: "Jane Doe",
    relationship: "Spouse",
    phone: "+1 (555) 123-4567",
    email: "jane.doe@example.com",
  },
  {
    id: 2,
    name: "Michael Smith",
    relationship: "Brother",
    phone: "+1 (555) 987-6543",
    email: "michael.smith@example.com",
  },
  {
    id: 3,
    name: "Emily Johnson",
    relationship: "Friend",
    phone: "+1 (555) 555-7890",
    email: "emily.johnson@example.com",
  },
];

const PatientEmergencyContacts = () => {
  return (
    <section
      aria-labelledby="emergency-contacts-title"
      className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md"
    >
      <h2
        id="emergency-contacts-title"
        className="text-3xl font-extrabold text-blue-700 mb-6 text-center"
      >
        Emergency Contacts
      </h2>

      <ul className="space-y-6">
        {emergencyContacts.map(({ id, name, relationship, phone, email }) => (
          <li
            key={id}
            className="border border-gray-300 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow"
            aria-label={`Emergency contact: ${name}, relationship: ${relationship}`}
          >
            <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Relationship:</span> {relationship}
            </p>
            <p className="text-gray-700 mb-1">
              <span className="font-semibold">Phone:</span>{" "}
              <a
                href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                className="text-blue-700 underline hover:text-blue-800"
              >
                {phone}
              </a>
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Email:</span>{" "}
              <a
                href={`mailto:${email}`}
                className="text-blue-700 underline hover:text-blue-800"
              >
                {email}
              </a>
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PatientEmergencyContacts;
