import React, { useState } from "react";
import axios from "axios";

export default function WeatherSearch() {
  const [city, setCity] = useState("Enter a city");
  const [weather, setWeather] = useState({
    date: "Today, 00:00",
    temperature: 0,
    description: "Cloudy with meatballs",
    humidity: 0,
    wind: 0,
    icon: `http://openweathermap.org/img/wn/10d@2x.png`,
  });

  function displayWeather(response) {
    let currentTimestamp = Date.now();
    const options = {
      weekday: "long",
      hour: "2-digit",
      minute: "2-digit",
    };
    let date = new Intl.DateTimeFormat("en-US", options).format(
      currentTimestamp
    );
    setWeather({
      date: date,
      temperature: Math.round(response.data.main.temp),
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "5dcc733dee2af67c15c4b1d641ad43db";
    let unit = "imperial";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
    axios.get(apiUrl).then(displayWeather);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  let searchForm = (
    <div className="searchForm">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-9">
            <input
              type="search"
              placeholder="Enter a city..."
              className="form-control search-input"
              onChange={updateCity}
            />
          </div>
          <div className="col-3 p-0">
            <input
              type="submit"
              className="btn btn-primary w-100"
              value="Search"
            />
          </div>
        </div>
      </form>
    </div>
  );

  let searchResults = (
    <div className="searchResults">
      <div className="WeatherInfo">
        <div className="row">
          <div className="col-6">
            <h1>{city}</h1>
            <div className="weather-detail">
              <span>{weather.date}</span>
              <div>{weather.description}</div>
              <div>
                Humidity:&nbsp;
                <strong>
                  <span>{weather.humidity}</span>%
                </strong>
                , Wind:&nbsp;
                <strong>
                  <span>{weather.wind}</span> mph{" "}
                </strong>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="temperature-container d-flex justify-content-end">
              <div>
                <img
                  src={weather.icon}
                  alt={weather.description}
                  className="float-left"
                />
                <span className="temperature">{weather.temperature}</span>
                <span className="unit">°F</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  let footer = (
    <div className="footer">
      <h4>React Weather App</h4>
      This project was coded by{" "}
      <a
        href="https://www.linkedin.com/in/caroline-kimball-99477ab0/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Caroline Kimball
      </a>{" "}
      and is&nbsp;
      <a
        href="https://github.com/kimballcaroline/react-weather-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        open-sourced on Github.
      </a>
    </div>
  );

  return (
    <div className="WeatherApp">
      <div className="App">
        {searchForm}
        {searchResults}
        <br />
        <br />
        {footer}
      </div>
    </div>
  );
}
