"use client";

import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

import {
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaCheckCircle,
  FaShareAlt,
  FaCopy,
} from "react-icons/fa";

import "swiper/css";

const testimonials = [
  {
    id: 1,
    name: "Dr. Emma Johnson",
    specialty: "Cardiologist",
    photo:
      "https://media.istockphoto.com/id/96455213/photo/young-medical-girl.webp?a=1&s=612x612&w=0&k=20&c=dae8Fb4n-UyxsDwrr79DRgrBfORqzgoDGzNXK4V_-eM=",
    rating: 4.5,
    testimonial:
      "Dr. Emma is an exceptional cardiologist who provided excellent care. Highly recommended!",
  },
  {
    id: 2,
    name: "Dr. Michael Lee",
    specialty: "Pediatrician",
    photo:
      "https://images.unsplash.com/photo-1645066928295-2506defde470?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fGRvY3RvcnN8ZW58MHx8MHx8fDA%3D",
    rating: 5,
    testimonial:
      "Dr. Michael is very patient and caring with children. We felt very comfortable with him.",
  },
  {
    id: 3,
    name: "Dr. Sophia Patel",
    specialty: "Neurologist",
    photo:
      "https://media.istockphoto.com/id/1211631919/photo/friendly-nurse-in-blue-scrubs.webp?a=1&s=612x612&w=0&k=20&c=ifOl1w6Kxua7GrlZjiqeW9-DhOmjtcQvM71v-iZdo6s=",
    rating: 4,
    testimonial:
      "Great neurologist with deep knowledge and friendly approach. Highly satisfied.",
  },
  {
    id: 4,
    name: "Dr. David Kim",
    specialty: "Orthopedic Surgeon",
    photo:
      "https://plus.unsplash.com/premium_photo-1677165481551-c91ed6e15f09?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEyfHx8ZW58MHx8fHx8",
    rating: 4.8,
    testimonial:
      "Dr. David is an expert surgeon. My recovery was smooth thanks to his care.",
  },
  {
    id: 5,
    name: "Dr. Aisha Rahman",
    specialty: "Dermatologist",
    photo:
      "https://plus.unsplash.com/premium_photo-1681967035389-84aabd80cb1e?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 5,
    testimonial:
      "Dr. Aisha helped me with my skin issues professionally and kindly. Outstanding results!",
  },
  {
    id: 6,
    name: "Dr. Carlos Mendes",
    specialty: "ENT Specialist",
    photo:
      "https://images.unsplash.com/photo-1612523138351-4643808db8f3?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDExfHx8ZW58MHx8fHx8",
    rating: 4.2,
    testimonial:
      "Very attentive and knowledgeable. Dr. Mendes made my ENT treatment simple and effective.",
  },
  {
    id: 7,
    name: "Dr. Laura Chen",
    specialty: "Psychiatrist",
    photo:
      "https://plus.unsplash.com/premium_photo-1702599029013-883a56a51fdc?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDh8fHxlbnwwfHx8fHw%3D",
    rating: 4.9,
    testimonial:
      "Dr. Laura is compassionate and helped me feel mentally stronger. Highly trustworthy.",
  },
  {
    id: 8,
    name: "Dr. James Anderson",
    specialty: "Urologist",
    photo:
      "https://images.unsplash.com/photo-1612276529731-4b21494e6d71?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDd8fHxlbnwwfHx8fHw%3D",
    rating: 4.6,
    testimonial:
      "Professional and respectful. Dr. James provided excellent treatment throughout.",
  },
  {
    id: 9,
    name: "Dr. Priya Mehta",
    specialty: "Endocrinologist",
    photo:
      "https://plus.unsplash.com/premium_photo-1661436275595-e6a8a3943f7a?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEyfHx8ZW58MHx8fHx8",
    rating: 4.4,
    testimonial:
      "Helped me manage my diabetes with a clear plan and patience. Great doctor.",
  },
  {
    id: 10,
    name: "Dr. Thomas Nguyen",
    specialty: "Gastroenterologist",
    photo:
      "https://images.unsplash.com/photo-1612531385446-f7e6d131e1d0?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fHw%3D",
    rating: 4.7,
    testimonial:
      "He made a complex procedure seem easy. I felt safe and informed throughout.",
  },
  {
    id: 11,
    name: "Dr. Fatima Zahra",
    specialty: "Ophthalmologist",
    photo:
      "https://plus.unsplash.com/premium_photo-1661700138215-2ade8dd6f0c9?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDIyfHx8ZW58MHx8fHx8",
    rating: 5,
    testimonial:
      "Dr. Fatima was gentle and explained every step of my eye exam. Amazing care!",
  },
  {
    id: 12,
    name: "Dr. Robert Scott",
    specialty: "General Physician",
    photo:
      "https://plus.unsplash.com/premium_photo-1723514536306-26fe5c4adeb7?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fHw%3D",
    rating: 4.3,
    testimonial:
      "Dr. Scott is very approachable and accurate with diagnosis. A dependable doctor.",
  },
  {
    id: 13,
    name: "Dr. Elena Garcia",
    specialty: "Pulmonologist",
    photo:
      "https://plus.unsplash.com/premium_photo-1661700176531-c8bd4603030f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDI3fHx8ZW58MHx8fHx8",
    rating: 4.8,
    testimonial:
      "Helped me breathe easy again! Thankful for her thorough treatment plan.",
  },
  {
    id: 14,
    name: "Dr. Benjamin Carter",
    specialty: "Oncologist",
    photo:
      "https://media.istockphoto.com/id/2161181257/photo/photo-of-doctor-guy-cross-arms-smiling-isolated-grey-color-background.webp?a=1&s=612x612&w=0&k=20&c=U9syri__PrnlJoIy7f9ABirWpQS9cbtFkwNkHWF4UpU=",
    rating: 4.9,
    testimonial:
      "Gave us hope and clarity during a tough time. Extremely dedicated and skilled.",
  },
  {
    id: 15,
    name: "Dr. Hana Yamada",
    specialty: "Rheumatologist",
    photo:
      "https://plus.unsplash.com/premium_photo-1702598649611-725ca8ca3ab6?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDM1fHx8ZW58MHx8fHx8",
    rating: 4.5,
    testimonial:
      "Thanks to Dr. Hana, my joint pain is finally under control. She truly listens.",
  },
  {
    id: 16,
    name: "Dr. Omar Bashir",
    specialty: "Nephrologist",
    photo:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.6,
    testimonial:
      "Very knowledgeable and approachable. Dr. Omar explained everything clearly.",
  },
];

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<FaStar key={i} className="text-yellow-400" />);
    } else if (rating >= i - 0.5) {
      stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-yellow-400" />);
    }
  }
  return (
    <div
      className="flex justify-center gap-1 mt-2 text-lg"
      title={`${rating} out of 5 stars`}
    >
      {stars}
    </div>
  );
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
  hover: { scale: 1.03, boxShadow: "0 8px 20px rgba(0,0,0,0.12)", transition: { duration: 0.3 } },
};

