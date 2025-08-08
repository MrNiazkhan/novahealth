"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiMinus } from "react-icons/fi";

const faqData = [
  {
    question: "Who are the key members of your team?",
    answer:
      "Our team is composed of highly skilled professionals including designers, developers, marketers, and project managers, each bringing years of industry expertise.",
  },
  {
    question: "What makes your team unique?",
    answer:
      "We combine creativity, innovation, and technical excellence to deliver solutions tailored specifically to client needs while maintaining a collaborative spirit.",
  },
  {
    question: "Do you work with international clients?",
    answer:
      "Yes, our team has worked with clients from over 20 countries, ensuring we adapt to diverse cultural and business environments.",
  },
  {
    question: "How can I join your team?",
    answer:
      "We’re always looking for passionate talent! You can apply via our Careers page or contact us directly with your portfolio and resume.",
  },
  {
    question: "What industries do you specialize in?",
    answer:
      "We have successfully delivered projects in e-commerce, healthcare, finance, education, and entertainment industries.",
  },
];

const OurteamFAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      aria-label="Our Team Frequently Asked Questions"
      className="relative max-w-5xl mx-auto px-4 sm:px-8 py-12 my-[-30px] mb-0"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gray-50  rounded-3xl shadow-xl"></div>

      {/* Content */}
      <div className="relative z-10">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-center text-blue-800 mb-10">
          Our Team FAQs
        </h2>

        <ul className="space-y-4">
          {faqData.map(({ question, answer }, index) => {
            const isOpen = openIndex === index;
            return (
              <li
                key={index}
                className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  id={`faq-question-${index}`}
                  className="w-full flex justify-between items-center px-6 py-4 text-left"
                >
                  <span className="text-lg sm:text-xl font-semibold text-gray-800">
                    {question}
                  </span>
                  {isOpen ? (
                    <FiMinus className="text-blue-700 text-2xl" />
                  ) : (
                    <FiPlus className="text-blue-700 text-2xl" />
                  )}
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      role="region"
                      aria-labelledby={`faq-question-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4 text-gray-600 text-base leading-relaxed">
                        {answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default OurteamFAQs;
