import { useSelector, useDispatch } from 'react-redux';
import { voteThis } from '../reducers/anecdoteReducer';
import { createNotification } from '../reducers/notificationReducer';
export const AnecdoteList = () => {
  const dispatch = useDispatch();

  const anecdotes = useSelector((state) => {
    if (state.filter === '') return state.anecdotes;
    else return state.anecdotes.filter((a) => a.content.includes(state.filter));
  });
  const sorted = [...anecdotes].sort((a, b) => b.votes - a.votes);

  const vote = (a) => {
    dispatch(voteThis(a.id.toString()));
    dispatch(createNotification(`You voted "${a.content}"`, 5));
  };

  return (
    <>
      {sorted.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};
