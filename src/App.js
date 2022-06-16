import "./App.css";
import WeatherSearch from "./WeatherSearch";
import React from "react";

export default function WeatherApp() {
  return (
    <div className="WeatherApp">
      <div className="App">
        <div className="Weather">
          <WeatherSearch />
        </div>
      </div>
    </div>
  );
}
