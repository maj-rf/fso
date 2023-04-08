import { useMutation, useQueryClient } from 'react-query';
import { useNotifDispatch } from '../NotifContext';
import { createAnecdote } from '../requests';

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const notifDispatch = useNotifDispatch();
  const newAnecdoteMutation = useMutation(createAnecdote, {
    refetchOnWindowFocus: false,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes');
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote));
    },
    onError: () => {
      notifDispatch({
        type: 'show',
        payload: {
          notif: 'content is too short. must be at least 5 characters ',
        },
      });
      setTimeout(() => {
        notifDispatch({ type: 'hide' });
      }, 5000);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    newAnecdoteMutation.mutate({ content, votes: 0 });
    notifDispatch({
      type: 'show',
      payload: { notif: `Created "${content}"` },
    });
    setTimeout(() => {
      notifDispatch({ type: 'hide' });
    }, 5000);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
