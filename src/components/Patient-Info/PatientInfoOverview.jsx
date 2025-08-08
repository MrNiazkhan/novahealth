import React from "react";

const infoCards = [
  {
    icon: (
      <svg
        className="h-10 w-10 text-blue-700"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7z" />
        <circle cx="12" cy="9" r="2" />
      </svg>
    ),
    title: "Secure Data Handling",
    description:
      "Your personal information is encrypted and stored securely, ensuring full privacy and compliance with healthcare regulations.",
  },
  {
    icon: (
      <svg
        className="h-10 w-10 text-blue-700"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M9 12h6m-3-3v6m-4-8h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-2" />
      </svg>
    ),
    title: "Comprehensive Patient Profile",
    description:
      "Collect essential details like your medical history, allergies, and emergency contacts for personalized healthcare.",
  },
  {
    icon: (
      <svg
        className="h-10 w-10 text-blue-700"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
    title: "Easy & Quick Process",
    description:
      "Our streamlined forms and clear instructions make submitting your patient info hassle-free and efficient.",
  },
];

const PatientInfoOverview = () => {
  return (
    <section
      aria-labelledby="overview-title"
      className="bg-white text-black py-16 px-6 md:px-12 max-w-7xl mx-auto"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2
          id="overview-title"
          className="text-4xl font-extrabold text-blue-700 mb-4 sm:text-5xl"
        >
          Patient Information Overview
        </h2>
        <p className="text-lg sm:text-xl font-light max-w-3xl mx-auto text-gray-900">
          Understanding the importance of accurate patient information is
          crucial for delivering effective healthcare. Here’s how we make it
          simple and secure:
        </p>
      </div>

      <div className="mt-14 grid gap-10 sm:grid-cols-2 md:grid-cols-3 max-w-5xl mx-auto">
        {infoCards.map(({ icon, title, description }, idx) => (
          <article
            key={idx}
            className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl shadow-md transition-shadow hover:shadow-lg"
          >
            <div className="mb-4">{icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
            <p className="text-gray-700 text-base leading-relaxed">{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default PatientInfoOverview;
