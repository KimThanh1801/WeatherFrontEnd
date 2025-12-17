import React, { useState } from "react";
import { Icons } from "../assets"; // import map Icons

interface HourlyData {
  time: string; // ISO string
  temp_c: number;
  condition: {
    text: string; // ví dụ: "Sunny", "Rain", "Cloudy"...
  };
}

interface HourlyForecastProps {
  hourly?: HourlyData[];
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ hourly }) => {
  const [selectedDay, setSelectedDay] = useState<number>(0);

  if (!hourly || hourly.length === 0) {
    return (
      <div className="w-full max-w-xs sm:max-w-sm bg-[#111234] p-4 sm:p-5 rounded-3xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-base sm:text-lg font-semibold">Hourly forecast</h3>
          <div className="w-10 h-6 bg-[#2a2e54] rounded animate-pulse"></div>
        </div>
        <div className="flex flex-col gap-3">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="w-full h-12 sm:h-14 bg-[#2a2e54] rounded-xl animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  // Lấy danh sách các ngày duy nhất
  const days = Array.from(
    new Set(
      hourly.map((h) =>
        new Date(h.time).toLocaleDateString("en-US", { weekday: "long" })
      )
    )
  );

  // Lọc dữ liệu theo ngày được chọn
  const filteredHourly = hourly
    .filter(
      (h) =>
        new Date(h.time).toLocaleDateString("en-US", { weekday: "long" }) ===
        days[selectedDay]
    )
    .slice(0, 8);

  // Lấy icon từ map Icons
  const getIcon = (conditionText: string) =>
    Icons[conditionText as keyof typeof Icons] || Icons["Sunny"];

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
            <option key={idx} value={idx}>
              {day}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-row sm:flex-col gap-3 sm:gap-3 overflow-x-auto sm:overflow-x-visible">
        {filteredHourly.map((hour, index) => {
          const date = new Date(hour.time);
          let hours = date.getHours();
          const ampm = hours >= 12 ? "PM" : "AM";
          hours = hours % 12 || 12;

          const iconSrc = getIcon(hour.condition.text);

          return (
            <div
              key={index}
              className="flex justify-between items-center bg-[#2a2e54] p-3 rounded-xl min-w-[70px] sm:min-w-full flex-shrink-0"
            >
              <div className="flex items-center gap-2">
                <img
                  src={iconSrc}
                  alt={hour.condition.text}
                  className="w-6 sm:w-8 h-6 sm:h-8"
                />
                <span className="text-xs sm:text-sm">
                  {hours} {ampm}
                </span>
              </div>
              <p className="text-sm sm:text-base font-semibold">
                {Math.round(hour.temp_c)}°C
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HourlyForecast;
