"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    author: "Lucas Anderson",
    text: "An outstanding experience with a truly dedicated team. Their professionalism shines through every step.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1605684954998-685c79d6a018?w=400&auto=format&fit=crop&q=60",
  },
  {
    id: 2,
    author: "Maria Gonzales",
    text: "Their attention to detail and personalized care exceeded my expectations. Highly recommend!",
    rating: 4,
    image:
      "https://plus.unsplash.com/premium_photo-1664475543697-229156438e1e?w=400&auto=format&fit=crop&q=60",
  },
  {
    id: 3,
    author: "David Lee",
    text: "A seamless and supportive journey from start to finish. Truly top-notch service.",
    rating: 5,
    image:
      "https://plus.unsplash.com/premium_photo-1661578535048-7a30e3a71d25?w=400&auto=format&fit=crop&q=60",
  },
  {
    id: 4,
    author: "Sophia Patel",
    text: "Professional, caring, and efficient. I felt valued and well looked after at every visit.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1662837775286-7e6258c7c595?w=400&auto=format&fit=crop&q=60",
  },
  {
    id: 5,
    author: "James Kim",
    text: "Highly skilled team with a personal touch. They made all the difference.",
    rating: 4,
    image:
      "https://plus.unsplash.com/premium_photo-1661478177049-f8569388e0c5?w=400&auto=format&fit=crop&q=60",
  },
  {
    id: 6,
    author: "Emma Brown",
    text: "I appreciated the warm environment and expert care. A wonderful experience overall.",
    rating: 5,
    image:
      "https://plus.unsplash.com/premium_photo-1661722577924-5493be567c61?w=400&auto=format&fit=crop&q=60",
  },
];

const clampIndex = (index, length) => ((index % length) + length) % length;

