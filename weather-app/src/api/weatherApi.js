const API_KEY = "a063cc5a579441f6b02133003251112";


// Lấy weather hiện tại
export const getWeather = async (city) => {
  try {
    const res = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`
    );
    const data = await res.json();

    if (data.error) {
      console.error("Lỗi API:", data.error.message);
      return null;
    }

    return data; // Dữ liệu weather hiện tại
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu thời tiết:", error);
    return null;
  }
};

// Lấy forecast 3–5 ngày
export const getForecast = async (city, days = 3) => {
  try {
    const res = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=${days}&aqi=no&alerts=no`
    );
    const data = await res.json();

    if (data.error) {
      console.error("Lỗi API forecast:", data.error.message);
      return null;
    }

    return data.forecast.forecastday; // Danh sách forecast theo ngày
  } catch (error) {
    console.error("Lỗi khi lấy forecast:", error);
    return null;
  }
};