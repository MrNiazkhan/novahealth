"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { FaUsers, FaHospital, FaAward, FaBriefcaseMedical } from "react-icons/fa"

const stats = [
  {
    id: 1,
    icon: <FaUsers className="text-3xl text-white" />,
    title: "Happy Patients",
    count: 52430,
    suffix: "+",
    bg: "bg-gradient-to-r from-blue-500 to-blue-700",
  },
  {
    id: 2,
    icon: <FaHospital className="text-3xl text-white" />,
    title: "Hospitals Joined",
    count: 189,
    bg: "bg-gradient-to-r from-green-500 to-green-700",
  },
  {
    id: 3,
    icon: <FaAward className="text-3xl text-white" />,
    title: "Award Winning",
    count: 26,
    suffix: "+",
    bg: "bg-gradient-to-r from-yellow-500 to-yellow-700",
  },
  {
    id: 4,
    icon: <FaBriefcaseMedical className="text-3xl text-white" />,
    title: "Doctors & Staff",
    count: 3700,
    suffix: "+",
    bg: "bg-gradient-to-r from-pink-500 to-pink-700",
  },
]

// Utility hook to animate count-up
const useCountUp = (targetNumber, inView, duration = 2000) => {
  const [count, setCount] = useState(0)
  const frame = useRef()

  useEffect(() => {
    if (!inView) return

    let start = 0
    const startTime = performance.now()

    const animate = (time) => {
      const progress = Math.min((time - startTime) / duration, 1)
      const value = Math.floor(progress * targetNumber)
      setCount(value)

      if (progress < 1) {
        frame.current = requestAnimationFrame(animate)
      } else {
        cancelAnimationFrame(frame.current)
      }
    }

    frame.current = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(frame.current)
  }, [inView, targetNumber, duration])

  return count
}

const AboutStats = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-12 bg-gray-50">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight"
        >
          Our Impact in Numbers
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-4 text-gray-600 max-w-2xl mx-auto"
        >
          We take pride in delivering top healthcare services to thousands around the world. Here are a few of our proud milestones.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {stats.map((stat, index) => {
          const ref = useRef(null)
          const inView = useInView(ref, { once: true, margin: "-100px" })
          const count = useCountUp(stat.count, inView)

          return (
            <motion.div
              key={stat.id}
              ref={ref}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
              className={`rounded-2xl p-6 sm:p-8 text-white shadow-lg ${stat.bg} flex flex-col items-center justify-center`}
            >
              <div className="mb-4">{stat.icon}</div>
              <h3 className="text-3xl font-bold">
                {count.toLocaleString()}
                {stat.suffix || ""}
              </h3>
              <p className="text-sm font-medium mt-1 tracking-wide">{stat.title}</p>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

export default AboutStats
