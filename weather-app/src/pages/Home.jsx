import { useState } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import WeatherDashboard from "../components/WeatherDashboard";
import { getWeather, getForecast } from "../api/weatherApi";

export default function Home() {
  const [weather, setWeather] = useState({
    city: "",
    temp: null,
    condition: "",
  });
  const [forecast, setForecast] = useState([]);
  const [noResult, setNoResult] = useState(false);

  const handleSearch = async (city) => {
    setNoResult(false);

    try {
      const weatherData = await getWeather(city);
      const forecastData = await getForecast(city, 7);
      if (!weatherData || !forecastData) {
        setWeather({
          city: "",
          temp: null,
          condition: "",
        });
        setForecast([]);
        setNoResult(true);
        return;
      }

      setWeather(weatherData);
      setForecast(forecastData);
    } catch (error) {
      console.error(error);
      setWeather({
        city: "",
        temp: null,
        condition: "",
      });
      setForecast([]);
      setNoResult(true);
    }
  };
  return (
    <div className="min-h-screen bg-[#0b0e2a]">
      <Header />
      <h1 className="text-center text-white text-4xl font-bold mt-4">
        How's the sky looking today?
      </h1>
      <SearchBar onSearch={handleSearch} noResult={noResult} />
      <WeatherDashboard weather={weather} forecast={forecast} />
    </div>
  );
}
