"use client";

import React, { useRef, useEffect, useState } from "react";

const EmergencyContact = () => {
  const leftContentRef = useRef(null);
  const [leftHeight, setLeftHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      if (leftContentRef.current) {
        setLeftHeight(leftContentRef.current.offsetHeight);
      }
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <section
      aria-label="Emergency Contact Information"
      className="bg-white text-black py-12 px-6 sm:px-12 md:px-20 lg:px-32"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-stretch gap-12">
        {/* Left: Contact Info */}
        <div
          ref={leftContentRef}
          className="flex-1 max-w-md flex flex-col justify-between"
        >
          <div>
            <h2 className="flex items-center text-3xl sm:text-4xl font-extrabold text-blue-700 mb-10">
              Emergency Contact
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-3 w-8 h-8 text-blue-700 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18.364 5.636a9 9 0 11-12.728 0m12.728 0L12 12"
                />
              </svg>
            </h2>

            <div className="space-y-8 text-gray-800">
              {/* Phone */}
              <div className="flex items-center gap-4">
                <svg
                  className="w-6 h-6 text-blue-700 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M3 5a2 2 0 012-2h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 010 1.414L8 9a11.042 11.042 0 005.586 5.586l1.293-1.293a1 1 0 011.414 0l2.414 2.414a1 1 0 01.293.707V19a2 2 0 01-2 2h-1C9.477 21 3 14.523 3 7V5z" />
                </svg>
                <div>
                  <h3 className="font-semibold text-black text-lg">Phone</h3>
                  <a
                    href="tel:911"
                    className="text-blue-700 hover:underline text-base"
                    aria-label="Call emergency phone number"
                  >
                    911 
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4">
                <svg
                  className="w-6 h-6 text-blue-700 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M16 12H8m0 0l4-4m-4 4l4 4" />
                </svg>
                <div>
                  <h3 className="font-semibold text-black text-lg">Email</h3>
                  <a
                    href="mailto:emergency@yourcarecenter.com"
                    className="text-blue-700 hover:underline text-base"
                    aria-label="Send email to emergency contact"
                  >
                    emergency@yourcarecenter.com
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-center gap-4">
                <svg
                  className="w-6 h-6 text-blue-700 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
                <div>
                  <h3 className="font-semibold text-black text-lg">Address</h3>
                  <address className="not-italic text-gray-700 text-base max-w-md">
                    123 Care Center Lane,
                    <br />
                    Cityville, State 12345
                  </address>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action Button */}
          <div className="mt-10">
            <a
              href="tel:911"
              className="inline-block bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-blue-800 transition-colors focus:outline-none focus:ring-4 focus:ring-blue-300"
              aria-label="Call emergency services now"
            >
              Call Emergency Services Now
            </a>
          </div>
        </div>

        {/* Right: Embedded Map */}
        <div
          className="flex-1 rounded-lg overflow-hidden shadow-lg border border-gray-200"
          style={{ height: leftHeight || "auto" }}
          aria-label="Map showing emergency care center location"
        >
          <iframe
            title="Emergency Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0193189279614!2d-122.42067948468151!3d37.7792809797581!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808b9ff623eb%3A0x7fca7d263fbbcd2c!2sCity%20Care%20Center!5e0!3m2!1sen!2sus!4v1691523456789!5m2!1sen!2sus"
            width="100%"
            height="100%"
            className="border-0"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
};

export default EmergencyContact;
