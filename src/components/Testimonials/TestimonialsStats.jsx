"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaStar, FaUsers, FaCommentDots, FaClock } from "react-icons/fa";

const stats = [
  {
    id: 1,
    label: "Testimonials",
    value: 1250,
    icon: <FaCommentDots className="text-blue-600 w-10 h-10" />,
  },
  {
    id: 2,
    label: "Average Rating",
    value: "4.8 / 5",
    icon: <FaStar className="text-yellow-400 w-10 h-10" />,
  },
  {
    id: 3,
    label: "Happy Customers",
    value: "980+",
    icon: <FaUsers className="text-green-500 w-10 h-10" />,
  },
  {
    id: 4,
    label: "Years Experience",
    value: 12,
    icon: <FaClock className="text-purple-600 w-10 h-10" />,
  },
];

const TestimonialsStats = () => {
  return (
    <section
      aria-label="Testimonials statistics"
      className="bg-white py-16 px-5 sm:px-8 md:px-12"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-center">
        {stats.map(({ id, label, value, icon }, index) => (
          <motion.div
            key={id}
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.6, ease: "easeOut" }}
          >
            <div className="mb-4">{icon}</div>
            <p className="text-4xl font-extrabold text-black">{value}</p>
            <p className="mt-2 text-lg font-medium text-gray-600">{label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsStats;
