import ToggleDiv from './ToggleDiv';
import PropTypes from 'prop-types';
import { useUserValue } from '../context/UserContext';

export const Blog = ({ blog, handleDelete, handleLike }) => {
  if (!blog) return null;
  const user = useUserValue();

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle} className="blogs">
      <p>{blog.title}</p>
      <ToggleDiv label="View">
        <p>{blog.url}</p>
        <p>
          {blog.likes} <button onClick={() => handleLike(blog)}>like</button>
        </p>
        <p>{blog.author}</p>
        {user?.username === blog.user.username ? (
          <button onClick={() => handleDelete(blog)}>Delete</button>
        ) : null}
      </ToggleDiv>
    </div>
  );
};

Blog.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  handleLike: PropTypes.func.isRequired,
};
