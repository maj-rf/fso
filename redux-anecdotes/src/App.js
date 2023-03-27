import { useEffect } from 'react';
import { AnecdoteForm } from './components/AnecdoteForm';
import { AnecdoteList } from './components/AnecdoteList';
import { Notification } from './components/Notification';
import { Filter } from './components/Filter';
import { getAll } from './services/anecdoteService';
import { useDispatch } from 'react-redux';
import { setAnecdotes } from './reducers/anecdoteReducer';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getAll().then((anecdotes) => dispatch(setAnecdotes(anecdotes)));
  }, [dispatch]);

  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
