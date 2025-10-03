function getWeatherDescription(code) {
  const codes = {
    0: "☀️ Clear sky",
    1: "🌤️ Mainly clear",
    2: "⛅ Partly cloudy",
    3: "☁️ Overcast",
    45: "🌫️ Fog",
    48: "🌫️ Depositing rime fog",
    51: "🌦️ Light drizzle",
    53: "🌦️ Moderate drizzle",
    55: "🌦️ Dense drizzle",
    61: "🌧️ Slight rain",
    63: "🌧️ Moderate rain",
    65: "🌧️ Heavy rain",
    71: "🌨️ Slight snow fall",
    73: "🌨️ Moderate snow fall",
    75: "🌨️ Heavy snow fall",
    77: "❄️ Snow grains",
    80: "🌧️ Rain showers (slight)",
    81: "🌧️ Rain showers (moderate)",
    82: "🌧️ Rain showers (violent)",
    85: "🌨️ Snow showers (slight)",
    86: "🌨️ Snow showers (heavy)",
    95: "⛈️ Thunderstorm",
    96: "⛈️ Thunderstorm with slight hail",
    99: "⛈️ Thunderstorm with heavy hail",
  };
  return codes[code] || "🌍 Unknown";
}

function WeatherDisplay({ data }) {
  return (
    <div className="weather-card">
      <h2>
        {data.name}, {data.country}
      </h2>
      <p>🌡️ {Math.round(data.temp)}°C</p>
      <p>💨 Wind: {data.wind} km/h</p>
      <p>{getWeatherDescription(data.conditionCode)}</p>
    </div>
  );
}

export default WeatherDisplay;
export { getWeatherDescription };
