"use client";

import React from "react";

const insuranceData = {
  provider: "HealthFirst Insurance",
  policyNumber: "HF-123456789",
  groupNumber: "GRP-987654",
  planType: "Preferred Provider Organization (PPO)",
  coverageStart: "2023-01-01",
  coverageEnd: "2024-12-31",
  phone: "+1 (800) 555-1234",
  email: "support@healthfirst.com",
  claimsAddress: `123 Insurance Blvd.
Suite 400
New York, NY 10001`,
};

const PatientInsuranceInfo = () => {
  return (
    <section
      aria-labelledby="insurance-info-title"
      className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md my-10"
    >
      <h2
        id="insurance-info-title"
        className="text-3xl font-extrabold text-blue-700 mb-6 text-center"
      >
        Insurance Information
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Left Column */}
        <div>
          <dl>
            <div className="mb-4">
              <dt className="font-semibold text-gray-700">Provider</dt>
              <dd className="mt-1 text-gray-900">{insuranceData.provider}</dd>
            </div>
            <div className="mb-4">
              <dt className="font-semibold text-gray-700">Policy Number</dt>
              <dd className="mt-1 text-gray-900">{insuranceData.policyNumber}</dd>
            </div>
            <div className="mb-4">
              <dt className="font-semibold text-gray-700">Group Number</dt>
              <dd className="mt-1 text-gray-900">{insuranceData.groupNumber}</dd>
            </div>
            <div className="mb-4">
              <dt className="font-semibold text-gray-700">Plan Type</dt>
              <dd className="mt-1 text-gray-900">{insuranceData.planType}</dd>
            </div>
          </dl>
        </div>

        {/* Right Column */}
        <div>
          <dl>
            <div className="mb-4">
              <dt className="font-semibold text-gray-700">Coverage Period</dt>
              <dd className="mt-1 text-gray-900">
                {new Date(insuranceData.coverageStart).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}{" "}
                -{" "}
                {new Date(insuranceData.coverageEnd).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </dd>
            </div>
            <div className="mb-4">
              <dt className="font-semibold text-gray-700">Customer Service Phone</dt>
              <dd className="mt-1 text-blue-700 underline">
                <a href={`tel:${insuranceData.phone.replace(/[^\d+]/g, "")}`}>
                  {insuranceData.phone}
                </a>
              </dd>
            </div>
            <div className="mb-4">
              <dt className="font-semibold text-gray-700">Customer Service Email</dt>
              <dd className="mt-1 text-blue-700 underline">
                <a href={`mailto:${insuranceData.email}`}>{insuranceData.email}</a>
              </dd>
            </div>
            <div className="mb-4">
              <dt className="font-semibold text-gray-700">Claims Address</dt>
              <dd
                className="mt-1 text-gray-900 whitespace-pre-line max-w-sm"
                style={{ whiteSpace: "pre-line" }}
              >
                {insuranceData.claimsAddress}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
};

export default PatientInsuranceInfo;
