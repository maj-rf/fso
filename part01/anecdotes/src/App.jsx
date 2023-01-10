import { useState } from 'react';

const MyButton = ({ action, text }) => {
  return <button onClick={action}>{text}</button>;
};

const Anecdote = ({ current, currentPoint, text }) => {
  return (
    <div>
      <h1>{text}</h1>
      <p>{current}</p>
      <p>Has {currentPoint} pts!</p>
    </div>
  );
};

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
  ];

  const [points, setPoints] = useState(Array(anecdotes.length).fill(0));
  const [selected, setSelected] = useState(0);
  const indexOfHighest = points.indexOf(
    points.reduce(function (a, b) {
      return Math.max(a, b);
    })
  );

  const handleClick = () => {
    const random = Math.floor(Math.random() * anecdotes.length);
    setSelected(random);
  };

  const handleVote = (index) => {
    const newPoints = [...points];
    newPoints[index] += 1;
    setPoints(newPoints);
  };

  return (
    <div>
      <Anecdote
        current={anecdotes[selected]}
        currentPoint={points[selected]}
        text="Anecdote Of the Day"
      />
      <MyButton action={() => handleVote(selected)} text="vote" />
      <MyButton action={handleClick} text="next anecdote" />

      <Anecdote
        current={anecdotes[indexOfHighest]}
        currentPoint={points[indexOfHighest]}
        text="Anecdote with Most Votes"
      />
    </div>
  );
};

export default App;
