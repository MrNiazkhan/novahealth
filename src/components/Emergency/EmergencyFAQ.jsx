"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const faqData = [
  {
    question: "What should I do if I witness an emergency?",
    answer:
      "Stay calm, assess the situation carefully, call emergency services immediately, and provide clear details about the location and nature of the emergency.",
  },
  {
    question: "When should I call emergency services?",
    answer:
      "Call emergency services whenever there is an immediate threat to life, health, property, or environment requiring urgent assistance.",
  },
  {
    question: "How do I provide accurate information to responders?",
    answer:
      "Give your exact location, describe the emergency clearly, mention the number of people involved and any injuries, and stay on the line until help arrives.",
  },
  {
    question: "Can I help before emergency responders arrive?",
    answer:
      "Only if it is safe to do so. Avoid putting yourself or others at risk. Follow instructions from emergency personnel once they arrive.",
  },
  {
    question: "What information should I have ready when calling emergency services?",
    answer:
      "Your location, the nature of the emergency, number of people involved, any immediate dangers, and your contact information if asked.",
  },
];

const EmergencyFAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      aria-label="Emergency Frequently Asked Questions"
      className="max-w-4xl mx-auto p-6 sm:p-10 bg-white rounded-xl shadow-lg text-black my-5"
    >
      <h2 className="text-3xl font-extrabold text-blue-700 mb-8 text-center">
        Emergency FAQ
      </h2>

      <ul className="space-y-4">
        {faqData.map(({ question, answer }, index) => (
          <li
            key={index}
            className="border border-gray-300 rounded-lg overflow-hidden"
          >
            <button
              type="button"
              onClick={() => toggleFAQ(index)}
              aria-expanded={openIndex === index}
              aria-controls={`faq-answer-${index}`}
              id={`faq-question-${index}`}
              className="w-full flex justify-between items-center px-5 py-4 text-left text-lg font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              {question}
              <motion.svg
                className={`w-6 h-6 text-blue-700 flex-shrink-0`}
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </motion.svg>
            </button>

            <motion.div
              id={`faq-answer-${index}`}
              role="region"
              aria-labelledby={`faq-question-${index}`}
              animate={{
                height: openIndex === index ? "auto" : 0,
                opacity: openIndex === index ? 1 : 0,
                marginTop: openIndex === index ? "0.5rem" : "0rem",
                paddingLeft: openIndex === index ? "1.25rem" : "0rem",
                paddingRight: openIndex === index ? "1.25rem" : "0rem",
                paddingBottom: openIndex === index ? "1rem" : "0rem",
              }}
              initial={false}
              style={{ overflow: "hidden" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="text-gray-700 text-base leading-relaxed"
            >
              {answer}
            </motion.div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default EmergencyFAQ;
