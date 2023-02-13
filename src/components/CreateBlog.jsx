import { useState } from 'react';
import PropTypes from 'prop-types';

export const CreateBlog = ({ handleCreateBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleBlogFormChange = (e) => {
    if (e.target.id === 'title') return setTitle(e.target.value);
    else if (e.target.id === 'author') return setAuthor(e.target.value);
    else if (e.target.id === 'url') return setUrl(e.target.value);
  };

  const handleBlogSubmit = (e) => {
    e.preventDefault();
    handleCreateBlog(title, author, url);
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
  handleCreateBlog: PropTypes.func.isRequired,
};
