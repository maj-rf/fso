import ToggleDiv from './ToggleDiv';
import PropTypes from 'prop-types';
import { useUserValue } from '../context/UserContext';
import { CreateComment } from './CreateComment';
import { Comments } from './Comments';
import { useQueryClient, useMutation } from 'react-query';
import { createComment } from '../services/blogs';
export const Blog = ({ blog, handleDelete, handleLike }) => {
  const user = useUserValue();

  const queryClient = useQueryClient();
  const commentMutation = useMutation(createComment, {
    onSuccess: (newComment) => {
      const comments = queryClient.getQueryData(['comments']);
      queryClient.setQueryData(['comments'], comments.concat(newComment));
    },
  });

  const handleSubmit = (e, comment) => {
    e.preventDefault();
    commentMutation.mutate({ id: blog.id, comment: comment });
    e.target.comment.value = '';
  };

  return (
    <div className="blogs">
      <h1>{blog.title}</h1>
      <div className="blog-content">
        <p>URL: {blog.url}</p>
        <p>
          Likes: {blog.likes}{' '}
          <button onClick={() => handleLike(blog)}>like</button>
        </p>
        <p>Author: {blog.author}</p>
        <p>Added by {blog.user.username}</p>
        {user?.username === blog.user.username ? (
          <button onClick={() => handleDelete(blog)}>Delete</button>
        ) : null}
      </div>
      <div className="blog-comments">
        <CreateComment handleSubmit={handleSubmit} />
        <Comments blog={blog} />
      </div>
    </div>
  );
};

Blog.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  handleLike: PropTypes.func.isRequired,
};
