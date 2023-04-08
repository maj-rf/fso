import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { NewDiary, Visibility, Weather } from '../types/types';

interface Props {
  createNewDiary: (values: NewDiary) => void;
}

interface VisibilityOption {
  value: Visibility;
  label: string;
}

interface WeatherOption {
  value: Weather;
  label: string;
}

const visibilityOptions: VisibilityOption[] = Object.values(Visibility).map(
  (v) => ({
    value: v,
    label: v.toString(),
  })
);

const weatherOptions: WeatherOption[] = Object.values(Weather).map((v) => ({
  value: v,
  label: v.toString(),
}));

export const DiaryForm = ({ createNewDiary }: Props) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState(Visibility.Great);
  const [weather, setWeather] = useState(Weather.Cloudy);
  const [comment, setComment] = useState('');

  const onVisibilityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    if (typeof e.target.value === 'string') {
      const value = e.target.value;
      const vis = Object.values(Visibility).find((v) => v.toString() === value);
      if (vis) {
        setVisibility(vis);
      }
    }
  };

  const onWeatherChange = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    if (typeof e.target.value === 'string') {
      const value = e.target.value;
      const weather = Object.values(Weather).find(
        (w) => w.toString() === value
      );
      if (weather) {
        setWeather(weather);
      }
    }
  };

  const addDiary = (e: SyntheticEvent) => {
    e.preventDefault();
    createNewDiary({ date, visibility, weather, comment });
  };

  return (
    <form onSubmit={addDiary}>
      <div>
        <label htmlFor="date">Date </label>
        <input
          value={date}
          type="text"
          id="date"
          placeholder="YYYY-MM-DD"
          onChange={({ target }) => setDate(target.value)}
        />
      </div>
      <div>
        <label htmlFor="visibility">Visibility </label>
        <select
          name="visibility"
          value={visibility}
          onChange={onVisibilityChange}
        >
          <option value=""> --Choose a visibility-- </option>
          {visibilityOptions.map((opt) => {
            return (
              <option key={opt.label} value={opt.value}>
                {opt.label}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <label htmlFor="weather">Weather </label>
        <select name="weather" value={weather} onChange={onWeatherChange}>
          <option value=""> --Choose a weather-- </option>
          {weatherOptions.map((opt) => {
            return (
              <option key={opt.label} value={opt.value}>
                {opt.label}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <label htmlFor="comment">Comment </label>
        <input
          value={comment}
          type="text"
          id="comment"
          onChange={({ target }) => setComment(target.value)}
        />
      </div>
      <button type="submit">Add</button>
    </form>
  );
};
