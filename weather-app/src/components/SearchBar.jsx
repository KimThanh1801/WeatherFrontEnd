// import React, { useState } from "react";

// export default function SearchBar({ onSearch, noResult }) {
//   const [inputValue, setInputValue] = useState("");

//   return (
//     <div className="w-full flex flex-col items-center mt-4">
//       <div className="flex gap-3">
//         <input
//           placeholder="Search for a city..."
//           className="bg-[#1c203f] w-96 px-4 py-3 rounded-xl text-white outline-none"
//           value={inputValue}
//           onChange={(e) => setInputValue(e.target.value)}
//         />
//         <button
//           onClick={() => onSearch(inputValue)}
//           className="bg-[#4b6bff] text-white px-5 py-3 rounded-xl"
//         >
//           Search
//         </button>
//       </div>

//       {noResult && (
// <p className="text-white font-bold mt-2">No search results found!</p>
//       )}
//     </div>
//   );
// }

import React, { useState } from "react";

export default function SearchBar({ onSearch, noResult }) {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="w-full flex flex-col items-center mt-4 px-2 sm:px-4">
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-2xl">
        {/* Input */}
        <input
          placeholder="Search for a city..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="
            bg-[#1c203f] text-white rounded-xl outline-none
            px-3 py-2 sm:px-4 sm:py-3
            flex-1
            text-sm sm:text-base
          "
        />

        {/* Button */}
        <button
          onClick={() => onSearch(inputValue)}
          className="
            bg-[#4b6bff] text-white rounded-xl
            px-4 py-2 sm:px-5 sm:py-3
            text-sm sm:text-base
            flex-shrink-0
          "
        >
          Search
        </button>
      </div>

      {noResult && (
        <p className="text-white font-bold mt-2 text-center text-xs sm:text-sm">
          No search results found!
        </p>
      )}
    </div>
  );
}

