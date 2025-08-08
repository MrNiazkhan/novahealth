"use client";

import React from "react";
import { motion } from "framer-motion";

const TestimonialsCallToAction = () => {
  return (
    <section
      aria-label="Testimonials Call To Action"
      className="relative overflow-hidden py-16 px-5 sm:px-8 md:px-12 bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 text-white"
    >
      {/* Background Motion Circles */}
      <motion.div
        className="absolute -top-20 -left-20 w-64 h-64 bg-blue-500/30 rounded-full blur-3xl"
        animate={{ x: [0, 30, -20, 0], y: [0, -20, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-400/20 rounded-full blur-3xl"
        animate={{ x: [0, -25, 25, 0], y: [0, 25, -25, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-5"
        >
          Ready to Share Your Experience?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="max-w-2xl mx-auto text-lg sm:text-xl font-light text-gray-100 mb-8 leading-relaxed"
        >
          Your story can inspire others. Join the hundreds of satisfied customers
          who have already shared their feedback.
        </motion.p>

        <motion.button
          type="button"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
          onClick={() => alert("Redirecting to testimonial submission form")}
          className="inline-block px-8 py-3 bg-white text-blue-800 font-semibold rounded-full shadow-lg hover:shadow-xl hover:bg-gray-100 transition-all focus:outline-none focus:ring-4 focus:ring-white/50"
          aria-label="Submit Your Testimonial"
        >
          Submit Your Testimonial
        </motion.button>
      </div>
    </section>
  );
};

export default TestimonialsCallToAction;
