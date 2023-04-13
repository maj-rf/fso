import { useMutation, useQueryClient } from 'react-query';
import ToggleDiv from './ToggleDiv';
import PropTypes from 'prop-types';
import { deleteBlog, updateBlog } from '../services/blogs';
export const Blog = ({ blog, user, setNotification }) => {
  const { id, title, author, url, likes } = blog;
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };
  const queryClient = useQueryClient();

  const deleteBlogMutation = useMutation(deleteBlog, {
    // onSuccess: (id) => {
    //   const blogs = queryClient.getQueryData(['blogs']);
    //   const filtered = blogs.filter((blog) => blog.id !== id);
    //   queryClient.setQueryData(['blogs'], filtered);
    // },
    onSuccess: () => queryClient.invalidateQueries(['blogs']),
  });

  const updateBlogMutation = useMutation(updateBlog, {
    onSuccess: () => queryClient.invalidateQueries(['blogs']),
  });

  const handleDeleteClick = () => {
    if (confirm(`Do you want to delete ${title}?`)) {
      deleteBlogMutation.mutate(id);
      setNotification({
        notif: 'Successfully deleted',
        notifType: 'success',
      });
    }
  };

  const handleLikeClick = () => {
    updateBlogMutation.mutate({ ...blog, likes: blog.likes + 1 });
    setNotification({
      notif: `You liked ${blog.title} by ${author}`,
      notifType: 'success',
    });
  };

  return (
    <div style={blogStyle} className="blogs">
      <p>{title}</p>
      <ToggleDiv label="View">
        <p>{url}</p>
        <p>
          {likes} <button onClick={handleLikeClick}>like</button>
        </p>
        <p>{author}</p>
        {user.username === blog.user.username ? (
          <button onClick={handleDeleteClick}>Delete</button>
        ) : null}
      </ToggleDiv>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  setNotification: PropTypes.func.isRequired,
};
