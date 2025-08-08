"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    src: "https://cuberto.com/assets/showreel/short.mp4",
    author: "Lucas Anderson",
    text: "An outstanding experience with a truly dedicated team. Their professionalism shines through every step.",
    rating: 5,
  },
  {
    id: 2,
    src: "https://cuberto.com/assets/projects/puntopago/cover.mp4",
    author: "Maria Gonzales",
    text: "Their attention to detail and personalized care exceeded my expectations. Highly recommend!",
    rating: 4,
  },
  {
    id: 3,
    src: "https://cuberto.com/assets/projects/kzero/cover.mp4",
    author: "David Lee",
    text: "A seamless and supportive journey from start to finish. Truly top-notch service.",
    rating: 5,
  },
  {
    id: 4,
    src: "https://cuberto.com/assets/projects/daoway/cover.mp4",
    author: "Sophia Patel",
    text: "Professional, caring, and efficient. I felt valued and well looked after at every visit.",
    rating: 5,
  },
  {
    id: 5,
    src: "https://cuberto.com/assets/projects/magma/cover.mp4",
    author: "James Kim",
    text: "Highly skilled team with a personal touch. They made all the difference.",
    rating: 4,
  },
  {
    id: 6,
    src: "https://cuberto.com/assets/projects/riyadh/cover.mp4",
    author: "Emma Brown",
    text: "I appreciated the warm environment and expert care. A wonderful experience overall.",
    rating: 5,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const VideoTestimonialItem = ({ testimonial, alignLeft }) => {
  const videoRef = useRef(null);
  const [hover, setHover] = useState(false);

  const handleMouseEnter = () => {
    setHover(true);
    videoRef.current?.play();
  };

  const handleMouseLeave = () => {
    setHover(false);
    videoRef.current?.pause();
    videoRef.current.currentTime = 0;
  };

  return (
    <motion.div
      className={`flex flex-col md:flex-row items-center gap-8 max-w-7xl mx-auto my-12 ${
        alignLeft ? "md:flex-row" : "md:flex-row-reverse"
      }`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeUp}
    >
      {/* Video */}
      <div
        className="w-full md:w-1/2 rounded-3xl overflow-hidden shadow-xl cursor-pointer transition-transform duration-300 hover:scale-[1.03]"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <video
          ref={videoRef}
          src={testimonial.src}
          muted
          loop
          preload="metadata"
          playsInline
          className="w-full h-auto object-cover rounded-3xl"
          controls={false}
        />
      </div>

      {/* Content */}
      <div className="w-full md:w-1/2 text-center md:text-left px-4 md:px-0">
        <p className="text-lg sm:text-xl italic text-gray-800 leading-relaxed mb-4">
          “{testimonial.text}”
        </p>
        <h3 className="text-xl font-semibold text-gray-900">{testimonial.author}</h3>
        <div className="flex justify-center md:justify-start mt-2 space-x-1">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={`w-5 h-5 ${
                i < testimonial.rating ? "text-yellow-400" : "text-gray-300"
              }`}
              aria-hidden="true"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const TestimonialsVideoContent = () => {
  return (
    <section
      aria-label="Content style Video Testimonials"
      className="bg-white py-16 px-5 sm:px-8 md:px-12"
    >
      {/* First row: 1 left video + content, 2 right video + content */}
      <VideoTestimonialItem testimonial={testimonials[0]} alignLeft={true} />
      <VideoTestimonialItem testimonial={testimonials[1]} alignLeft={false} />

      {/* Second row: 3 left below 1st, 4 right below 2nd */}
      <VideoTestimonialItem testimonial={testimonials[2]} alignLeft={true} />
      <VideoTestimonialItem testimonial={testimonials[3]} alignLeft={false} />

      {/* Third row: 5 left below 3rd, 6 right below 4th */}
      <VideoTestimonialItem testimonial={testimonials[4]} alignLeft={true} />
      <VideoTestimonialItem testimonial={testimonials[5]} alignLeft={false} />
    </section>
  );
};

export default TestimonialsVideoContent;
