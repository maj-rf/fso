import { useDispatch } from 'react-redux';
import { createThis } from '../reducers/anecdoteReducer';

export const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const createNewAnecdote = (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    e.target.anecdote.value = '';
    dispatch(createThis(content));
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
