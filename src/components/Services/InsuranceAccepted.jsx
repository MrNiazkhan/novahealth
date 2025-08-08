"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCheckCircle,
  FaHospitalUser,
  FaShieldAlt,
  FaHeartbeat,
  FaUserMd,
  FaClinicMedical,
  FaHandsHelping,
  FaSearch,
} from "react-icons/fa";

const insurancesData = [
  {
    id: 1,
    icon: <FaShieldAlt className="text-blue-600" size={28} />,
    name: "Blue Cross Blue Shield",
    description: "Comprehensive coverage accepted at our facilities.",
  },
  {
    id: 2,
    icon: <FaHospitalUser className="text-blue-600" size={28} />,
    name: "UnitedHealthcare",
    description: "Wide network access and streamlined claims.",
  },
  {
    id: 3,
    icon: <FaHeartbeat className="text-blue-600" size={28} />,
    name: "Aetna",
    description: "Trusted for quality care and support.",
  },
  {
    id: 4,
    icon: <FaUserMd className="text-blue-600" size={28} />,
    name: "Cigna",
    description: "Extensive coverage plans and benefits.",
  },
  {
    id: 5,
    icon: <FaClinicMedical className="text-blue-600" size={28} />,
    name: "Humana",
    description: "Dedicated to your wellness and health needs.",
  },
  {
    id: 6,
    icon: <FaHandsHelping className="text-blue-600" size={28} />,
    name: "Kaiser Permanente",
    description: "Integrated care with a patient-first approach.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ease: "easeOut", duration: 0.5 },
  },
  hover: {
    scale: 1.05,
    boxShadow:
      "0 10px 15px -3px rgba(59, 130, 246, 0.4), 0 4px 6px -2px rgba(59, 130, 246, 0.1)",
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

const InsuranceAccepted = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputRef = useRef(null);

  // Filter insurances based on search term
  const filteredInsurances = insurancesData.filter(({ name, description }) =>
    name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Accessibility: focus search input on mount
  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  return (
    <section
      role="region"
      aria-labelledby="insurance-heading"
      className="bg-white py-20 px-6 md:px-12 my-[-30px]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2
            id="insurance-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900"
          >
            Insurance{" "}
            <span className="text-blue-700 underline decoration-blue-300 decoration-4 underline-offset-4">
              Accepted
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-600 font-light leading-relaxed">
            We accept a broad range of insurance providers to make your care
            seamless and worry-free.
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-md mx-auto mb-12">
          <label htmlFor="insurance-search" className="sr-only">
            Search insurance providers
          </label>
          <FaSearch
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            size={18}
            aria-hidden="true"
          />
          <input
            id="insurance-search"
            type="search"
            role="search"
            aria-label="Search insurance providers"
            placeholder="Search insurance providers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            ref={searchInputRef}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-900 placeholder-gray-400 transition"
          />
        </div>

        {/* Insurance Grid */}
        <motion.div
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={searchTerm} // re-animate on search change
        >
          <AnimatePresence>
            {filteredInsurances.length ? (
              filteredInsurances.map(({ id, icon, name, description }) => (
                <motion.div
                  key={id}
                  variants={itemVariants}
                  whileHover="hover"
                  tabIndex={0}
                  role="article"
                  aria-label={`${name} insurance provider`}
                  className="bg-gray-50 hover:bg-blue-50 transition-colors duration-300 rounded-xl p-6 shadow-md flex flex-col items-center text-center focus:outline-none focus:ring-4 focus:ring-blue-400 cursor-pointer"
                  onKeyDown={(e) => {
                    // Allow keyboard users to trigger hover effects
                    if (e.key === "Enter" || e.key === " ") {
                      e.currentTarget.classList.toggle("hover:bg-blue-50");
                    }
                  }}
                >
                  <div className="mb-4" aria-hidden="true">
                    {icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{name}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
                  <div className="mt-4" aria-hidden="true">
                    <FaCheckCircle
                      className="text-green-500 mx-auto"
                      size={24}
                      aria-label="Accepted"
                    />
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.p
                className="text-center col-span-full text-gray-500 italic select-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                No insurance providers match your search.
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default InsuranceAccepted;
