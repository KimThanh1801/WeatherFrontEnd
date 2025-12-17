import React from "react";

// Định nghĩa kiểu dữ liệu cho từng giờ
interface HourlyData {
  time_epoch: number;
  temp_c: number;
  condition: {
    text: string;
    icon: string;
  };
}

// Props cho component
interface HourlyForecastProps {
  data?: HourlyData[];
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ data }) => {
  if (!data) return null;

  return (
    <div className="bg-[#1c1f3b] text-white p-4 rounded-2xl mt-10 w-full max-w-4xl mx-auto">
      <h3 className="text-lg font-semibold mb-4">Dự báo theo giờ</h3>

      {/* Scroll ngang */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {data.slice(0, 24).map((item, index) => {
          const date = new Date(item.time_epoch * 1000);
          let hours = date.getHours();
          const ampm = hours >= 12 ? "PM" : "AM";
          hours = hours % 12 || 12;

          return (
            <div
              key={index}
              className="flex flex-col items-center justify-center bg-[#2a2e54] p-3 rounded-xl min-w-[70px] sm:min-w-[80px] md:min-w-[90px] flex-shrink-0"
            >
              {/* Icon */}
              <img
                src={item.condition.icon}
                alt={item.condition.text}
                className="w-8 h-8 sm:w-10 sm:h-10"
              />
              {/* Giờ */}
              <span className="font-medium mt-1 text-xs sm:text-sm">
                {hours} {ampm}
              </span>
              {/* Nhiệt độ */}
              <p className="font-semibold text-sm sm:text-base mt-1">
                {Math.round(item.temp_c)}°C
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HourlyForecast;
