"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaRegStar } from "react-icons/fa";

const doctorsData = [
  {
    service: "Cardiology",
    doctors: [
      {
        id: 1,
        name: "Dr. Emily Thompson",
        specialty: "Heart Specialist",
        rating: 4.8,
        photo: "https://randomuser.me/api/portraits/women/68.jpg",
      },
      {
        id: 2,
        name: "Dr. Michael Lee",
        specialty: "Cardiologist",
        rating: 4.6,
        photo: "https://randomuser.me/api/portraits/men/75.jpg",
      },
      {
        id: 3,
        name: "Dr. Sarah Kim",
        specialty: "Interventional Cardiologist",
        rating: 4.7,
        photo: "https://randomuser.me/api/portraits/women/45.jpg",
      },
    ],
  },
  {
    service: "Dermatology",
    doctors: [
      {
        id: 4,
        name: "Dr. Sophia Patel",
        specialty: "Skin Specialist",
        rating: 4.9,
        photo: "https://randomuser.me/api/portraits/women/65.jpg",
      },
      {
        id: 5,
        name: "Dr. James Wilson",
        specialty: "Dermatologist",
        rating: 4.7,
        photo: "https://randomuser.me/api/portraits/men/60.jpg",
      },
      {
        id: 6,
        name: "Dr. Lily Anderson",
        specialty: "Cosmetic Dermatologist",
        rating: 4.8,
        photo: "https://randomuser.me/api/portraits/women/55.jpg",
      },
    ],
  },
  {
    service: "Neurology",
    doctors: [
      {
        id: 7,
        name: "Dr. Olivia Martinez",
        specialty: "Neurologist",
        rating: 4.9,
        photo: "https://randomuser.me/api/portraits/women/72.jpg",
      },
      {
        id: 8,
        name: "Dr. Daniel Garcia",
        specialty: "Neurosurgeon",
        rating: 4.7,
        photo: "https://randomuser.me/api/portraits/men/53.jpg",
      },
      {
        id: 9,
        name: "Dr. Grace Lee",
        specialty: "Pediatric Neurologist",
        rating: 4.8,
        photo: "https://randomuser.me/api/portraits/women/50.jpg",
      },
    ],
  },
];

// Render stars for rating
function renderStars(rating) {
  const stars = [];
  const rounded = Math.floor(rating);
  for (let i = 1; i <= 5; i++) {
    stars.push(
      i <= rounded ? (
        <FaStar
          key={i}
          className="text-yellow-400 inline-block mr-0.5 drop-shadow-sm"
          aria-hidden="true"
          size={16}
        />
      ) : (
        <FaRegStar
          key={i}
          className="text-yellow-400 inline-block mr-0.5 drop-shadow-sm"
          aria-hidden="true"
          size={16}
        />
      )
    );
  }
  return stars;
}

