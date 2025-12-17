import React, { useState, useRef, useEffect } from "react";
import { Images } from "../assets";

// Kiểu props cho UnitItem
interface UnitItemProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

function UnitItem({ label, selected, onClick }: UnitItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm
        ${selected ? "bg-[#343a6f]" : "bg-[#1c203f] hover:bg-[#2d325c]"}
      `}
    >
      <span>{label}</span>
      <span className="opacity-50">›</span>
    </button>
  );
}

// Header component
const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const [tempUnit, setTempUnit] = useState<"C" | "F">("C");
  const [windUnit, setWindUnit] = useState<"kmh" | "mph">("kmh");
  const [rainUnit, setRainUnit] = useState<"mm" | "inch">("mm");

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="flex justify-between items-center w-full px-[40px] py-[40px] relative">
      <h1 className="text-xl font-semibold text-white flex items-center gap-2">
        {/* <span className="text-yellow-400 text-2xl">☀️</span>
        Weather Now */}
        <img src={Images.Logo} alt="Logo" className="text-yellow-400 text-2xl" />
      </h1>

      <button
        onClick={() => setOpen(!open)}
        className="bg-[#1c203f] text-white px-4 py-2 rounded-xl text-sm flex items-center gap-2"
      >
        Units ▾
      </button>

      {open && (
        <div
          ref={menuRef}
          className="
            absolute right-[40px] top-[95px] w-64 
            bg-[#1c203f] text-white rounded-2xl p-4 
            shadow-xl border border-[#2a2e54] z-50
            transition-all duration-200
            animate-[fadeIn_0.2s_ease-out]
          "
        >
          <p className="text-sm opacity-80 mb-3">Switch Units</p>

          <p className="text-xs opacity-70 mb-2">Temperature</p>
          <div className="flex flex-col gap-1 mb-4">
            <UnitItem
              label="Celsius (°C)"
              selected={tempUnit === "C"}
              onClick={() => setTempUnit("C")}
            />
            <UnitItem
              label="Fahrenheit (°F)"
              selected={tempUnit === "F"}
              onClick={() => setTempUnit("F")}
            />
          </div>

          <p className="text-xs opacity-70 mb-2">Wind Speed</p>
          <div className="flex flex-col gap-1 mb-4">
            <UnitItem
              label="km/h"
              selected={windUnit === "kmh"}
              onClick={() => setWindUnit("kmh")}
            />
            <UnitItem
              label="mph"
              selected={windUnit === "mph"}
              onClick={() => setWindUnit("mph")}
            />
          </div>

          <p className="text-xs opacity-70 mb-2">Precipitation</p>
          <div className="flex flex-col gap-1">
            <UnitItem
              label="Millimeters (mm)"
              selected={rainUnit === "mm"}
              onClick={() => setRainUnit("mm")}
            />
            <UnitItem
              label="Inches (in)"
              selected={rainUnit === "inch"}
              onClick={() => setRainUnit("inch")}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
