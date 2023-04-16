import { useState } from 'react';

export const CreateComment = ({ handleSubmit }) => {
  const [comment, setComment] = useState('');
  return (
    <form className="comment-form" onSubmit={(e) => handleSubmit(e, comment)}>
      <div>
        <label htmlFor="comment" hidden>
          Comment
        </label>
        <input
          onChange={(e) => setComment(e.target.value)}
          id="comment"
          type="text"
          value={comment}
          placeholder="This is good..."
        />
      </div>
      <button type="submit">Add Comment</button>
    </form>
  );
};
