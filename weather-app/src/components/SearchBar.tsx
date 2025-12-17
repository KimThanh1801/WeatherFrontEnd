import React, { useState, useEffect } from "react";
import { Images } from "../assets";

interface SearchBarProps {
  onSearch: (query: string) => void;
  noResult?: boolean;
  loading?: boolean; 
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, noResult }) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [allProvinces, setAllProvinces] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch danh sách tỉnh/thành khi component mount
  useEffect(() => {
    fetch("https://vn-public-apis.fpo.vn/provinces/getAll?limit=-1")
      .then(res => res.json())
      .then(apiRes => {
        console.log("API response:", apiRes);
        const provinces = Array.isArray(apiRes.data)
          ? apiRes.data.map((p: any) => p.province_name)
          : [];
        setAllProvinces(provinces);
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);


  // Gợi ý tự động khi gõ
  const handleChange = (value: string) => {
    setInputValue(value);

    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    const filtered = allProvinces.filter(city =>
      city.toLowerCase().includes(value.toLowerCase())
    );

    setSuggestions(filtered);
  };

  const handleSelect = (city: string) => {
    setInputValue(city);
    setSuggestions([]);
    onSearch(city);
  };

  const handleSearch = () => {
    setSuggestions([]);
    onSearch(inputValue);
  };

  return (
    <div className="w-full flex flex-col items-center mt-4 px-2 sm:px-4 relative">
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-2xl relative">
        <img
          src={Images.SearchIcon}
          alt="Search"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 pointer-events-none"
        />
        <input
          placeholder="Search for a city..."
          value={inputValue}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch(); // Gọi hàm search khi nhấn Enter
            }
          }}
          className="
            bg-[#1c203f] text-white rounded-xl outline-none
            px-10 py-2 sm:px-12 sm:py-3
            flex-1 text-sm sm:text-base
          "
        />
        <button
          onClick={handleSearch}
          className="
            bg-[#4b6bff] text-white rounded-xl
            px-4 py-2 sm:px-5 sm:py-3
            text-sm sm:text-base flex-shrink-0
          "
        >
          Search
        </button>
      </div>

      {/* Loading indicator */}
      {loading && (
        <p className="text-white mt-2 text-sm">Loading provinces...</p>
      )}

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <ul className="absolute top-full mt-1 w-full max-w-2xl bg-[#1c203f] rounded-xl shadow-lg z-50">
          {suggestions.map((city, i) => (
            <li
              key={i}
              onClick={() => handleSelect(city)}
              className="px-4 py-2 cursor-pointer hover:bg-[#2a2e54] text-white"
            >
              {city}
            </li>
          ))}
        </ul>
      )}

      {/* No results */}
      {!loading && noResult && suggestions.length === 0 && inputValue.trim() !== "" && (
        <p className="text-white font-bold mt-2 text-center text-xs sm:text-sm">
          No search results found!
        </p>
      )}
    </div>
  );
};

export default SearchBar;
