import React, { useState } from "react";

export default function SearchBar({ onSearch, noResult }) {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="w-full flex flex-col items-center mt-4">
      <div className="flex gap-3">
        <input
          placeholder="Search for a city..."
          className="bg-[#1c203f] w-96 px-4 py-3 rounded-xl text-white outline-none"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          onClick={() => onSearch(inputValue)}
          className="bg-[#4b6bff] text-white px-5 py-3 rounded-xl"
        >
          Search
        </button>
      </div>

      {noResult && (
<p className="text-white font-bold mt-2">No search results found!</p>
      )}
    </div>
  );
}
