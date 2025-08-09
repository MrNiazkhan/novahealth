"use client";

import React from "react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { ease: "easeOut", duration: 0.7 } },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { ease: "easeOut", duration: 0.8 } },
};

const HomeAbout = () => {
  const features = [
    "Trusted by 50,000+ patients worldwide",
    "Award-winning diagnostic labs",
    "Multi-language care & support staff",
    "Fully integrated online booking system",
  ];

  return (
    <section
      aria-label="About Section"
      className="bg-white py-20 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto mb-[-30px]"
    >
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center min-h-[520px]"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Left: Image */}
        <motion.div className="w-full" variants={imageVariants}>
          <img
            src="https://plus.unsplash.com/premium_photo-1681842906523-f27efd0d1718?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Healthcare Professionals"
            className="w-full rounded-lg object-cover h-[320px] sm:h-[400px] md:h-[480px]"
            loading="lazy"
          />
        </motion.div>

        {/* Right: Content */}
        <motion.div className="text-left" variants={containerVariants}>
          <motion.h2
            className="text-4xl font-extrabold text-blue-700 mb-6"
            variants={itemVariants}
          >
            Dedicated to <span className="text-black">Exceptional Care</span>
          </motion.h2>

          <motion.p
            className="text-gray-900 text-base sm:text-lg font-light max-w-lg mb-8"
            variants={itemVariants}
          >
            At our core, we blend technology with empathy—ensuring every
            patient receives the attention they deserve. From telehealth to
            in-person consultations, our facilities and staff are tailored for
            you.
          </motion.p>

          <motion.ul
            className="space-y-4 max-w-md text-gray-800 font-semibold"
            variants={containerVariants}
          >
            {features.map((item, idx) => (
              <motion.li
                key={idx}
                className="flex items-center gap-3"
                variants={itemVariants}
              >
                <span className="text-blue-700 text-xl select-none">✓</span>
                <span>{item}</span>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div className="mt-10" variants={itemVariants}>
            <a
              href="/services"
              className="inline-block bg-blue-700 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            >
              Explore Our Services
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HomeAbout;
