"use client";

import React from "react";
import { motion } from "framer-motion";

const timelineEvents = [
  {
    year: "2005",
    title: "Foundation",
    description:
      "Our organization was founded with the mission to revolutionize healthcare services and bring innovation to patient care.",
  },
  {
    year: "2010",
    title: "First Milestone",
    description:
      "Reached 10,000 patients served and opened our first satellite clinic to extend our reach.",
  },
  {
    year: "2015",
    title: "Technology Integration",
    description:
      "Introduced advanced telemedicine solutions to connect doctors and patients remotely.",
  },
  {
    year: "2020",
    title: "Global Expansion",
    description:
      "Expanded operations internationally, partnering with global healthcare leaders.",
  },
  {
    year: "2023",
    title: "Sustainability Initiatives",
    description:
      "Launched programs focused on sustainable healthcare practices and community wellness.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.3,
    },
  },
};

const eventVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const AboutHistory = () => {
  return (
    <section
      aria-label="Our History Timeline"
      className="bg-gray-50 py-20 px-6 sm:px-12 max-w-7xl mx-auto my-[-50px] mb-[-80px]"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
          Our <span className="text-blue-600">History</span>
        </h2>
        <p className="mt-4 text-gray-600 text-lg sm:text-xl font-light">
          A journey of innovation, growth, and commitment to quality care.
        </p>
      </motion.div>

      {/* Timeline Container */}
      <motion.div
        className="relative max-w-4xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        {/* Vertical line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 bg-blue-200 rounded h-full" />

        {/* Timeline events */}
        <ul className="space-y-16">
          {timelineEvents.map(({ year, title, description }, index) => {
            const isLeft = index % 2 === 0;

            return (
              <motion.li
                key={year}
                className={`relative flex flex-col items-center sm:flex-row ${
                  isLeft
                    ? "sm:justify-start sm:pr-12"
                    : "sm:justify-end sm:pl-12"
                }`}
                variants={eventVariants}
              >
                {/* Connector dot */}
                <span
                  className="absolute left-1/2 top-4 sm:top-6 -translate-x-1/2 w-5 h-5 bg-blue-600 rounded-full border-4 border-white shadow-lg"
                  aria-hidden="true"
                />

                {/* Content box */}
                <div
                  className={`bg-white rounded-xl shadow-lg p-6 max-w-[320px] w-full
                    ${
                      isLeft
                        ? "sm:mr-auto sm:text-left"
                        : "sm:ml-auto sm:text-right"
                    }`}
                >
                  <p className="text-sm text-blue-600 font-semibold">{year}</p>
                  <h3 className="mt-1 text-xl font-semibold text-gray-900">
                    {title}
                  </h3>
                  <p className="mt-2 text-gray-600 text-sm sm:text-base leading-relaxed">
                    {description}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </motion.div>
    </section>
  );
};

export default AboutHistory;