const Modal = ({ isOpen, onClose, doctor }) => {
  const modalRef = useRef(null);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    date: "",
    time: "",
    notes: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";

    const focusableSelectors =
      'a[href], area[href], input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const modalNode = modalRef.current;
    const focusableEls = modalNode.querySelectorAll(focusableSelectors);
    const firstEl = focusableEls[0];
    const lastEl = focusableEls[focusableEls.length - 1];

    function handleKeyDown(e) {
      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === firstEl) {
            e.preventDefault();
            lastEl.focus();
          }
        } else {
          if (document.activeElement === lastEl) {
            e.preventDefault();
            firstEl.focus();
          }
        }
      }
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    firstEl?.focus();

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const validate = () => {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!form.email.trim()) newErrors.email = "Email address is required";
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email))
      newErrors.email = "Invalid email address";
    if (!form.date) newErrors.date = "Please select a date";
    if (!form.time) newErrors.time = "Please select a time";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
    }, 1300);
  };

  const handleClose = () => {
    setForm({ fullName: "", email: "", date: "", time: "", notes: "" });
    setErrors({});
    setIsSubmitting(false);
    setSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {/* Overlay */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.55 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 opacity-80 backdrop-blur-sm z-[1000]"
        aria-hidden="true"
      />

      {/* Modal container */}
      <motion.div
        key="modal"
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 40 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="fixed inset-0 z-[1001] flex items-center justify-center px-4 py-8 sm:py-12"
      >
        <div
          ref={modalRef}
          className="bg-white bg-opacity-90 backdrop-blur-md rounded-3xl max-w-lg w-full shadow-2xl p-8 sm:p-10 focus:outline-none max-h-[90vh] overflow-auto"
          tabIndex={-1}
        >
          <header className="flex justify-between items-center mb-8">
            <h3
              id="modal-title"
              className="text-2xl sm:text-3xl font-extrabold text-blue-900 tracking-tight"
            >
              Book Appointment
            </h3>
            <button
              onClick={handleClose}
              aria-label="Close modal"
              className="text-blue-700 hover:text-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-400 rounded-full p-2 transition"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </header>

          {success ? (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-green-700 space-y-4"
            >
              <p className="text-lg sm:text-xl font-semibold">
                Your appointment with{" "}
                <span className="font-bold">{doctor?.name ?? "the doctor"}</span> has
                been successfully booked!
              </p>
              <button
                onClick={handleClose}
                className="inline-block bg-blue-600 hover:bg-blue-700 focus-visible:ring-4 focus-visible:ring-blue-400 focus:outline-none text-white rounded-xl px-8 py-3 font-semibold shadow-lg transition text-base"
                type="button"
              >
                Close
              </button>
            </motion.div>
          ) : (
            <>
              <p className="mb-6 text-blue-800 font-medium text-sm sm:text-base">
                Booking with{" "}
                <span className="font-semibold">{doctor?.name ?? "---"}</span> -{" "}
                <span>{doctor?.specialty ?? "---"}</span>
              </p>

              <form onSubmit={handleSubmit} noValidate className="space-y-6 text-sm sm:text-base">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-blue-900 font-semibold mb-2"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    aria-invalid={!!errors.fullName}
                    aria-describedby="fullName-error"
                    required
                    placeholder="Your full name"
                    className={`w-full rounded-lg border px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 ${
                      errors.fullName
                        ? "border-red-500 focus:ring-red-400"
                        : "border-gray-300 focus:ring-blue-400"
                    } shadow-sm transition`}
                  />
                  {errors.fullName && (
                    <p
                      id="fullName-error"
                      role="alert"
                      className="mt-1 text-red-600 text-xs sm:text-sm"
                    >
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-blue-900 font-semibold mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    aria-invalid={!!errors.email}
                    aria-describedby="email-error"
                    required
                    placeholder="you@example.com"
                    className={`w-full rounded-lg border px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 ${
                      errors.email
                        ? "border-red-500 focus:ring-red-400"
                        : "border-gray-300 focus:ring-blue-400"
                    } shadow-sm transition`}
                  />
                  {errors.email && (
                    <p
                      id="email-error"
                      role="alert"
                      className="mt-1 text-red-600 text-xs sm:text-sm"
                    >
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="date"
                      className="block text-blue-900 font-semibold mb-2"
                    >
                      Appointment Date *
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                      min={new Date().toISOString().split("T")[0]}
                      aria-invalid={!!errors.date}
                      aria-describedby="date-error"
                      required
                      className={`w-full rounded-lg border px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 ${
                        errors.date
                          ? "border-red-500 focus:ring-red-400"
                          : "border-gray-300 focus:ring-blue-400"
                      } shadow-sm transition`}
                    />
                    {errors.date && (
                      <p
                        id="date-error"
                        role="alert"
                        className="mt-1 text-red-600 text-xs sm:text-sm"
                      >
                        {errors.date}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="time"
                      className="block text-blue-900 font-semibold mb-2"
                    >
                      Appointment Time *
                    </label>
                    <input
                      type="time"
                      id="time"
                      name="time"
                      value={form.time}
                      onChange={handleChange}
                      aria-invalid={!!errors.time}
                      aria-describedby="time-error"
                      required
                      className={`w-full rounded-lg border px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 ${
                        errors.time
                          ? "border-red-500 focus:ring-red-400"
                          : "border-gray-300 focus:ring-blue-400"
                      } shadow-sm transition`}
                    />
                    {errors.time && (
                      <p
                        id="time-error"
                        role="alert"
                        className="mt-1 text-red-600 text-xs sm:text-sm"
                      >
                        {errors.time}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="notes"
                    className="block text-blue-900 font-semibold mb-2"
                  >
                    Additional Notes
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    value={form.notes}
                    onChange={handleChange}
                    placeholder="Optional"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-400 resize-y shadow-sm transition"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-blue-400 disabled:to-blue-400 text-white font-semibold rounded-xl px-6 py-3 shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-400 transition text-lg sm:text-xl"
                >
                  {isSubmitting ? "Booking..." : "Confirm Appointment"}
                </button>
              </form>
            </>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

const DoctorsByService = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const openModal = (doctor) => {
    setSelectedDoctor(doctor);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedDoctor(null);
  };

  return (
    <section
      aria-labelledby="doctors-by-service-heading"
      className="bg-gray-50 py-20 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto rounded-3xl shadow-lg select-none my-[-30px]"
    >
      <h2
        id="doctors-by-service-heading"
        className="text-5xl sm:text-6xl font-extrabold text-blue-900 mb-16 text-center tracking-wide drop-shadow-md"
      >
        Our Doctors by Service
      </h2>

      {doctorsData.map(({ service, doctors }) => (
        <div key={service} className="mb-20">
          <h3 className="text-3xl font-semibold text-blue-800 mb-10 border-b border-blue-300 pb-3 tracking-wide">
            {service}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
            {doctors.map(({ id, name, specialty, rating, photo }) => (
              <motion.article
                key={id}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openModal({ id, name, specialty });
                  }
                }}
                className="bg-white rounded-2xl shadow-xl p-7 flex flex-col items-center text-center cursor-pointer hover:shadow-2xl focus:shadow-2xl focus:outline-none transition-shadow duration-300"
                aria-label={`${name}, ${specialty}, rated ${rating} out of 5 stars`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: id * 0.1 }}
                onClick={() => openModal({ id, name, specialty })}
              >
                <div className="w-28 h-28 rounded-full border-8 border-blue-100 shadow-md mb-6 overflow-hidden transform transition-transform hover:scale-105">
                  <img
                    src={photo}
                    alt={`Photo of ${name}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <h4 className="text-xl font-semibold text-blue-900 mb-1">{name}</h4>
                <p className="text-blue-700 mb-4 italic tracking-wide">{specialty}</p>
                <div
                  className="mb-8"
                  aria-label={`Rating: ${rating} out of 5 stars`}
                  role="img"
                >
                  {renderStars(rating)}
                </div>
              <button
  type="button"
  onClick={(e) => {
    e.stopPropagation();
    openModal({ id, name, specialty });
  }}
  className="mt-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl px-5 py-2 sm:px-8 sm:py-3 shadow-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-400 transition whitespace-nowrap text-sm sm:text-base"
>
  Book Appointment
</button>

              </motion.article>
            ))}
          </div>
        </div>
      ))}

      <Modal isOpen={modalOpen} onClose={closeModal} doctor={selectedDoctor} />
    </section>
  );
};

export default DoctorsByService;
