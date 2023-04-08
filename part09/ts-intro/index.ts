import express from 'express';
import { calculateBMI } from './bmiCalculator';
import { calculateExercise } from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
  if (!req.query.height || !req.query.weight) {
    res.status(400).json({
      error: 'Missing Parameters: Please provide both height and weight',
    });
  }
  if (isNaN(Number(req.query.height)) || isNaN(Number(req.query.weight))) {
    res.status(400).json({
      error:
        'Malformatted Parameters: Height and weight should both be numbers',
    });
  }
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  res.send({ height, weight, bmi: calculateBMI(height, weight) });
});

type ExerciseModel = {
  target: number;
  daily_exercises: Array<number>;
};

app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body as ExerciseModel;
  if (!daily_exercises || !target) {
    return res.status(400).json({
      error:
        'Missing Parameters: Please provide both exercise array and target',
    });
  }
  if (
    target &&
    daily_exercises &&
    !isNaN(Number(target)) &&
    Array.isArray(daily_exercises)
  ) {
    return res
      .status(200)
      .json(calculateExercise([...daily_exercises], target));
  }
  return res.status(400).json({
    error:
      'Malformatted parameters: Daily Exercises should be an array of numbers and target must be a number',
  });
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