const buttonVariants = {
  initial: { opacity: 1, scale: 1 },
  hover: { scale: 1.1, color: "#1D4ED8", transition: { duration: 0.3 } },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

const HomeTestimonials = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [currentUrl, setCurrentUrl] = useState("");
  const controls = useAnimation();
  const sectionRef = useRef(null);

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible");
          observer.disconnect(); // only trigger once
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, [controls]);

  const handleToggle = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleCopy = (id) => {
    navigator.clipboard.writeText(`${currentUrl}#testimonial-${id}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="bg-white w-full py-16 px-6 sm:px-12 lg:px-24 rounded-3xl"
    >
      <div className="max-w-5xl mx-auto text-center mb-14">
        <motion.h2
          className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
            hidden: { opacity: 0, y: 20 },
          }}
        >
          Trusted Voices{" "}
          <span className="text-blue-700 font-extrabold">From Our Patients</span>
        </motion.h2>
        <motion.p
          className="text-gray-800 mt-4 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.8, ease: "easeOut" } },
            hidden: { opacity: 0, y: 20 },
          }}
        >
          Real stories from people who received expert care across various specialties.
        </motion.p>
      </div>

      <motion.div
        className="relative max-w-4xl mx-auto"
        initial="hidden"
        animate={controls}
        variants={containerVariants}
      >
        <Swiper
          modules={[Autoplay]}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          allowTouchMove={true}
          spaceBetween={5}
          className="w-full"
        >
          {testimonials.map(({ id, name, specialty, photo, testimonial, rating }) => {
            const isExpanded = expandedId === id;
            const words = testimonial.split(" ");
            const shouldTruncate = words.length > 25;
            const displayedText =
              isExpanded || !shouldTruncate
                ? testimonial
                : words.slice(0, 25).join(" ") + "...";

            return (
              <SwiperSlide key={id}>
                <motion.article
                  id={`testimonial-${id}`}
                  className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl flex flex-col items-center text-center max-h-full"
                  variants={cardVariants}
                  tabIndex={0}
                  role="group"
                  aria-label={`Testimonial by ${name}`}
                  whileHover="hover"
                >
                  <motion.img
                    src={photo}
                    alt={`Photo of ${name}`}
                    className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-blue-700 shadow-lg mb-6"
                    loading="lazy"
                    decoding="async"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />

                  <motion.p
                    className="text-gray-900 text-base sm:text-lg italic leading-relaxed max-w-xl px-4 relative"
                    layout
                    aria-live="polite"
                  >
                    “{displayedText}{" "}
                    {shouldTruncate && (
                      <motion.button
                        onClick={() => handleToggle(id)}
                        className="text-blue-800 text-sm font-semibold ml-2 underline hover:text-blue-900 transition-colors"
                        aria-expanded={isExpanded}
                        aria-controls={`testimonial-text-${id}`}
                        whileHover={{ scale: 1.1, color: "#1E40AF" }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {isExpanded ? "Show Less" : "Read More"}
                      </motion.button>
                    )}
                  </motion.p>

                  <StarRating rating={rating} />

                  <h3 className="mt-6 font-semibold text-xl sm:text-2xl text-gray-900 flex items-center gap-2">
                    {name}
                    <FaCheckCircle
                      className="text-green-600 text-lg"
                      title="Verified"
                      aria-label="Verified"
                    />
                  </h3>
                  <p className="text-blue-900 font-semibold text-sm sm:text-base tracking-wide">
                    {specialty}
                  </p>

                  <div className="mt-4 flex gap-6 justify-center">
                    <motion.button
                      onClick={() => handleCopy(id)}
                      className="flex items-center gap-1 text-sm sm:text-base text-gray-700 hover:text-blue-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                      aria-label={`Copy link for testimonial by ${name}`}
                      variants={buttonVariants}
                      initial="initial"
                      whileHover="hover"
                      type="button"
                    >
                      {copiedId === id ? "Link Copied!" : "Copy Link"}
                      <FaCopy />
                    </motion.button>

                    <motion.a
                      href={`mailto:?subject=Check this testimonial&body=Check this: ${currentUrl}#testimonial-${id}`}
                      className="flex items-center gap-1 text-sm sm:text-base text-gray-700 hover:text-blue-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                      aria-label={`Share testimonial by ${name}`}
                      variants={buttonVariants}
                      initial="initial"
                      whileHover="hover"
                    >
                      Share
                      <FaShareAlt />
                    </motion.a>
                  </div>
                </motion.article>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </motion.div>
    </section>
  );
};

export default HomeTestimonials;
