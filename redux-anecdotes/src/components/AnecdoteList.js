import { useSelector, useDispatch } from 'react-redux';
import { voteThis } from '../reducers/anecdoteReducer';
import { filterChange } from '../reducers/filterReducer';
import { Filter } from './Filter';

export const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    if (state.filter === '') return state.anecdotes;
    else return state.anecdotes.filter((a) => a.content.includes(state.filter));
  });
  const dispatch = useDispatch();
  const sorted = anecdotes.sort((a, b) => b.votes - a.votes);

  const vote = (id) => {
    dispatch(voteThis(id));
  };

  const filterAnecdotes = (str) => {
    dispatch(filterChange(str));
  };

  return (
    <>
      <Filter filterAnecdotes={filterAnecdotes} />
      {sorted.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};
