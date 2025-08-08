"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQ_DATA = [
  {
    id: 1,
    question: "What services do you offer?",
    answer:
      "We provide a wide range of healthcare services including general consultation, diagnostics, vaccinations, and emergency care.",
  },
  {
    id: 2,
    question: "How can I schedule an appointment?",
    answer:
      "You can schedule an appointment by clicking the 'Schedule Appointment' button on our homepage or by contacting us directly via phone or email.",
  },
  {
    id: 3,
    question: "Do you accept insurance?",
    answer:
      "Yes, we accept most major insurance plans. Please contact our billing department for specific insurance questions.",
  },
  {
    id: 4,
    question: "What are your working hours?",
    answer:
      "Our clinic operates Monday to Friday from 8:00 AM to 6:00 PM and Saturdays from 9:00 AM to 1:00 PM.",
  },
  {
    id: 5,
    question: "Can I get prescription refills online?",
    answer:
      "Yes, registered patients can request prescription refills through our patient portal available on our website.",
  },
  {
    id: 6,
    question: "What safety measures are in place for COVID-19?",
    answer:
      "We follow all CDC guidelines including mandatory masks, social distancing, and regular sanitation to ensure patient safety.",
  },
];

const HomeFAQ = () => {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      aria-labelledby="faq-heading"
      className="max-w-4xl mx-auto px-6 sm:px-10 py-16 mb-[-80px]"
    >
      <h2
        id="faq-heading"
        className="text-4xl font-extrabold text-gray-900 text-center mb-12"
      >
        Frequently Asked <span className="text-blue-700">Questions</span>
      </h2>

      <div className="space-y-4">
        {FAQ_DATA.map(({ id, question, answer }) => {
          const isOpen = id === openId;

          return (
            <div
              key={id}
              className="border border-gray-300 rounded-lg overflow-hidden shadow-sm"
            >
              <button
                onClick={() => toggle(id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggle(id);
                  }
                }}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${id}`}
                id={`faq-header-${id}`}
                className="flex items-center justify-between w-full px-6 py-4 text-left text-gray-800 font-semibold text-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              >
                <span>{question}</span>
                <motion.span
                  aria-hidden="true"
                  className="text-blue-600 font-extrabold text-2xl select-none"
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    id={`faq-panel-${id}`}
                    role="region"
                    aria-labelledby={`faq-header-${id}`}
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                      open: { opacity: 1, height: "auto", marginTop: 8 },
                      collapsed: { opacity: 0, height: 0, marginTop: 0 },
                    }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="px-6 pb-6 text-gray-700 overflow-hidden"
                    style={{ overflow: "hidden" }}
                  >
                    <p className="leading-relaxed">{answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HomeFAQ;
