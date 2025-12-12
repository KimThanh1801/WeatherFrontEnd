import React, { useState } from "react";

export default function HourlyForecast({ hourly }) {
  const [selectedDay, setSelectedDay] = useState(0);

  // Skeleton
  if (!hourly || hourly.length === 0) {
    return (
      <div className="w-full max-w-xs sm:max-w-sm bg-[#111234] p-4 sm:p-5 rounded-3xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-base sm:text-lg font-semibold">Hourly forecast</h3>
          <div className="w-10 h-6 bg-[#2a2e54] rounded animate-pulse"></div>
        </div>

        <div className="flex flex-col gap-3">
          {[1,2,3,4,5,6,7,8].map(i => (
            <div
              key={i}
              className="w-full h-12 sm:h-14 bg-[#2a2e54] rounded-xl animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  const days = Array.from(new Set(hourly.map(h =>
    new Date(h.time).toLocaleDateString("en-US", { weekday: "long" })
  )));

  const filteredHourly = hourly
    .filter(h => new Date(h.time).toLocaleDateString("en-US", { weekday: "long" }) === days[selectedDay])
    .slice(0, 8);

  return (
    <div className="w-full max-w-xs sm:max-w-sm bg-[#111234] p-4 sm:p-5 rounded-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base sm:text-lg font-semibold">Hourly forecast</h3>
        <select
          className="bg-[#2a2e54] text-white text-sm sm:text-base p-1 sm:p-2 rounded"
          value={selectedDay}
          onChange={(e) => setSelectedDay(Number(e.target.value))}
        >
          {days.map((day, idx) => (
            <option key={idx} value={idx}>{day}</option>
          ))}
        </select>
      </div>

      {/* Mobile: cuộn ngang; Desktop: dọc với icon + giờ bên trái, nhiệt độ bên phải */}
      <div className="flex flex-col sm:flex-col gap-3 sm:gap-3 overflow-x-auto sm:overflow-x-visible">
        {filteredHourly.map((hour, index) => {
          const date = new Date(hour.time);
          let hours = date.getHours();
          const ampm = hours >= 12 ? "PM" : "AM";
          hours = hours % 12 || 12;

          return (
            <div
              key={index}
              className="flex justify-between items-center bg-[#2a2e54] p-3 rounded-xl min-w-[70px] sm:min-w-full flex-shrink-0"
            >
              {/* Icon + giờ bên trái */}
              <div className="flex items-center gap-2">
                <img
                  src={hour.condition.icon}
                  alt={hour.condition.text}
                  className="w-6 sm:w-8 h-6 sm:h-8"
                />
                <span className="text-xs sm:text-sm">{hours} {ampm}</span>
              </div>

              {/* Nhiệt độ bên phải */}
              <p className="text-sm sm:text-base font-semibold">
                {Math.round(hour.temp_c)}°C
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
