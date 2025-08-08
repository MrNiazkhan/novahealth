"use client";

import React, { useState, useRef, useEffect } from "react";

const PatientNotes = () => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      content: "Patient reported mild headaches over the last week.",
      createdAt: new Date("2024-07-25T10:30:00"),
    },
    {
      id: 2,
      content: "Recommended increasing hydration and follow-up in 2 weeks.",
      createdAt: new Date("2024-07-28T14:15:00"),
    },
  ]);
  const [noteInput, setNoteInput] = useState("");
  const [editId, setEditId] = useState(null);
  const textareaRef = useRef(null);

  // Focus textarea when editing
  useEffect(() => {
    if (editId !== null) {
      textareaRef.current?.focus();
    }
  }, [editId]);

  const handleInputChange = (e) => {
    setNoteInput(e.target.value);
  };

  const handleAddNote = () => {
    if (!noteInput.trim()) return;

    if (editId !== null) {
      // Edit existing note
      setNotes((prev) =>
        prev.map((note) =>
          note.id === editId ? { ...note, content: noteInput } : note
        )
      );
      setEditId(null);
    } else {
      // Add new note
      const newNote = {
        id: Date.now(),
        content: noteInput.trim(),
        createdAt: new Date(),
      };
      setNotes((prev) => [newNote, ...prev]);
    }
    setNoteInput("");
  };

  const handleEditNote = (id) => {
    const note = notes.find((n) => n.id === id);
    if (note) {
      setNoteInput(note.content);
      setEditId(id);
    }
  };

  const handleDeleteNote = (id) => {
    if (
      window.confirm("Are you sure you want to delete this note?")
    ) {
      setNotes((prev) => prev.filter((note) => note.id !== id));
      if (editId === id) {
        setEditId(null);
        setNoteInput("");
      }
    }
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setNoteInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      handleAddNote();
    }
  };

  return (
    <section
      aria-labelledby="patient-notes-title"
      className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md"
    >
      <h2
        id="patient-notes-title"
        className="text-3xl font-extrabold text-blue-700 mb-6 text-center"
      >
        Patient Notes
      </h2>

      <div className="mb-6">
        <label htmlFor="note-input" className="block font-semibold text-gray-700 mb-2">
          {editId !== null ? "Edit Note" : "Add a New Note"}
        </label>
        <textarea
          id="note-input"
          ref={textareaRef}
          rows={4}
          value={noteInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Write your note here. Press Ctrl+Enter (Cmd+Enter) to save."
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none transition-colors"
          aria-multiline="true"
        />
        <div className="flex space-x-3 mt-3">
          <button
            onClick={handleAddNote}
            disabled={!noteInput.trim()}
            className={`px-6 py-2 font-semibold rounded-lg text-white transition-colors ${
              noteInput.trim()
                ? "bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
                : "bg-blue-700 opacity-50 cursor-not-allowed"
            }`}
            aria-disabled={!noteInput.trim()}
            type="button"
          >
            {editId !== null ? "Save Note" : "Add Note"}
          </button>
          {editId !== null && (
            <button
              onClick={handleCancelEdit}
              className="px-6 py-2 font-semibold rounded-lg bg-gray-300 text-gray-700 hover:bg-gray-400 focus:ring-4 focus:ring-gray-300 transition-colors"
              type="button"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      <ul className="space-y-5 max-h-[480px] overflow-y-auto">
        {notes.length === 0 && (
          <li className="text-center text-gray-500">No notes available.</li>
        )}
        {notes.map(({ id, content, createdAt }) => (
          <li
            key={id}
            className="border border-gray-300 rounded-lg p-4 shadow-sm bg-gray-50"
          >
            <div className="flex justify-between items-start">
              <p className="whitespace-pre-line text-gray-900">{content}</p>
              <div className="flex space-x-2 ml-4 flex-shrink-0">
                <button
                  onClick={() => handleEditNote(id)}
                  aria-label={`Edit note created on ${createdAt.toLocaleDateString()}`}
                  className="text-blue-600 hover:text-blue-800 focus:outline-none"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.232 5.232l3.536 3.536M9 11l6-6 3 3-6 6H9v-3z"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => handleDeleteNote(id)}
                  aria-label={`Delete note created on ${createdAt.toLocaleDateString()}`}
                  className="text-red-600 hover:text-red-800 focus:outline-none"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <time
              dateTime={createdAt.toISOString()}
              className="block mt-2 text-xs text-gray-500 select-none"
            >
              Created on {createdAt.toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </time>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PatientNotes;
