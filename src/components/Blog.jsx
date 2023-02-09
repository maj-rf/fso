import { ToggleDiv } from './ToggleDiv';

export const Blog = ({ blog, user, handleDeleteBlog, handleBlogLikes }) => {
  const { id, title, author, url, likes } = blog;
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleDeleteClick = () => {
    if (confirm(`Do you want to delete ${title}?`)) {
      handleDeleteBlog(id);
    }
  };

  const handleLikeClick = () => {
    const newObj = {
      title,
      author,
      url,
      likes: likes + 1,
    };

    handleBlogLikes(id, newObj);
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
