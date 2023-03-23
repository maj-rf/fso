import { useSelector, useDispatch } from 'react-redux';
import { voteThis } from '../reducers/anecdoteReducer';

export const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();
  const sorted = anecdotes.sort((a, b) => b.votes - a.votes);

  const vote = (id) => {
    dispatch(voteThis(id));
  };

  return (
    <>
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
