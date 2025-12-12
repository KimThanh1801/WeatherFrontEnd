import React from "react";
export default function DailyForecast({ data = [], loading }) {
  if (loading || data.length === 0) {
    return (
      <div className="px-2 sm:px-4">
        <p className="text-sm mb-2 text-white">Daily forecast</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className="bg-[#1c203f] h-20 sm:h-24 md:h-28 rounded-xl animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="px-2 sm:px-4">
      <p className="text-sm mb-2 text-white">Daily forecast</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {data.map((d, i) => (
          <div
            key={i}
            className="bg-[#1c203f] p-2 sm:p-3 md:p-4 rounded-xl text-center text-white"
          >
            <p className="font-semibold text-xs sm:text-sm md:text-base">
              {new Date(d.date).toLocaleDateString("en-US", { weekday: "short" })}
            </p>

            <img
              src={d.day.condition.icon}
              alt={d.day.condition.text}
              className="w-8 sm:w-10 md:w-12 mx-auto my-1 sm:my-2"
            />

            <p className="text-xs sm:text-sm md:text-base">
              {Math.round(d.day.maxtemp_c)}° / {Math.round(d.day.mintemp_c)}°
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
