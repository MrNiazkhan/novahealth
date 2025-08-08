"use client"

import React, { useEffect } from "react"
import { motion } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.18, ease: "easeOut", duration: 0.7 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { ease: "easeOut", duration: 0.5 } },
}

const imageVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut", delay: 0.6 },
  },
}

const AboutHero = () => {
  useEffect(() => {
    // Focus heading on mount for accessibility
    const heading = document.getElementById("about-hero-heading")
    if (heading) heading.focus({ preventScroll: true })
  }, [])

  const scrollToLearnMore = () => {
    const target = document.getElementById("learn-more")
    if (target) {
      target.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      aria-label="About Hero Section"
      role="region"
      className="bg-white overflow-hidden"
    >
      <motion.div
        className="max-w-7xl mx-auto px-6 md:px-12 py-24 flex flex-col md:flex-row items-center min-h-[520px] md:min-h-[600px]"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left Text */}
        <motion.div
          className="flex-1 text-center md:text-left"
          variants={itemVariants}
        >
          <motion.h1
            id="about-hero-heading"
            tabIndex={-1}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-gray-900 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500 rounded"
          >
            About{" "}
            <span className="text-blue-700 underline decoration-blue-300 decoration-4 underline-offset-4">
              Us
            </span>
          </motion.h1>

          <motion.p
            className="mt-6 max-w-xl mx-auto md:mx-0 text-lg sm:text-xl md:text-2xl font-light leading-relaxed text-gray-700 tracking-wide"
            variants={itemVariants}
          >
            We provide exceptional healthcare services with integrity,
            innovation, and empathy — ensuring your well-being every step of the
            way.
          </motion.p>

          <motion.button
            type="button"
            onClick={scrollToLearnMore}
            aria-label="Learn more about us"
            className="mt-10 inline-block bg-indigo-600 hover:bg-indigo-700 focus-visible:ring-indigo-400 focus:outline-none focus:ring-4 text-white font-semibold px-10 py-4 rounded-lg shadow-lg select-none tracking-wide"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variants={itemVariants}
          >
            Learn More
          </motion.button>
        </motion.div>

        {/* Right Image */}
        <motion.div
          className="flex-1 mt-14 md:mt-0 md:ml-16 flex justify-center md:justify-end"
          variants={itemVariants}
        >
          <motion.img
            src="https://media.istockphoto.com/id/1993451390/photo/medicine-doctor-touching-medical-symbol-network-connection-interface-3d-rendering-interface.webp?a=1&b=1&s=612x612&w=0&k=20&c=DXdL8_ZbJ-lavgPiVzliVTiDIOXkgfLADmLABr6hSDE="
            alt="Medical team collaborating"
            loading="lazy"
            decoding="async"
            draggable={false}
            className="rounded-xl shadow-xl max-w-full w-80 sm:w-96 object-cover"
            variants={imageVariants}
            initial="hidden"
            animate="visible"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default AboutHero
