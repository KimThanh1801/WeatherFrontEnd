import { useState } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import WeatherDashboard from "../components/WeatherDashboard";
import { getWeather, getForecast } from "../api/weatherApi";

interface Condition {
  text: string;
  icon: string;
}

interface CurrentWeather {
  temp_c?: number;
  feelslike_c?: number;
  humidity?: number;
  wind_kph?: number;
  precip_mm?: number;
  condition?: Condition;
}

interface Location {
  name: string;
  country?: string;
}

export interface WeatherData {
  current?: CurrentWeather;
  location?: Location;
}

interface HourlyData {
  time: string;
  temp_c: number;
  condition: Condition;
}

interface DailyData {
  date: string;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    condition: Condition;
  };
  hour: HourlyData[];
}

export default function Home() {
  const [weather, setWeather] = useState<WeatherData>({});
  const [forecast, setForecast] = useState<DailyData[]>([]);
  const [noResult, setNoResult] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async (city: string) => {
    if (!city.trim()) return;
    setNoResult(false);
    setLoading(true);

    try {
      // Chạy song song để tránh Waterfall Request
      const [weatherData, forecastData] = await Promise.all([
        getWeather(city),
        getForecast(city, 7),
      ]);

      if (!weatherData || !forecastData) {
        setWeather({});
        setForecast([]);
        setNoResult(true);
      } else {
        setWeather(weatherData);
        setForecast(forecastData);
      }
    } catch (error) {
      console.error(error);
      setWeather({});
      setForecast([]);
      setNoResult(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0e2a]">
      <Header />
      <h1 className="text-center text-white text-4xl font-bold mt-4">
        How's the sky looking today?
      </h1>

      {/* Truyền cả loading vào SearchBar để hiển thị trạng thái */}
      <SearchBar
        onSearch={handleSearch}
        noResult={noResult}
        loading={loading} // thêm prop này
      />

      {/* WeatherDashboard */}
      <WeatherDashboard weather={weather} forecast={forecast} loading={loading} />
    </div>
  );
}
