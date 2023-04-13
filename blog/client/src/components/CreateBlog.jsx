import { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation, useQueryClient } from 'react-query';
import { createBlog } from '../services/blogs';

export const CreateBlog = ({ setNotification }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const queryClient = useQueryClient();
  const createBlogMutation = useMutation(createBlog, {
    refetchOnWindowFocus: false,
    onSuccess: (newBlog) => {
      const allBlogs = queryClient.getQueryData(['blogs']);
      queryClient.setQueryData(['blogs'], allBlogs.concat(newBlog));
    },
    onError: (err) => {
      setNotification({
        notif: err.response.data.error,
        notifType: 'error',
      });
    },
  });

  const handleBlogFormChange = (e) => {
    if (e.target.id === 'title') return setTitle(e.target.value);
    else if (e.target.id === 'author') return setAuthor(e.target.value);
    else if (e.target.id === 'url') return setUrl(e.target.value);
  };

  const handleBlogSubmit = (e) => {
    e.preventDefault();
    const newBlog = {
      title,
      author,
      url,
    };
    createBlogMutation.mutate(newBlog);
    setNotification({
      notif: `Created new blog with title: ${newBlog.title}`,
      notifType: 'success',
    });
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <form onSubmit={handleBlogSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          onChange={handleBlogFormChange}
          id="title"
          type="text"
          value={title}
          placeholder="Harry Potter"
        />
      </div>
      <div>
        <label htmlFor="author">Author</label>
        <input
          onChange={handleBlogFormChange}
          id="author"
          type="text"
          value={author}
          placeholder="JK Rowling"
        />
      </div>
      <div>
        <label htmlFor="url">Url</label>
        <input
          onChange={handleBlogFormChange}
          id="url"
          type="text"
          value={url}
          placeholder="hogwar.ts"
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

CreateBlog.propTypes = {
  //handleCreateBlog: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
};
