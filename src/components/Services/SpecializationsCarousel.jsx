"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  FaBrain,
  FaStethoscope,
  FaHeartbeat,
  FaXRay,
  FaSyringe,
  FaTooth,
  FaUserNurse,
  FaProcedures,
  FaBaby,
  FaSocks,
} from "react-icons/fa"
import { MdLocalHospital, MdHealing, MdPsychology } from "react-icons/md"
import { GiMedicines, GiHealthNormal, GiSyringe, GiEyeTarget } from "react-icons/gi"
import { IoMdPulse, IoMdPeople } from "react-icons/io"
import { BiHealth } from "react-icons/bi"
import { RiMentalHealthFill } from "react-icons/ri"
import { HiOutlineUserGroup } from "react-icons/hi"

const specializations = [
  { id: 1, title: "Neurology", icon: FaBrain },
  { id: 2, title: "General Medicine", icon: FaStethoscope },
  { id: 3, title: "Cardiology", icon: FaHeartbeat },
  { id: 4, title: "Radiology", icon: FaXRay },
  { id: 5, title: "Immunology", icon: FaSyringe },
  { id: 6, title: "Dentistry", icon: FaTooth },
  { id: 7, title: "Nursing", icon: FaUserNurse },
  { id: 8, title: "Pediatrics", icon: FaBaby },
  { id: 9, title: "Oncology", icon: FaProcedures },
  { id: 10, title: "Orthopedics", icon: FaSocks },
]

const CARD_WIDTH = 280 // px, adjust as needed

const clampIndex = (index, length) => {
  return ((index % length) + length) % length
}

const SpecializationsCoverflow = () => {
  const [current, setCurrent] = useState(0)
  const length = specializations.length

  // Handle next and prev
  const prev = () => setCurrent((prev) => clampIndex(prev - 1, length))
  const next = () => setCurrent((prev) => clampIndex(prev + 1, length))

  // Keyboard arrows for accessibility
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowLeft") prev()
      else if (e.key === "ArrowRight") next()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [])

  return (
    <section className="py-20 bg-white select-none">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-900">
          Our{" "}
          <span className="text-blue-700 underline decoration-blue-300 decoration-4 underline-offset-4">
            Specializations
          </span>
        </h2>

        <div className="relative flex items-center justify-center">
          {/* Left Arrow */}
          <button
            aria-label="Previous specialization"
            onClick={prev}
            className="absolute left-0 z-10 p-3 bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
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
            className="relative w-full max-w-[900px] h-[360px] flex justify-center items-center overflow-visible"
            style={{ perspective: 1200 }}
          >
            {specializations.map((spec, i) => {
              // Calculate offset relative to current
              let offset = i - current

              // For infinite effect (loop around)
              if (offset < -length / 2) offset += length
              if (offset > length / 2) offset -= length

              // Calculate transform props based on offset
              // Center card: scale 1.1, opacity 1
              // Left/right: scale down, translateX, rotateY, opacity lower
              const absOffset = Math.abs(offset)
              const scale = absOffset === 0 ? 1.1 : 0.8 - 0.1 * Math.min(absOffset, 3)
              const opacity = absOffset > 3 ? 0 : 1 - 0.3 * Math.min(absOffset, 3)
              const translateX = offset * (CARD_WIDTH * 0.7)
              const rotateY = offset * -25

              const Icon = spec.icon

              return (
                <motion.div
                  key={spec.id}
                  initial={false}
                  animate={{
                    x: translateX,
                    scale,
                    rotateY,
                    opacity,
                    zIndex: absOffset === 0 ? 10 : 10 - absOffset,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="absolute top-0 left-1/2 w-[280px] h-[320px] bg-gray-50 rounded-2xl shadow-lg flex flex-col items-center justify-center p-6 cursor-pointer select-none"
                  style={{ transformOrigin: "50% 50%" }}
                  role="listitem"
                  aria-label={spec.title}
                  tabIndex={absOffset === 0 ? 0 : -1}
                  onClick={() => setCurrent(i)}
                >
                  <Icon className="text-blue-600 mb-5" size={64} aria-hidden="true" />
                  <h3 className="text-xl font-semibold text-gray-900">{spec.title}</h3>
                </motion.div>
              )
            })}
          </div>

          {/* Right Arrow */}
          <button
            aria-label="Next specialization"
            onClick={next}
            className="absolute right-0 z-10 p-3 bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
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
          {specializations.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              aria-label={`Go to specialization ${specializations[idx].title}`}
              className={`w-3 h-3 rounded-full transition ${
                current === idx ? "bg-blue-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default SpecializationsCoverflow
