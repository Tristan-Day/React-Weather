import './App.css';

import React, { useState, useEffect } from 'react';

import { faMagnifyingGlass, faSun, faWater, faWind } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const API_KEY = "appid=dc645e5a61872d5a4131914209e9be79";

const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather?";
const GEOLOCATION_API_URL = "https://api.openweathermap.org/geo/1.0/direct?";

export default function App() {
  const [weatherData, setWeatherData] = useState("None");
  const [locationQuery, setLocationQuery] = useState("London");

  const searchLocation = async (query) => {
    const response =
      await fetch(`${GEOLOCATION_API_URL}q=${query}&limit=1&${API_KEY}`);

    if (response.ok) {
      return await response.json()
    }
    else {
      alert("Location not Found")
    }
  };

  const getWeatherData = async () => {
    const location = await searchLocation(locationQuery);
    const response = await fetch(`${WEATHER_API_URL}lon=${location[0].lon}&lat=${location[0].lat}&units=metric&${API_KEY}`);

    if (response.ok) {
      setWeatherData(await response.json());
    }
    else {
      alert("Failed to Retreive Location Data")
    }
  };

  useEffect(() => { getWeatherData(); }, []);

  return (
    <div className='App'>
      <div className='search'>
        <input
          type='text'
          placeholder='Enter a Location'
          spellCheck="false" onChange={(e) => setLocationQuery(e.target.value)}>
        </input>
        <button
          onClick={() => { getWeatherData() }}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
      <div className='weather'>
        {weatherData && weatherData.main && (
          <>
            <FontAwesomeIcon icon={faSun} className='icon-main' />
            <h1 className='temperature'>{`${Math.round(weatherData.main.temp)} °C`}</h1>
            <h2 className='location'>{weatherData.name}</h2>
            <div className='details'>
              <div className='column'>
                <FontAwesomeIcon icon={faWater} className='icon' />
                <div>
                  <p className='humidity'>{`${weatherData.main.humidity} %`}</p>
                  <p>Humidity</p>
                </div>
              </div>
              <div className='column'>
                <FontAwesomeIcon icon={faWind} className='icon' />
                <div>
                  <p className='wind'>{`${weatherData.wind.speed} Km/h`}</p>
                  <p>Wind</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
