import { useEffect, useState } from 'react';
import './App.css';
import { getAllDiaries } from './services/diaryServices';
import { Diary } from './types/types';

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    const fetchDiaries = async () => {
      const data = await getAllDiaries();
      setDiaries(data);
    };
    fetchDiaries();
  }, []);
  return (
    <div className="App">
      <h1>Diary Entries</h1>
      <div>
        {diaries.map((diary) => {
          return (
            <div key={diary.id}>
              <h2>{diary.date}</h2>
              <p>Weather: {diary.weather}</p>
              <p>Visibility: {diary.visibility}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
