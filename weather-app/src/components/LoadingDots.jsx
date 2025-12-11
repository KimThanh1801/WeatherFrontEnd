import React from "react";

export default function LoadingDots({ message = "Loading" }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex gap-3 text-white text-6xl"> {/* Tăng size */}
        <span className="animate-bounce">.</span>
        <span className="animate-bounce delay-150">.</span>
        <span className="animate-bounce delay-300">.</span>
      </div>
      <p className="text-sm opacity-70 mt-4">{message}</p> {/* Có thể tăng margin */}
    </div>
  );
}
