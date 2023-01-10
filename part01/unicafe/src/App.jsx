import { useState } from 'react';

const MyButton = (props) => {
  return <button onClick={props.action}>{props.text}</button>;
};

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  if (all === 0) return <p>No feedback given</p>;
  return (
    <>
      <h1>statistics</h1>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>All: {all}</p>
      <p>Average: {all !== 0 ? average : 0}</p>
      <p>Positive: {all !== 0 ? positive : 0}</p>
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const all = good + neutral + bad;
  const positive = good / all;
  const average = (good - bad) / all;

  return (
    <div>
      <h1>give feedback</h1>
      <MyButton action={() => setGood((prev) => prev + 1)} text="good" />
      <MyButton action={() => setNeutral((prev) => prev + 1)} text="neutral" />
      <MyButton action={() => setBad((prev) => prev + 1)} text="bad" />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}
      />
    </div>
  );
};

export default App;
