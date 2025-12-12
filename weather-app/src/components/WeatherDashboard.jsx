import React from "react";
import HourlyForecast from "./HourlyForecast";
import DailyForecast from "./DailyForecast";
import LoadingDots from "./LoadingDots";

const WeatherDashboard = ({ weather = {}, forecast = [] }) => {
  const isLoading = !weather.current;

  const current = weather.current || {};
  const location = weather.location || { name: "Unknown", country: "" };
  const city = location.name;
  const country = location.country;
  const temp = current.temp_c ? Math.round(current.temp_c) : "--";
  const feelsLike = current.feelslike_c ? Math.round(current.feelslike_c) : "--";
  const humidity = current.humidity || "--";
  const wind = current.wind_kph ? Math.round(current.wind_kph) : "--";
  const precipitation = current.precip_mm || "--";
  const iconUrl = current.condition?.icon || "/default-icon.png";

  const hourly = forecast?.flatMap(day => day.hour) || [];

  return (
    <div className="bg-[#0b0c2a] min-h-screen p-4 sm:p-8 text-white flex flex-col lg:flex-row gap-6">

      <div className="flex flex-col lg:flex-row w-full gap-6 justify-between">

        <div className="flex flex-col gap-6 flex-1">
          <div className={`p-6 rounded-3xl flex items-center justify-center ${isLoading ? "bg-[#111234] h-[220px]" : "bg-gradient-to-br from-[#3a2eff] to-[#7a5bff] shadow-lg flex-col w-full"}`}>
            {isLoading ? (
              <LoadingDots message="Loading..." />
            ) : (
              <>
                <div className="w-full text-left">
                  <h2 className="text-xl sm:text-2xl font-semibold">{city}, {country}</h2>
                  <p className="text-xs sm:text-sm opacity-80">
                    {new Date().toLocaleDateString("en-US", {
                      weekday: 'long',
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between mt-4 sm:mt-6 w-full gap-4">
                  <img src={iconUrl} alt={current.condition?.text || ""} className="w-16 sm:w-20" />
                  <h1 className="text-4xl sm:text-6xl font-bold">{temp}°C</h1>
                </div>
              </>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {["Feels Like", "Humidity", "Wind", "Precipitation"].map((label, idx) => (
              <div key={idx} className={`bg-[#111234] p-3 rounded-xl text-center h-28 sm:h-32 flex flex-col justify-center ${isLoading ? "animate-pulse" : ""}`}>
                <p className="text-xs sm:text-sm opacity-70">{label}</p>
                <p className="text-lg sm:text-xl font-semibold mt-1 sm:mt-2">
                  {isLoading ? "-" :
                    idx === 0 ? `${feelsLike}°C` :
                      idx === 1 ? `${humidity}%` :
                        idx === 2 ? `${wind} km/h` :
                          `${precipitation} mm`
                  }
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <DailyForecast data={forecast} loading={isLoading || forecast.length === 0} />
          </div>
        </div>

        <div className="w-full max-w-xs sm:max-w-sm bg-[#111234] rounded-3xl mx-auto">
          <HourlyForecast hourly={hourly} />
        </div>

      </div>
    </div>
  );
};

export default WeatherDashboard;
