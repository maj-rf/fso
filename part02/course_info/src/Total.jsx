export const Total = ({ parts }) => {
  console.log(parts);
  const total = parts.reduce((a, b) => a + b.exercises, 0);
  return (
    <p>
      <b>total of {total} exercises</b>
    </p>
  );
};
