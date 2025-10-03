import { getWeatherDescription } from "./WeatherDisplay";

function Forecast({ data }) {
  return (
    <div className="forecast">
      <h3>5-Day Forecast</h3>
      <div className="forecast-grid">
        {data.slice(0, 5).map((day, i) => (
          <div key={i} className="forecast-card">
            <p>{new Date(day.date).toLocaleDateString()}</p>
            <p>⬆️ {day.max}°C</p>
            <p>⬇️ {day.min}°C</p>
            <p>{getWeatherDescription(day.code)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;
