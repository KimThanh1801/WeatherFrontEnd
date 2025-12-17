import React from "react";

// Kiểu cho từng card info
interface InfoItem {
  label: string;
  value: string;
}

// Dữ liệu info
const info: InfoItem[] = [
  { label: "Feels Like", value: "64°" },
  { label: "Humidity", value: "46%" },
  { label: "Wind", value: "9 mph" },
  { label: "Precipitation", value: "0 in" },
];

const InfoCards: React.FC = () => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {info.map((item, index) => (
        <div
          key={index}
          className="bg-[#111234] p-4 rounded-2xl text-center"
        >
          <p className="text-sm opacity-70">{item.label}</p>
          <p className="text-2xl font-semibold mt-1">{item.value}</p>
        </div>
      ))}
    </div>
  );
};

export default InfoCards;
