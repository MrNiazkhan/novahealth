import React from "react";

const HEALTH_TIPS = [
  {
    id: 1,
    icon: (
      <svg
        className="w-8 h-8 text-blue-700"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" />
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    title: "Stay Hydrated",
    description: "Drink at least 8 glasses of water daily to keep your body healthy.",
  },
  {
    id: 2,
    icon: (
      <svg
        className="w-8 h-8 text-blue-700"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14" />
      </svg>
    ),
    title: "Balanced Diet",
    description: "Include fruits, vegetables, and proteins in your daily meals.",
  },
  {
    id: 3,
    icon: (
      <svg
        className="w-8 h-8 text-blue-700"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.364-6.364l-1.414 1.414M6.05 17.95l-1.414 1.414M17.95 17.95l1.414 1.414M6.05 6.05L4.636 4.636" />
      </svg>
    ),
    title: "Regular Exercise",
    description: "Engage in at least 30 minutes of moderate exercise daily.",
  },
  {
    id: 4,
    icon: (
      <svg
        className="w-8 h-8 text-blue-700"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12c0-4.418-3.582-8-8-8" />
      </svg>
    ),
    title: "Get Enough Sleep",
    description: "Aim for 7-9 hours of quality sleep every night.",
  },
  {
    id: 5,
    icon: (
      <svg
        className="w-8 h-8 text-blue-700"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14v7" />
      </svg>
    ),
    title: "Manage Stress",
    description: "Practice mindfulness and relaxation techniques daily.",
  },
  {
    id: 6,
    icon: (
      <svg
       className="w-8 h-8 text-blue-700"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 20h10M12 12v8" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a7 7 0 100 14 7 7 0 000-14z" />
      </svg>
    ),
    title: "Regular Checkups",
    description: "Visit your healthcare provider for regular screenings.",
  },
];

export default function BlogHealthTips() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-12">
    <h2 className="text-3xl font-extrabold text-center mb-10">
  <span className="text-black">Health Tips </span>
  <span className="text-blue-700">for a Better Life</span>
</h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {HEALTH_TIPS.map(({ id, icon, title, description }) => (
          <article
            key={id}
            className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300"
          >
            <div className="mb-4">{icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
            <p className="text-gray-600 text-sm">{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
