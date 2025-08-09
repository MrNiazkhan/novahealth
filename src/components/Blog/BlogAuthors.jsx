import React from "react";

const AUTHORS = [
  {
    id: 1,
    name: "Emma Johnson",
    bio: "Health & Wellness expert passionate about holistic living.",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d29tYW58ZW58MHx8MHx8fDA%3D",
    twitter: "https://twitter.com/emmajohnson",
    linkedin: "https://linkedin.com/in/emmajohnson",
  },
  {
    id: 2,
    name: "Liam Smith",
    bio: "Fitness coach and nutrition specialist helping people stay fit.",
    photo: "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWFufGVufDB8fDB8fHww",
    twitter: "https://twitter.com/liamsmith",
    linkedin: "https://linkedin.com/in/liamsmith",
  },
  {
    id: 3,
    name: "Sophia Lee",
    bio: "Mental health advocate and mindfulness teacher.",
    photo: "https://plus.unsplash.com/premium_photo-1689551670902-19b441a6afde?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d29tYW58ZW58MHx8MHx8fDA%3D",
    twitter: "https://twitter.com/sophialee",
    linkedin: "https://linkedin.com/in/sophialee",
  },
  {
    id: 4,
    name: "Mason Davis",
    bio: "Expert in natural remedies and holistic health approaches.",
    photo: "https://plus.unsplash.com/premium_photo-1664533227571-cb18551cac82?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bWFufGVufDB8fDB8fHww",
    twitter: "https://twitter.com/masondavis",
    linkedin: "https://linkedin.com/in/masondavis",
  },
];

export default function BlogAuthors() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-extrabold text-center mb-10 text-gray-900">
        Meet Our Authors
      </h2>
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {AUTHORS.map((author) => (
          <article
            key={author.id}
            className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={author.photo}
              alt={`Photo of ${author.name}`}
              className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-blue-600"
              loading="lazy"
            />
            <h3 className="text-xl font-semibold mb-2 text-gray-800">{author.name}</h3>
            <p className="text-gray-600 mb-4 text-sm">{author.bio}</p>
            <div className="flex space-x-5">
              <a
                href={author.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${author.name} Twitter`}
                className="text-blue-500 hover:text-blue-700 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M23 3a10.9 10.9 0 01-3.14.86 4.48 4.48 0 001.96-2.48 9.09 9.09 0 01-2.88 1.1 4.52 4.52 0 00-7.7 4.13A12.85 12.85 0 013 4.8a4.52 4.52 0 001.4 6.05 4.48 4.48 0 01-2.05-.57v.06a4.52 4.52 0 003.63 4.43 4.48 4.48 0 01-2.04.08 4.52 4.52 0 004.22 3.15A9.07 9.07 0 012 19.54a12.82 12.82 0 006.95 2.04c8.35 0 12.92-6.91 12.92-12.91 0-.2 0-.42-.02-.63A9.18 9.18 0 0023 3z" />
                </svg>
              </a>
              <a
                href={author.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${author.name} LinkedIn`}
                className="text-blue-700 hover:text-blue-900 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M19 0h-14a5 5 0 00-5 5v14a5 5 0 005 5h14a5 5 0 005-5v-14a5 5 0 00-5-5zm-11 19h-3v-9h3zm-1.5-10.3a1.75 1.75 0 111.75-1.75 1.75 1.75 0 01-1.75 1.75zm13.5 10.3h-3v-4.5a1.5 1.5 0 00-3 0v4.5h-3v-9h3v1.25a3.56 3.56 0 016 2.6z" />
                </svg>
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
