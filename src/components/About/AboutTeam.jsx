"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  hover: { scale: 1.05, boxShadow: "0 15px 25px rgba(0,0,0,0.15)" },
};

const teamMembers = [
  {
    id: 1,
    name: "Dr. Emma Johnson",
    role: "Chief Medical Officer",
    image:
      "https://plus.unsplash.com/premium_photo-1661700176531-c8bd4603030f?w=400&auto=format&fit=crop&q=60",
    socials: {
      twitter: "#",
      linkedin: "#",
      instagram: "#",
    },
  },
  {
    id: 2,
    name: "Dr. Michael Lee",
    role: "Cardiologist",
    image:
      "https://plus.unsplash.com/premium_photo-1658506671316-0b293df7c72b?q=80&w=1170&auto=format&fit=crop",
    socials: {
      twitter: "#",
      linkedin: "#",
      instagram: "#",
    },
  },
  {
    id: 3,
    name: "Dr. Sophia Patel",
    role: "Neurologist",
    image:
      "https://plus.unsplash.com/premium_photo-1681996426446-cd17659b35b7?w=400&auto=format&fit=crop&q=60",
    socials: {
      twitter: "#",
      linkedin: "#",
      instagram: "#",
    },
  },
  {
    id: 4,
    name: "Dr. James Smith",
    role: "Pediatrician",
    image:
      "https://plus.unsplash.com/premium_photo-1661596987649-15ef3388e6a0?w=400&auto=format&fit=crop&q=60",
    socials: {
      twitter: "#",
      linkedin: "#",
      instagram: "#",
    },
  },
];

const AboutTeam = () => {
  return (
    <section
      aria-label="Meet Our Team"
      className="bg-white py-20 px-6 sm:px-12 max-w-7xl mx-auto "
    >
      {/* Header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
        className="mb-12 text-center max-w-3xl mx-auto"
      >
        <motion.h2
          className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
          tabIndex={-1}
        >
          Meet Our <span className="text-blue-600">Team</span>
        </motion.h2>
        <motion.p
          className="mt-4 text-gray-600 text-lg sm:text-xl font-light"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } },
          }}
        >
          Our dedicated experts are committed to providing the highest quality
          care and innovation.
        </motion.p>
      </motion.div>

      {/* Team Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"
        variants={containerVariants}
      >
        {teamMembers.map(({ id, name, role, image, socials }) => (
          <motion.article
            key={id}
            className="bg-gray-50 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm cursor-pointer select-none focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-400"
            variants={cardVariants}
            whileHover="hover"
            tabIndex={0}
            aria-label={`${name}, ${role}`}
          >
            <motion.img
              src={image}
              alt={`${name} profile picture`}
              className="w-32 h-32 rounded-full object-cover mb-4 shadow-md"
              loading="lazy"
              decoding="async"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              draggable={false}
            />

            <motion.h3
              className="text-lg sm:text-xl font-semibold text-gray-900 max-w-[180px] truncate"
              title={name}
            >
              {name}
            </motion.h3>

            <motion.p
              className="text-blue-600 text-sm font-medium mb-4 max-w-[180px] truncate"
              title={role}
            >
              {role}
            </motion.p>

            <motion.div className="flex space-x-6 text-gray-400 hover:text-blue-600">
              <a
                href={socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name} Twitter`}
                className="hover:text-blue-500 transition"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name} LinkedIn`}
                className="hover:text-blue-700 transition"
              >
                <FaLinkedinIn size={20} />
              </a>
              <a
                href={socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name} Instagram`}
                className="hover:text-pink-500 transition"
              >
                <FaInstagram size={20} />
              </a>
            </motion.div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
};

export default AboutTeam;
