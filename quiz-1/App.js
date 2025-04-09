import React, { useState } from "react";

const WeatherApp = () => {
  const [weather, setWeather] = useState({
    temperature: 22,
    condition: "Sunny",
  });

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case "Sunny":
        return "☀";
      case "Cloudy":
        return "☁";
      case "Partly Cloudy":
        return "⛅";
      default:
        return "🌤";
    }
  };

  const handleConditionChange = (event) => {
    const selectedCondition = event.target.value;
    let temperature = 22;
    if (selectedCondition === "Sunny") temperature = 30;
    else if (selectedCondition === "Cloudy") temperature = 18;
    else if (selectedCondition === "Partly Cloudy") temperature = 25;

    setWeather({
      temperature,
      condition: selectedCondition,
    });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Weather App</h1>
      <div style={styles.weatherIcon}>{getWeatherIcon(weather.condition)}</div>
      <div style={styles.temperature}>{weather.temperature}°C</div>
      <div style={styles.condition}>{weather.condition}</div>
      <select
        onChange={handleConditionChange}
        value={weather.condition}
        style={styles.dropdown}
      >
        <option value="Sunny">Sunny</option>
        <option value="Cloudy">Cloudy</option>
        <option value="Partly Cloudy">Partly Cloudy</option>
      </select>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    background: "linear-gradient(to bottom, #FF7E5F, #FEB47B)",
    fontFamily: "'Roboto', sans-serif",
    textAlign: "center",
  },
  title: {
    fontSize: "3.5rem",
    marginBottom: "1.5rem",
    color: "#ffffff",
    textShadow: "3px 3px 6px rgba(0,0,0,0.4)",
  },
  weatherIcon: {
    fontSize: "6rem",
    marginBottom: "1rem",
    textShadow: "4px 4px 8px rgba(0,0,0,0.3)",
  },
  temperature: {
    fontSize: "5.5rem",
    fontWeight: "bold",
    marginBottom: "0.5rem",
    color: "#ffffff",
    textShadow: "4px 4px 8px rgba(0,0,0,0.5)",
  },
  condition: {
    fontSize: "2.5rem",
    color: "#ffffff",
    marginBottom: "1.5rem",
  },
  dropdown: {
    padding: "1rem",
    fontSize: "1.5rem",
    borderRadius: "12px",
    border: "2px solid #ffffff",
    backgroundColor: "#FF5733",
    color: "#ffffff",
    cursor: "pointer",
    boxShadow: "4px 4px 10px rgba(0,0,0,0.3)",
    transition: "all 0.3s ease",
  },
};

export default WeatherApp;
