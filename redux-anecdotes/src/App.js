import { useSelector, useDispatch } from 'react-redux';

const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();
  const sorted = anecdotes.sort((a, b) => b.votes - a.votes);
  const voteThis = (id) => {
    return {
      type: 'VOTE',
      payload: { id },
    };
  };

  const createThis = (content) => {
    return {
      type: 'CREATE',
      payload: { content },
    };
  };

  const vote = (id) => {
    dispatch(voteThis(id));
  };

  const createNewAnecdote = (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    e.target.anecdote.value = '';
    dispatch(createThis(content));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {sorted.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={createNewAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default App;
