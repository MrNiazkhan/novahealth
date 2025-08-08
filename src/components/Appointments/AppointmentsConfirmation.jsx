"use client";

import React, { useEffect, useState } from "react";

const PRIMARY_BLUE = "#2563eb";
const PRIMARY_BLUE_HOVER = "#1e40af";
const SUCCESS_GREEN = "#16a34a";
const TEXT_DARK = "#111827";

const AppointmentsConfirmation = ({
  fullName,
  email,
  phone,
  date,
  time,
  message,
  onReset,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  // Trigger fade-in animation on mount
  useEffect(() => {
    setFadeIn(true);
  }, []);

  // Format date nicely
  const formatDate = (d) => {
    try {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(d).toLocaleDateString(undefined, options);
    } catch {
      return d || "N/A";
    }
  };

  // Format time nicely
  const formatTime = (t) => {
    try {
      if (!t) return "N/A";
      const [h, m] = t.split(":");
      const dateObj = new Date();
      dateObj.setHours(parseInt(h), parseInt(m));
      return dateObj.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    } catch {
      return t || "N/A";
    }
  };

  // Handle button click with debounce to prevent double clicks
  const handleReset = () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    onReset && onReset();
    // Allow button again after short delay
    setTimeout(() => setIsSubmitting(false), 1500);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        .appointment-confirmation {
          max-width: 600px;
          margin: 2rem auto;
          background-color: #fff;
          border-radius: 14px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.1);
          padding: 32px;
          font-family: 'Inter', sans-serif;
          color: ${TEXT_DARK};
          user-select: none;
          opacity: 0;
          transform: translateY(15px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .appointment-confirmation.fade-in {
          opacity: 1;
          transform: translateY(0);
        }
        .appointment-confirmation h2 {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 20px;
          text-align: center;
          color: ${PRIMARY_BLUE};
          letter-spacing: 0.5px;
        }
        .appointment-confirmation p {
          font-size: 16px;
          margin-bottom: 24px;
          text-align: center;
          font-weight: 500;
          word-break: break-word;
        }
        dl.appointment-details {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 12px 24px;
          font-size: 16px;
          margin-bottom: 32px;
        }
        dl.appointment-details dt {
          font-weight: 600;
          color: #374151;
          align-self: start;
          word-break: break-word;
        }
        dl.appointment-details dd {
          margin: 0;
          word-break: break-word;
          white-space: pre-wrap;
          max-width: 100%;
        }
        button.reset-btn {
          background-color: ${PRIMARY_BLUE};
          color: #fff;
          padding: 12px 24px;
          font-size: 16px;
          font-weight: 600;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          display: block;
          margin: 0 auto;
          box-shadow: 0 4px 10px rgba(37, 99, 235, 0.4);
          transition: background-color 0.3s ease, transform 0.2s ease;
          user-select: none;
          letter-spacing: 0.4px;
          min-width: 230px;
          text-align: center;
          outline-offset: 3px;
        }
        button.reset-btn:disabled {
          cursor: not-allowed;
          background-color: #94a3b8;
          box-shadow: none;
        }
        button.reset-btn:hover:not(:disabled),
        button.reset-btn:focus-visible:not(:disabled) {
          background-color: ${PRIMARY_BLUE_HOVER};
          transform: scale(1.05);
          outline: 2px solid ${PRIMARY_BLUE_HOVER};
          outline-offset: 4px;
        }
        /* Responsive */
        @media (max-width: 640px) {
          .appointment-confirmation {
            padding: 24px 16px;
            margin: 1.5rem 1rem;
          }
          .appointment-confirmation h2 {
            font-size: 24px;
          }
          dl.appointment-details {
            grid-template-columns: 1fr;
            gap: 8px 0;
          }
          dl.appointment-details dt {
            font-weight: 600;
            margin-top: 12px;
          }
          button.reset-btn {
            width: 100%;
            min-width: unset;
          }
        }
      `}</style>

      <section
        role="alert"
        aria-live="polite"
        aria-atomic="true"
        className={`appointment-confirmation ${fadeIn ? "fade-in" : ""}`}
      >
        <h2 tabIndex={-1}>Appointment Confirmed</h2>

        <p>
          Thank you, <strong>{fullName || "Guest"}</strong>! Your appointment
          request has been successfully submitted.
        </p>

        <dl className="appointment-details">
          <dt>Full Name:</dt>
          <dd>{fullName || "N/A"}</dd>

          <dt>Email:</dt>
          <dd>{email || "N/A"}</dd>

          <dt>Phone:</dt>
          <dd>{phone || "N/A"}</dd>

          <dt>Date:</dt>
          <dd>{formatDate(date)}</dd>

          <dt>Time:</dt>
          <dd>{formatTime(time)}</dd>

          <dt>Message:</dt>
          <dd>{message ? message : <em>No additional message provided.</em>}</dd>
        </dl>

        <button
          type="button"
          onClick={handleReset}
          className="reset-btn"
          disabled={isSubmitting}
          aria-label="Reset appointment form to book another appointment"
        >
          {isSubmitting ? "Processing..." : "Book Another Appointment"}
        </button>
      </section>
    </>
  );
};

export default AppointmentsConfirmation;
