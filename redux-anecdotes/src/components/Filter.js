export const Filter = ({ filterAnecdotes }) => {
  const handleChange = (e) => {
    filterAnecdotes(e.target.value);
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};
