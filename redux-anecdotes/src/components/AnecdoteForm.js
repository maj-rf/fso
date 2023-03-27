import { useDispatch } from 'react-redux';
import { createThis } from '../reducers/anecdoteReducer';
import { createNew } from '../services/anecdoteService';

export const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const createNewAnecdote = async (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    e.target.anecdote.value = '';
    const newAnecdote = await createNew(content);
    dispatch(createThis(newAnecdote));
  };
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={createNewAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </>
  );
};
