//import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useField } from '../hooks/useField';

export const CreateNew = (props) => {
  const content = useField('text');
  const author = useField('text');
  const info = useField('text');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    props.handleNotification(`New anecdote added: ${content.value}`);
    navigate('/');
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name="content" {...content} />
        </div>
        <div>
          author
          <input name="author" {...author} />
        </div>
        <div>
          url for more info
          <input name="info" {...info} />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};
