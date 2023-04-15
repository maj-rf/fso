import ToggleDiv from './ToggleDiv';
import PropTypes from 'prop-types';
import { useUserValue } from '../context/UserContext';
import { CreateComment } from './CreateComment';
import { Comments } from './Comments';
import { useQueryClient, useMutation } from 'react-query';
import { createComment } from '../services/blogs';
export const Blog = ({ blog, handleDelete, handleLike }) => {
  const user = useUserValue();
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

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
        <CreateComment handleSubmit={handleSubmit} />
        <Comments blog={blog} />
      </ToggleDiv>
    </div>
  );
};

Blog.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  handleLike: PropTypes.func.isRequired,
};
