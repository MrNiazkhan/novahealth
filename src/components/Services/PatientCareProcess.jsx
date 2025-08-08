"use client"

import React from "react"
import { motion } from "framer-motion"
import {
  FaClipboardList,
  FaUserCheck,
  FaStethoscope,
  FaFileMedical,
  FaNotesMedical,
  FaHome,
} from "react-icons/fa"

const steps = [
  {
    id: 1,
    icon: <FaClipboardList className="text-blue-600" size={28} />,
    title: "Step 1: Registration",
    description: "Provide personal details and medical history at the reception.",
  },
  {
    id: 2,
    icon: <FaUserCheck className="text-blue-600" size={28} />,
    title: "Step 2: Initial Screening",
    description: "Vitals are checked and symptoms reviewed by our nursing staff.",
  },
  {
    id: 3,
    icon: <FaStethoscope className="text-blue-600" size={28} />,
    title: "Step 3: Doctor Consultation",
    description: "Meet your assigned doctor for detailed diagnosis and advice.",
  },
  {
    id: 4,
    icon: <FaFileMedical className="text-blue-600" size={28} />,
    title: "Step 4: Diagnostic Tests",
    description: "Undergo lab tests, scans, or imaging as recommended.",
  },
  {
    id: 5,
    icon: <FaNotesMedical className="text-blue-600" size={28} />,
    title: "Step 5: Prescription & Plan",
    description: "Receive your medication and a personalized care plan.",
  },
  {
    id: 6,
    icon: <FaHome className="text-blue-600" size={28} />,
    title: "Step 6: Discharge & Follow-up",
    description: "Return home with aftercare guidance and follow-up schedule.",
  },
]

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ease: "easeOut", duration: 0.5 },
  },
}

const PatientCareProcess = () => {
  return (
    <section
      role="region"
      aria-label="Patient Care Process"
      className="bg-white py-20 px-6 md:px-12 my-[-30px]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
            Patient Care <span className="text-blue-700 underline decoration-blue-300 decoration-4 underline-offset-4">Process</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-light">
            A step-by-step care system designed to ensure quality, comfort, and efficiency for every patient.
          </p>
        </div>

        <motion.div
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {steps.map((step) => (
            <motion.div
              key={step.id}
              variants={item}
              className="bg-gray-50 hover:bg-blue-50 transition-colors duration-300 rounded-xl p-6 shadow-md flex flex-col items-center text-center"
            >
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default PatientCareProcess
