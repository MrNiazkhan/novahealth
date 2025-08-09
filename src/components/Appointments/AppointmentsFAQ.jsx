"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.15, ease: "easeOut", duration: 0.6 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const faqs = [
  {
    question: "What services does NovaHealth offer?",
    answer:
      "NovaHealth provides general checkups, diagnostics, emergency care, specialist consultations, and online appointments with certified doctors.",
  },
  {
    question: "Are your doctors certified and experienced?",
    answer:
      "Yes, all NovaHealth doctors are board-certified with proven clinical experience and a strong commitment to patient care.",
  },
  {
    question: "Is online appointment booking available?",
    answer:
      "Yes, you can easily book appointments online through our website or mobile app. Same-day options are also available for urgent needs.",
  },
  {
    question: "Do you accept insurance plans?",
    answer:
      "We accept a wide range of insurance providers. Please visit our insurance info page or contact us directly for more details.",
  },
];

const AppointmentsFAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      aria-label="Frequently Asked Questions"
      className="bg-white py-20 px-6 sm:px-10 lg:px-20 my-[-50px]"
    >
      <motion.div
        className="max-w-5xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <motion.h2
          className="text-4xl sm:text-5xl font-extrabold text-center text-gray-900 mb-12 leading-tight"
          variants={itemVariants}
        >
          Frequently Asked <span className="text-blue-700">Questions</span>
        </motion.h2>

        <div className="space-y-6">
          {faqs.map((faq, index) => {
            const isOpen = index === openIndex;
            return (
              <motion.div
                key={index}
                className="bg-gray-50 hover:bg-gray-100 transition rounded-xl shadow-md"
                variants={itemVariants}
                layout
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-content-${index}`}
                  id={`faq-header-${index}`}
                  onClick={() => toggleOpen(index)}
                  className="w-full flex items-center justify-between px-6 py-5 text-base sm:text-lg font-medium text-gray-800 hover:text-blue-700 transition select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-xl"
                >
                  {faq.question}
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="text-gray-500"
                    aria-hidden="true"
                  >
                    <FaChevronDown />
                  </motion.span>
                </button>

                <motion.div
                  id={`faq-content-${index}`}
                  role="region"
                  aria-labelledby={`faq-header-${index}`}
                  initial={false}
                  animate={{
                    opacity: isOpen ? 1 : 0,
                    height: isOpen ? "auto" : 0,
                    marginTop: isOpen ? 8 : 0,
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  style={{ overflow: "hidden" }}
                  className="px-6 pb-5 text-gray-700 text-sm sm:text-base font-light leading-relaxed select-text"
                >
                  {faq.answer}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default AppointmentsFAQ;
