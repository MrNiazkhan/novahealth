"use client";

import React from "react";
import { motion } from "framer-motion";

const steps = [
  {
    title: "Stay Calm",
    description:
      "Take deep breaths to maintain calmness and think clearly before acting.",
  },
  {
    title: "Call Emergency Services",
    description:
      "Dial the emergency number immediately to get professional help.",
  },
  {
    title: "Provide Details",
    description:
      "Clearly describe the situation, location, and any injuries or dangers.",
  },
  {
    title: "Assist if Safe",
    description:
      "Offer help within your abilities without putting yourself at risk.",
  },
  {
    title: "Follow Instructions",
    description:
      "Listen carefully and follow all guidance from emergency responders.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const stepVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const EmergencySteps = () => {
  return (
    <section
      aria-label="Emergency Steps"
      className="bg-white text-black py-12 px-6 sm:px-12 md:px-20 lg:px-32 my-[-30px]"
    >
      <div className="max-w-5xl mx-auto">
        <motion.h2
          className="text-3xl sm:text-4xl font-extrabold text-blue-700 mb-10 leading-tight text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Steps to Take in an Emergency
        </motion.h2>

        <motion.ol
          className="space-y-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          {steps.map((step, index) => (
            <motion.li
              key={index}
              className="flex items-start gap-6"
              aria-label={`Step ${index + 1}: ${step.title}`}
              variants={stepVariants}
            >
              <div className="flex-shrink-0">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-700 text-white font-bold text-lg select-none">
                  {index + 1}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-black mb-1">
                  {step.title}
                </h3>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  {step.description}
                </p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
};

export default EmergencySteps;
