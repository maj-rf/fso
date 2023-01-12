import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

export const Weather = ({ name }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    let unmount = false;
    async function getWeather() {
      const API_KEY = `${import.meta.env.VITE_API_KEY}`;
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/find?q=${name}&units=metric&appid=${API_KEY}`
      );
      console.log(data);
      setWeather(data);
    }
    getWeather();
    return () => {
      unmount = true;
    };
  }, []);

  return (
    <>
      {weather ? (
        <div>
          <h2>Weather in {name}</h2>
          <p>Temperature: {weather.list[0].main.temp} °C</p>
          <img
            src={`http://openweathermap.org/img/wn/${weather.list[0].weather[0].icon}@2x.png`}
            alt={`${name}'s weather`}
          />
          <p>Wind: {weather.list[0].wind.speed} m/s</p>
        </div>
      ) : null}
    </>
  );
};
