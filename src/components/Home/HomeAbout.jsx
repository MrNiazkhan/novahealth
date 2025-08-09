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
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { ease: "easeOut", duration: 0.7 } },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { ease: "easeOut", duration: 0.8 } },
};

const HomeAbout = () => {
  const listItems = [
    "Trusted by 50,000+ patients worldwide",
    "Award-winning diagnostic labs",
    "Multi-language care & support staff",
    "Fully integrated online booking system",
  ];

  return (
    <section
      aria-label="About Section"
      className="relative bg-white py-20 px-6 md:px-12 overflow-hidden my-[-30px]"
    >
      <motion.div
        className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-14 min-h-[560px]"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Text Content */}
        <motion.div className="flex-1 text-center md:text-left" variants={containerVariants}>
          <motion.h2
            className="text-4xl sm:text-5xl font-extrabold text-blue-700 leading-tight tracking-tight"
            variants={itemVariants}
          >
            Dedicated to <span className="text-black">Exceptional Care</span>
          </motion.h2>

          <motion.p
            className="mt-6 text-base sm:text-lg text-gray-900 max-w-xl mx-auto md:mx-0 font-light"
            variants={itemVariants}
          >
            At our core, we blend technology with empathy—ensuring every patient receives the
            attention they deserve. From telehealth to in-person consultations, our facilities and
            staff are tailored for you.
          </motion.p>

          <motion.ul
            className="mt-8 space-y-4 text-left text-sm sm:text-base font-medium text-gray-800 max-w-md mx-auto md:mx-0"
            variants={containerVariants} // Stagger list children again inside
          >
            {listItems.map((item, idx) => (
              <motion.li
                key={idx}
                className="flex items-start gap-3"
                variants={itemVariants}
              >
                <span className="text-blue-700 mt-1 text-lg">✓</span>
                <span>{item}</span>
              </motion.li>
            ))}
          </motion.ul>

          {/* Call To Action */}
          <motion.div className="mt-10" variants={itemVariants}>
            <a
              href="/services"
              className="inline-block bg-blue-700 text-white hover:bg-blue-800 transition-colors duration-300 font-semibold px-8 py-3 rounded-lg shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              Explore Our Services
            </a>
          </motion.div>
        </motion.div>

        {/* Image Content */}
        <motion.div
          className="flex-1 flex justify-center md:justify-end relative"
          variants={itemVariants}
        >
          <div className="absolute top-6 left-6 w-full h-full max-w-md blur-xl bg-blue-100 opacity-40 rounded-3xl hidden md:block -z-10" />
          <motion.img
            src="https://plus.unsplash.com/premium_photo-1681842906523-f27efd0d1718?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Healthcare Professionals"
            className="rounded-2xl shadow-xl max-w-xs sm:max-w-sm md:max-w-md w-full object-cover"
            loading="lazy"
            variants={imageVariants}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HomeAbout;