export default function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);
  const length = testimonials.length;

  const [windowWidth, setWindowWidth] = React.useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  useEffect(() => {
    const onResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const isMobile = windowWidth < 640;

  const cardWidth = isMobile ? Math.min(windowWidth - 64, 280) : 320;
  const cardHeight = isMobile ? 340 : 340;
  const translateFactor = 0.7; // desktop only, ignored on mobile
  const rotationFactor = -25; // desktop only, ignored on mobile
  const minScale = 0.85;

  const prev = useCallback(() => {
    setCurrent((prev) => clampIndex(prev - 1, length));
  }, [length]);

  const next = useCallback(() => {
    setCurrent((prev) => clampIndex(prev + 1, length));
  }, [length]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [prev, next]);

  return (
    <section
      aria-label="Testimonials Carousel"
      className="py-14 bg-white select-none my-[-80px]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-10 sm:mb-12 text-gray-900">
          Our{" "}
          <span className="text-blue-700 underline decoration-blue-300 decoration-4 underline-offset-4">
            Testimonials
          </span>
        </h2>

        <div className="relative flex items-center justify-center">
          {/* Left Arrow */}
          <button
            aria-label="Previous testimonial"
            onClick={prev}
            className="absolute left-3 sm:left-0 z-20 p-2 sm:p-3 bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 sm:h-6 sm:w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Carousel Container */}
          <div
            className="relative w-full flex justify-center items-center overflow-visible"
            style={{
              perspective: isMobile ? "none" : 1200,
              height: cardHeight,
              paddingLeft: isMobile ? 32 : 0,
              paddingRight: isMobile ? 32 : 0,
              transformStyle: isMobile ? "flat" : "preserve-3d",
              willChange: "transform",
            }}
          >
            {testimonials.map((testimonial, i) => {
              if (isMobile) {
                // On mobile: show only the current card centered, no rotation or side cards
                if (i !== current) return null;

                return (
                  <motion.div
                    key={testimonial.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1, x: 0, rotateY: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="bg-gray-50 rounded-3xl shadow-xl flex flex-col justify-start p-6 cursor-pointer select-none mx-auto"
                    style={{
                      width: cardWidth,
                      height: cardHeight,
                      boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
                      userSelect: "none",
                      WebkitFontSmoothing: "antialiased",
                      MozOsxFontSmoothing: "grayscale",
                    }}
                    role="listitem"
                    aria-label={`Testimonial by ${testimonial.author}`}
                    tabIndex={0}
                    onClick={() => setCurrent(i)}
                  >
                    <img
                      src={testimonial.image}
                      alt={`Photo of ${testimonial.author}`}
                      className="w-20 h-20 rounded-full object-cover mb-6 mx-auto"
                      loading="lazy"
                      style={{ imageRendering: "auto" }}
                    />
                    <blockquote
                      className="text-gray-900 italic text-base mb-6 flex-grow text-center leading-relaxed"
                      style={{ fontSmooth: "always" }}
                    >
                      “{testimonial.text}”
                    </blockquote>
                    <footer className="text-gray-700 font-semibold text-lg mb-4 text-center">
                      — {testimonial.author}
                    </footer>
                    <div className="flex justify-center space-x-1">
                      {[...Array(5)].map((_, starIndex) => (
                        <FaStar
                          key={starIndex}
                          className={`w-5 h-5 ${
                            starIndex < testimonial.rating
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                  </motion.div>
                );
              }

              // Desktop: multi-card 3D carousel
              let offset = i - current;
              if (offset < -length / 2) offset += length;
              if (offset > length / 2) offset -= length;

              const absOffset = Math.abs(offset);

              const rawScale =
                absOffset === 0 ? 1 : 0.75 - 0.1 * Math.min(absOffset, 3);
              const scale = Math.max(rawScale, 0.85);

              const opacity = absOffset > 3 ? 0 : 1 - 0.3 * Math.min(absOffset, 3);
              const translateX = offset * (cardWidth * translateFactor);
              const rotateY = offset * rotationFactor;

              return (
                <motion.div
                  key={testimonial.id}
                  initial={false}
                  animate={{
                    x: translateX,
                    scale,
                    rotateY,
                    opacity,
                    zIndex: absOffset === 0 ? 10 : 10 - absOffset,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="absolute top-0 left-1/2 bg-gray-50 rounded-3xl shadow-xl flex flex-col justify-start p-5 cursor-pointer select-none"
                  style={{
                    width: cardWidth,
                    height: cardHeight,
                    transformOrigin: "50% 50%",
                    boxShadow: "0 10px 20px rgba(0,0,0,0.12)",
                    userSelect: "none",
                    WebkitFontSmoothing: "antialiased",
                    MozOsxFontSmoothing: "grayscale",
                  }}
                  role="listitem"
                  aria-label={`Testimonial by ${testimonial.author}`}
                  tabIndex={absOffset === 0 ? 0 : -1}
                  onClick={() => setCurrent(i)}
                >
                  <img
                    src={testimonial.image}
                    alt={`Photo of ${testimonial.author}`}
                    className="w-20 h-20 rounded-full object-cover mb-5 mx-auto"
                    loading="lazy"
                    style={{ imageRendering: "auto" }}
                  />
                  <blockquote
                    className="text-gray-900 italic text-base mb-5 flex-grow text-center leading-relaxed"
                    style={{ fontSmooth: "always" }}
                  >
                    “{testimonial.text}”
                  </blockquote>
                  <footer className="text-gray-700 font-semibold text-lg mb-3 text-center">
                    — {testimonial.author}
                  </footer>
                  <div className="flex justify-center space-x-1">
                    {[...Array(5)].map((_, starIndex) => (
                      <FaStar
                        key={starIndex}
                        className={`w-5 h-5 ${
                          starIndex < testimonial.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Arrow */}
          <button
            aria-label="Next testimonial"
            onClick={next}
            className="absolute right-3 sm:right-0 z-20 p-2 sm:p-3 bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 sm:h-6 sm:w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="mt-10 flex justify-center space-x-3">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              aria-label={`Go to testimonial ${idx + 1}`}
              className={`w-3 h-3 rounded-full transition ${
                current === idx ? "bg-blue-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
