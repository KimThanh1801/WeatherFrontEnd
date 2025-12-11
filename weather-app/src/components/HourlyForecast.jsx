import React, { useState } from "react";

export default function HourlyForecast({ hourly }) {
  const [selectedDay, setSelectedDay] = useState(0);

  // ⚠️ Nếu hourly chưa có dữ liệu → hiện skeleton
  if (!hourly || hourly.length === 0) {
    return (
      <div className="w-80 bg-[#111234] p-5 rounded-3xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Hourly forecast</h3>
          <div className="w-10 h-6 bg-[#2a2e54] rounded animate-pulse"></div>
        </div>

        <div className="flex flex-col gap-3">
          {[1,2,3,4,5,6,7,8].map(i => (
            <div
              key={i}
              className="w-full h-12 bg-[#2a2e54] rounded-xl animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  // ----------------------
  // ✔ Lấy danh sách ngày nhưng chỉ giữ "weekday"
  // ----------------------
  const days = Array.from(
    new Set(
      hourly.map(h =>
        new Date(h.time).toLocaleDateString("en-US", {
          weekday: "long"
        })
      )
    )
  );

  const filteredHourly = hourly
    .filter(
      h =>
        new Date(h.time).toLocaleDateString("en-US", {
          weekday: "long"
        }) === days[selectedDay]
    )
    .slice(0, 8);

  return (
    <div className="w-80 bg-[#111234] p-5 rounded-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Hourly forecast</h3>

        <select
          className="bg-[#2a2e54] text-white p-1 rounded"
          value={selectedDay}
          onChange={(e) => setSelectedDay(Number(e.target.value))}
        >
          {days.map((day, idx) => (
            <option key={idx} value={idx}>{day}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-3">
        {filteredHourly.map((hour, index) => {
          const date = new Date(hour.time);
          let hours = date.getHours();
          const ampm = hours >= 12 ? "PM" : "AM";
          hours = hours % 12 || 12;

          return (
            <div
              key={index}
              className="flex justify-between items-center bg-[#2a2e54] p-3 rounded-xl"
            >
              <div className="flex items-center gap-2">
                <img src={hour.condition.icon} alt={hour.condition.text} className="w-8" />
                <span>{hours} {ampm}</span>
              </div>
              <p className="font-semibold">{Math.round(hour.temp_c)}°C</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
