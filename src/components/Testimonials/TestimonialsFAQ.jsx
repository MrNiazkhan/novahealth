"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiMinus } from "react-icons/fi";

const faqData = [
  {
    question: "How do you select testimonials for your website?",
    answer:
      "We carefully curate testimonials that reflect authentic experiences from diverse clients, ensuring honesty and relevance to our services.",
  },
  {
    question: "Can I submit my own testimonial?",
    answer:
      "Absolutely! We welcome feedback from all our clients. Please use the 'Submit Testimonial' form on our contact page.",
  },
  {
    question: "Are the testimonials verified?",
    answer:
      "Yes, each testimonial goes through a verification process to confirm authenticity before being published.",
  },
  {
    question: "How often do you update the testimonials?",
    answer:
      "We regularly update our testimonials section to showcase the latest feedback and success stories from our clients.",
  },
  {
    question: "Can I use a testimonial from your site for my marketing?",
    answer:
      "Please contact us directly for permission before using any testimonial content externally to ensure compliance.",
  },
];

const TestimonialsFAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      aria-label="Testimonials Frequently Asked Questions"
      className="relative max-w-5xl mx-auto px-4 sm:px-8 py-12"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gray-50 rounded-3xl shadow-xl pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-center text-blue-800 mb-12">
          Testimonials FAQs
        </h2>

        <ul className="space-y-5">
          {faqData.map(({ question, answer }, index) => {
            const isOpen = openIndex === index;
            return (
              <li
                key={index}
                className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  id={`faq-question-${index}`}
                  className="w-full flex justify-between items-center px-6 py-5 text-left"
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
                      <div className="px-6 pb-6 text-gray-700 text-base leading-relaxed">
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

export default TestimonialsFAQ;
