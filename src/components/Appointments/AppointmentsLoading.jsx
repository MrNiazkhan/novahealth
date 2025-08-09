"use client";

import React from "react";
import { motion } from "framer-motion";

const AppointmentsLoading = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="max-w-5xl mx-auto p-6 sm:p-10 lg:p-20 bg-white rounded-lg "
      aria-label="Loading appointments"
    >
      <div className="space-y-6 animate-pulse">
        {/* Title placeholder */}
        <div className="h-12 w-3/5 bg-gray-300 rounded-md mx-auto mb-10"></div>

        {/* Loading FAQ items placeholders */}
        {[1, 2, 3, 4].map((_, idx) => (
          <div
            key={idx}
            className="border border-gray-200 rounded-xl p-5 bg-gray-50"
          >
            {/* Question placeholder */}
            <div className="h-6 bg-gray-300 rounded w-4/5 mb-4"></div>
            {/* Answer placeholder */}
            <div className="h-4 bg-gray-200 rounded w-full max-w-lg"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 mt-2"></div>
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default AppointmentsLoading;
