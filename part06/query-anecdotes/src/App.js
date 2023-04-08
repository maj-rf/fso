import { useMutation, useQuery, useQueryClient } from 'react-query';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { useNotifDispatch } from './NotifContext';
import { getAll, updateAnecdote } from './requests';

const App = () => {
  const queryClient = useQueryClient();
  const { isLoading, isError, data, error } = useQuery('anecdotes', getAll);
  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    refetchOnWindowFocus: false,
    onSuccess: (update) => {
      const anecdotes = queryClient.getQueryData('anecdotes');
      anecdotes.find((a) => a.id === update.id).votes = update.votes;
      queryClient.setQueryData('anecdotes', anecdotes);
    },
  });

  const notifDispatch = useNotifDispatch();

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    notifDispatch({
      type: 'show',
      payload: { notif: `Voted for "${anecdote.content}"` },
    });
    setTimeout(() => {
      notifDispatch({ type: 'hide' });
    }, 5000);
  };

  if (isLoading) {
    return <div>loading...</div>;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  const anecdotes = data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
