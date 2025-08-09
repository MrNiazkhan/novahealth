"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaStar, FaUsers, FaCommentDots, FaClock } from "react-icons/fa";

const stats = [
  {
    id: 1,
    label: "Testimonials",
    value: 1250,
    icon: <FaCommentDots className="text-blue-600 w-10 h-10" />,
    isNumber: true,
  },
  {
    id: 2,
    label: "Average Rating",
    value: "4.8 / 5",
    icon: <FaStar className="text-yellow-400 w-10 h-10" />,
    isNumber: false,
  },
  {
    id: 3,
    label: "Happy Customers",
    value: 980,
    icon: <FaUsers className="text-green-500 w-10 h-10" />,
    isNumber: true,
  },
  {
    id: 4,
    label: "Years Experience",
    value: 12,
    icon: <FaClock className="text-purple-600 w-10 h-10" />,
    isNumber: true,
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const AnimatedCounter = ({ target }) => {
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    let start = 0;
    const end = typeof target === "number" ? target : parseFloat(target);
    if (isNaN(end)) return;

    const duration = 1200;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target]);

  return <>{count.toLocaleString()}</>;
};

const TestimonialsStats = () => {
  return (
    <section
      aria-label="Testimonials statistics"
      className="bg-white py-16 px-5 sm:px-8 md:px-12 my-10 mb-[-30px]"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-center">
        {stats.map(({ id, label, value, icon, isNumber }, index) => (
          <motion.div
            key={id}
            className="flex flex-col items-center hover:scale-105 transition-transform duration-300"
            custom={index}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="mb-4">{icon}</div>
            <p className="text-4xl font-extrabold text-black">
              {isNumber ? <AnimatedCounter target={value} /> : value}
            </p>
            <p className="mt-2 text-lg font-medium text-gray-600">{label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsStats;
