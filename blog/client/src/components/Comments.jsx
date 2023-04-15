import { useQuery } from 'react-query';
import { getComments } from '../services/blogs';
export const Comments = ({ blog }) => {
  if (!blog) return null;
  const commentsResult = useQuery(['comments'], () => getComments(blog));
  const comments = commentsResult.data;
  if (!comments) return null;
  if (commentsResult.isLoading) return <div>Loading...</div>;
  if (commentsResult.error)
    return <div>An error has occurred: {commentsResult.error.message};</div>;
  if (comments.length === 0) return <div>No comments yet</div>;
  return (
    <div>
      <p>Comments</p>
      <ul style={{ listStyle: 'none' }}>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
    </div>
  );
};
