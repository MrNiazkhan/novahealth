"use client";

import React, { useState, useRef, useCallback } from "react";

const MAX_FILE_SIZE_MB = 10; // Max file size allowed
const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/jpg",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const formatFileSize = (bytes) => {
  if (bytes < 1024) return bytes + " B";
  else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  else return (bytes / (1024 * 1024)).toFixed(2) + " MB";
};

const PatientDocumentsUpload = () => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);

  const validateFile = (file) => {
    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      return `File type not supported: ${file.name}`;
    }
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      return `File too large (max ${MAX_FILE_SIZE_MB} MB): ${file.name}`;
    }
    return null;
  };

  const handleFiles = (selectedFiles) => {
    let newFiles = [];
    let validationError = "";

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      const err = validateFile(file);
      if (err) {
        validationError = err;
        break;
      }
      newFiles.push(file);
    }

    if (validationError) {
      setError(validationError);
      return;
    }

    // Avoid duplicate files by name+size
    setFiles((prev) => {
      const filteredPrev = prev.filter(
        (f) => !newFiles.some((nf) => nf.name === f.name && nf.size === f.size)
      );
      return [...filteredPrev, ...newFiles];
    });
    setError("");
  };

  const onInputChange = (e) => {
    if (!e.target.files) return;
    handleFiles(e.target.files);
    e.target.value = null; // reset input
  };

  const onDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <section
      aria-labelledby="documents-upload-title"
      className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md"
    >
      <h2
        id="documents-upload-title"
        className="text-3xl font-extrabold text-blue-700 mb-6 text-center"
      >
        Upload Documents
      </h2>

      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`border-4 border-dashed rounded-lg p-10 cursor-pointer transition-colors ${
          dragActive ? "border-blue-600 bg-blue-50" : "border-gray-300 bg-gray-50"
        } flex flex-col items-center justify-center text-center`}
        onClick={openFileDialog}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            openFileDialog();
          }
        }}
        aria-describedby="documents-upload-desc"
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={onInputChange}
          accept={ACCEPTED_FILE_TYPES.join(",")}
          className="hidden"
          aria-hidden="true"
        />
        <svg
          className="w-12 h-12 text-blue-500 mb-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 16v4h10v-4M7 12l5-5 5 5M12 3v9"
          />
        </svg>
        <p className="text-lg font-medium text-blue-700 mb-1">
          Drag & drop files here, or click to select files
        </p>
        <p
          id="documents-upload-desc"
          className="text-sm text-gray-600 select-none"
        >
          Supported formats: PDF, JPG, PNG, DOC, DOCX. Max file size: {MAX_FILE_SIZE_MB}MB
        </p>
      </div>

      {error && (
        <p
          role="alert"
          className="mt-4 text-center text-red-600 font-semibold"
          aria-live="assertive"
        >
          {error}
        </p>
      )}

      {files.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-900">
            Uploaded Files
          </h3>
          <ul className="space-y-3 max-h-60 overflow-y-auto">
            {files.map((file, idx) => (
              <li
                key={`${file.name}-${file.size}-${idx}`}
                className="flex items-center justify-between border border-gray-300 rounded-md p-3 shadow-sm"
              >
                <div className="flex items-center space-x-3 overflow-hidden">
                  <svg
                    className="w-6 h-6 text-gray-600 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"
                    />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 2v6h6" />
                  </svg>
                  <div className="truncate max-w-xs" title={file.name}>
                    {file.name}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">
                    {formatFileSize(file.size)}
                  </span>
                  <button
                    onClick={() => removeFile(idx)}
                    type="button"
                    aria-label={`Remove file ${file.name}`}
                    className="text-red-600 hover:text-red-800 focus:outline-none"
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
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default PatientDocumentsUpload;
