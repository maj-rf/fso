import { useEffect, useState } from 'react';
import './App.css';
import { DiaryForm } from './components/DiaryForm';
import { createDiary, getAllDiaries } from './services/diaryServices';
import { Diary, NewDiary } from './types/types';
import { Notification } from './components/Notification';
import axios from 'axios';
function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [error, setError] = useState<string>();
  useEffect(() => {
    const fetchDiaries = async () => {
      const data = await getAllDiaries();
      setDiaries(data);
    };
    fetchDiaries();
  }, []);

  const createNewDiary = async (values: NewDiary) => {
    try {
      const diary = await createDiary(values);
      setDiaries(diaries.concat(diary));
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === 'string') {
          const message = e.response.data.replace(
            'Something went wrong. Error: ',
            ''
          );
          console.error(message);
          showMessage(message);
        } else {
          showMessage('Unrecognized axios error');
        }
      } else {
        console.error('Unknown error', e);
        showMessage('Unknown error');
      }
    }
  };

  const showMessage = (message: string) => {
    setError(message);
    setTimeout(() => setError(''), 3000);
  };

  return (
    <div className="App">
      {error ? <Notification message={error} /> : null}
      <DiaryForm createNewDiary={createNewDiary} />
      <section>
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
      </section>
    </div>
  );
}

export default App;
