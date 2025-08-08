"use client";

import React from "react";
import { motion } from "framer-motion";

const TestimonialsHero = () => {
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.3, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <section
      aria-label="Testimonials Hero Section"
      className="bg-white text-black min-h-[440px] flex items-center px-5 sm:px-8 md:px-12 my-16 md:my-20"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center w-full gap-10 md:gap-16">
        {/* Left Text Content */}
        <motion.div
          className="flex-1 text-center md:text-left"
          initial="hidden"
          animate="visible"
          viewport={{ once: true }}
        >
          <motion.h1
            custom={0}
            variants={textVariants}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight"
          >
            <span className="text-blue-700">What</span>{" "}
            <span className="text-black">Our Clients Say</span>
          </motion.h1>

          <motion.p
            custom={1}
            variants={textVariants}
            className="mt-4 text-base sm:text-lg md:text-xl font-light max-w-lg mx-auto md:mx-0 leading-relaxed"
          >
            Hear directly from our happy customers and learn how our services
            have made a positive impact in their lives. Real stories, real
            experiences.
          </motion.p>

          <motion.button
            custom={2}
            variants={textVariants}
            type="button"
            className="mt-7 px-8 py-2.5 bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:bg-blue-800 transition-colors focus:outline-none focus:ring-4 focus:ring-blue-300"
            aria-label="Read All Testimonials"
            onClick={() => alert("Redirect to testimonials list")}
          >
            Read Testimonials
          </motion.button>
        </motion.div>

        {/* Right Image */}
        <motion.div
          className="flex-1 max-w-sm mx-auto md:mx-0"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
        >
          <img
            src="https://images.unsplash.com/photo-1618498082410-b4aa22193b38?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Happy customers giving positive reviews"
            className="rounded-xl shadow-xl w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsHero;
