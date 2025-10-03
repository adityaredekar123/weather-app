import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import WeatherDisplay from "./components/WeatherDisplay";
import Forecast from "./components/Forecast";
import "./App.css";

function App() {
  const [city, setCity] = useState(() => {
    return localStorage.getItem("lastCity") || "";
  });
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async (cityName) => {
    if (!cityName) return;
    setLoading(true);
    setError("");
    try {
      // Step 1: Geocoding
      const geoRes = await axios.get(
        `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1`
      );

      if (!geoRes.data.results || geoRes.data.results.length === 0) {
        throw new Error("City not found");
      }

      const { latitude, longitude, name, country } = geoRes.data.results[0];

      // Step 2: Weather & Forecast
      const weatherRes = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`
      );

      setWeather({
        name,
        country,
        temp: weatherRes.data.current_weather.temperature,
        wind: weatherRes.data.current_weather.windspeed,
        conditionCode: weatherRes.data.current_weather.weathercode,
      });

      // Forecast (with weather code per day)
      const forecastData = weatherRes.data.daily.time.map((date, i) => ({
        date,
        max: weatherRes.data.daily.temperature_2m_max[i],
        min: weatherRes.data.daily.temperature_2m_min[i],
        code: weatherRes.data.daily.weathercode[i],
      }));

      setForecast(forecastData);

      setCity(cityName);
      localStorage.setItem("lastCity", cityName);
    } catch (err) {
      console.error(err);
      setError("City not found. Please try again.");
      setWeather(null);
      setForecast([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (city) fetchWeather(city);
  }, []);

  return (
    <div className="app">
      <h1>🌦️ Weather App </h1>
      <SearchBar onSearch={fetchWeather} />
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {weather && <WeatherDisplay data={weather} />}
      {forecast.length > 0 && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
