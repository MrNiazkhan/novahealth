"use client";

import React, { useState, useEffect, useRef } from "react";

const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getDaysInMonth(year, month) {
  // Month is 0-based (0=Jan, 11=Dec)
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay(); // 0=Sun, 6=Sat
}

function isSameDate(d1, d2) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

const AppointmentsCalendar = ({ onDateSelect }) => {
  // State for current displayed month & year
  const [currentDate, setCurrentDate] = useState(() => new Date());
  // Selected date state
  const [selectedDate, setSelectedDate] = useState(null);

  // For accessibility focus management
  const gridRef = useRef(null);

  // Extract year and month from currentDate
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Calculate number of days and first weekday in current month
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  // Calculate previous month info (for leading blank days)
  const prevMonth = month === 0 ? 11 : month - 1;
  const prevYear = month === 0 ? year - 1 : year;
  const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth);

  // Today for reference
  const today = new Date();

  // Generate calendar days including previous month's trailing days & next month's leading days to fill 6 rows (42 cells)
  const calendarDays = [];

  // Fill previous month's trailing days
  for (let i = firstDay - 1; i >= 0; i--) {
    calendarDays.push({
      date: new Date(prevYear, prevMonth, daysInPrevMonth - i),
      isCurrentMonth: false,
    });
  }

  // Fill current month days
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push({
      date: new Date(year, month, day),
      isCurrentMonth: true,
    });
  }

  // Fill next month's leading days to complete 42 cells (6 weeks)
  const nextMonth = month === 11 ? 0 : month + 1;
  const nextYear = month === 11 ? year + 1 : year;
  while (calendarDays.length < 42) {
    const nextDay = calendarDays.length - (firstDay + daysInMonth) + 1;
    calendarDays.push({
      date: new Date(nextYear, nextMonth, nextDay),
      isCurrentMonth: false,
    });
  }

  // Handle prev month button click
  function goToPrevMonth() {
    setCurrentDate((prev) => {
      const y = prev.getFullYear();
      const m = prev.getMonth();
      return new Date(m === 0 ? y - 1 : y, m === 0 ? 11 : m - 1, 1);
    });
  }

  // Handle next month button click
  function goToNextMonth() {
    setCurrentDate((prev) => {
      const y = prev.getFullYear();
      const m = prev.getMonth();
      return new Date(m === 11 ? y + 1 : y, m === 11 ? 0 : m + 1, 1);
    });
  }

  // Handle date click - only allow current month dates for selection
  function handleDateClick(day) {
    if (!day.isCurrentMonth) return; // prevent selecting other months days
    setSelectedDate(day.date);
    if (onDateSelect) onDateSelect(day.date);
  }

  // Keyboard navigation (left/right/up/down arrows to navigate dates)
  function handleKeyDown(e) {
    if (!selectedDate) return;
    let newDate = new Date(selectedDate);
    switch (e.key) {
      case "ArrowLeft":
        newDate.setDate(newDate.getDate() - 1);
        break;
      case "ArrowRight":
        newDate.setDate(newDate.getDate() + 1);
        break;
      case "ArrowUp":
        newDate.setDate(newDate.getDate() - 7);
        break;
      case "ArrowDown":
        newDate.setDate(newDate.getDate() + 7);
        break;
      default:
        return;
    }
    // Only allow navigating within current month
    if (newDate.getMonth() === currentDate.getMonth()) {
      e.preventDefault();
      setSelectedDate(newDate);
      if (onDateSelect) onDateSelect(newDate);
    }
  }

  return (
    <section
      className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg select-none"
      aria-label="Appointments Calendar"
    >
      {/* Header with month navigation */}
      <header className="flex items-center justify-between mb-6">
        <button
          onClick={goToPrevMonth}
          aria-label="Previous Month"
          className="p-2 rounded-full hover:bg-indigo-100 transition"
        >
          <svg
            className="w-6 h-6 text-indigo-600"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <h2 className="text-lg font-semibold text-gray-900 select-none" aria-live="polite">
          {currentDate.toLocaleString("default", { month: "long" })} {year}
        </h2>
        <button
          onClick={goToNextMonth}
          aria-label="Next Month"
          className="p-2 rounded-full hover:bg-indigo-100 transition"
        >
          <svg
            className="w-6 h-6 text-indigo-600"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </header>

      {/* Weekday labels */}
      <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-gray-500 select-none">
        {WEEK_DAYS.map((day) => (
          <div key={day} className="uppercase">
            {day}
          </div>
        ))}
      </div>

      {/* Dates grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-7 gap-1 mt-2"
        role="grid"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        aria-label="Calendar dates"
      >
        {calendarDays.map((day, i) => {
          const isToday = isSameDate(day.date, today);
          const isSelected = selectedDate && isSameDate(day.date, selectedDate);
          const isDisabled = !day.isCurrentMonth || day.date < today.setHours(0, 0, 0, 0); // Disable past dates (optional)

          return (
            <button
              key={i}
              type="button"
              className={`
                aspect-square w-full rounded-md text-sm
                flex items-center justify-center
                transition
                ${
                  isSelected
                    ? "bg-indigo-600 text-white shadow-lg"
                    : isToday
                    ? "border border-indigo-600 text-indigo-600 font-semibold"
                    : day.isCurrentMonth
                    ? "text-gray-900 hover:bg-indigo-50"
                    : "text-gray-400 cursor-default"
                }
                ${isDisabled && "cursor-not-allowed opacity-50 pointer-events-none"}
              `}
              onClick={() => handleDateClick(day)}
              aria-selected={isSelected}
              tabIndex={isSelected ? 0 : -1}
              aria-disabled={isDisabled}
              role="gridcell"
              aria-label={`${day.date.toLocaleDateString(undefined, {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })} ${isDisabled ? "not selectable" : "selectable"}`}
            >
              {day.date.getDate()}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default AppointmentsCalendar;
