"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const doctors = [
  {
    id: 1,
    name: "Dr. Olivia Martin",
    specialty: "Cardiologist",
    image:
      "https://images.unsplash.com/photo-1579165466949-3180a3d056d5?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODd8fGRvY3RvciUyMHRlc3RhbW9uaWFsc3xlbnwwfHwwfHx8MA%3D%3D",
    rating: 5,
    text:
      "Dr. Martin’s expertise and compassion truly made a difference in my treatment journey.",
  },
  {
    id: 2,
    name: "Dr. James Carter",
    specialty: "Neurologist",
    image:
      "https://plus.unsplash.com/premium_photo-1661764895266-f0b195221b77?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODF8fGRvY3RvciUyMHRlc3RhbW9uaWFsc3xlbnwwfHwwfHx8MA%3D%3D",
    rating: 4,
    text:
      "Thanks to Dr. Carter, I received the best care possible. Highly recommend!",
  },
  {
    id: 3,
    name: "Dr. Sophia Lee",
    specialty: "Pediatrician",
    image:
      "https://images.unsplash.com/photo-1587500154541-1cafd74f0efc?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTIzfHxkb2N0b3IlMjB0ZXN0YW1vbmlhbHN8ZW58MHx8MHx8fDA%3D",
    rating: 5,
    text:
      "Dr. Lee has a wonderful way with children and made us feel very comfortable.",
  },
  {
    id: 4,
    name: "Dr. Michael ",
    specialty: "Orthopedic Surgeon",
    image:
      "https://plus.unsplash.com/premium_photo-1661720509368-23b026d2667c?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTE0fHxkb2N0b3IlMjB0ZXN0YW1vbmlhbHN8ZW58MHx8MHx8fDA%3D",
    rating: 5,
    text:
      "I’m grateful for Dr. Brown’s professionalism and the amazing results I got.",
  },
];

const starVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: (i) => ({
    scale: 1,
    opacity: 1,
    transition: { delay: i * 0.1, duration: 0.3 },
  }),
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const TestimonialsDoctors = () => {
  return (
    <section
      aria-label="Testimonials Doctors Section"
      className="bg-white text-gray-900 py-16 px-5 sm:px-8 md:px-12"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-12 tracking-tight">
          Meet Our Expert Doctors
        </h2>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {doctors.map((doc, idx) => (
            <motion.article
              key={doc.id}
              className="flex flex-col bg-gray-50 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              transition={{ delay: idx * 0.15 }}
            >
              <img
                src={doc.image}
                alt={`Portrait of ${doc.name}`}
                className="w-28 h-28 rounded-full object-cover mx-auto mb-5 shadow-md"
                loading="lazy"
                decoding="async"
              />

              <h3 className="text-xl font-semibold text-center">{doc.name}</h3>
              <p className="text-center text-blue-700 font-medium mb-3">{doc.specialty}</p>

              <div className="flex justify-center mb-4" aria-label={`${doc.rating} out of 5 stars`}>
                {[...Array(5)].map((_, i) => (
                  <motion.span
                    key={i}
                    custom={i}
                    variants={starVariants}
                    initial="hidden"
                    animate={i < doc.rating ? "visible" : "hidden"}
                  >
                    <FaStar
                      size={20}
                      color={i < doc.rating ? "#2563EB" : "#D1D5DB"}
                      aria-hidden="true"
                    />
                  </motion.span>
                ))}
              </div>

              <p className="text-center text-gray-700 text-sm leading-relaxed flex-grow">
                &quot;{doc.text}&quot;
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsDoctors;
