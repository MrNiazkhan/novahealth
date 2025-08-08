"use client";

import React from "react";
import { FaHandsHelping, FaUsers, FaLightbulb, FaStar } from "react-icons/fa";

const values = [
  {
    icon: <FaHandsHelping className="text-blue-700 w-10 h-10" aria-hidden="true" />,
    title: "Passion",
    description:
      "Our team is driven by a deep passion to make a positive impact every day.",
  },
  {
    icon: <FaUsers className="text-blue-700 w-10 h-10" aria-hidden="true" />,
    title: "Collaboration",
    description:
      "We believe in teamwork and open communication to achieve outstanding results.",
  },
  {
    icon: <FaLightbulb className="text-blue-700 w-10 h-10" aria-hidden="true" />,
    title: "Innovation",
    description:
      "Constantly pushing boundaries to bring fresh ideas and creative solutions.",
  },
  {
    icon: <FaStar className="text-blue-700 w-10 h-10" aria-hidden="true" />,
    title: "Excellence",
    description:
      "Committed to delivering the highest quality work with integrity and care.",
  },
];

const OurteamValues = () => {
  return (
    <section
      aria-label="Our Team Values"
      className="bg-white py-20 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto " 
    >
      <h2 className="text-4xl font-extrabold text-blue-700 mb-12 text-center">
        What Drives Us
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
        {values.map(({ icon, title, description }, idx) => (
          <article
            key={idx}
            tabIndex={0}
            role="group"
            aria-label={`${title} value`}
            className="flex flex-col items-center text-center p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition"
          >
            <div className="mb-5">{icon}</div>
            <h3 className="text-xl font-semibold text-black mb-2">{title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default OurteamValues;
