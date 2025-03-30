import React from "react";

function DateButton({ text, date, selectedDate, setSelectedDate }) {
  return (
    <button
      onClick={() => setSelectedDate(date)}
      className={`px-4 py-2 rounded-full text-white transition-all ${
        selectedDate === date
          ? "bg-primary scale-105"
          : "bg-gray-700 hover:bg-gray-600 cursor-pointer"
      }`}
    >
      {text}
    </button>
  );
}

export default DateButton;
