"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Patient",
    review:
      "The team was incredibly professional and made me feel comfortable from the moment I walked in. Highly recommended!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1606166228927-3feafb447265?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    name: "Mark Thompson",
    role: "Customer",
    review:
      "Excellent service! The attention to detail and personal care exceeded my expectations.",
    rating: 5,
    image: "https://plus.unsplash.com/premium_photo-1723626014994-caef68c25493?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fHw%3D",
  },
  {
    id: 3,
    name: "Emily Davis",
    role: "Client",
    review:
      "I felt truly cared for. The staff went above and beyond to ensure everything was perfect.",
    rating: 4,
    image: "https://images.unsplash.com/photo-1644611148697-3eb43ac6c390?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D",
  },
  {
    id: 4,
    name: "James Carter",
    role: "Customer",
    review:
      "Friendly, professional, and highly skilled team. I will definitely be coming back!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1543075270-17e1257ec612?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fHw%3D",
  },
  {
    id: 5,
    name: "Olivia Martinez",
    role: "Patient",
    review:
      "From booking to follow-up, the entire process was smooth and stress-free. A truly caring experience.",
    rating: 5,
    image: "https://plus.unsplash.com/premium_photo-1723626014994-caef68c25493?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fHw%3D",
  },
  {
    id: 6,
    name: "William Harris",
    role: "Client",
    review:
      "I appreciate the professionalism and warmth shown by every staff member. They made me feel valued.",
    rating: 4,
    image: "https://images.unsplash.com/photo-1616434116710-c45ce99c1a77?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const TestimonialsList = () => {
  return (
    <section
      aria-label="Customer Testimonials List"
      className="bg-white py-16 px-5 sm:px-8 md:px-12"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-black">
            What People Are Saying
          </h2>
          <p className="mt-3 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Real feedback from our valued customers who have experienced our
            services firsthand.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
            >
              {/* Avatar */}
              <img
                src={testimonial.image}
                alt={`${testimonial.name} photo`}
                className="w-20 h-20 rounded-full object-cover shadow-lg mb-4"
                loading="lazy"
              />

              {/* Name & Role */}
              <h3 className="text-lg font-semibold text-black">
                {testimonial.name}
              </h3>
              <p className="text-sm text-gray-500 mb-3">{testimonial.role}</p>

              {/* Review */}
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                "{testimonial.review}"
              </p>

              {/* Rating */}
              <div className="flex justify-center mb-2">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <FaStar key={i} className="text-yellow-500" />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsList;
