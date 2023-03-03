import express from 'express';
import { calculateBMI } from './bmiCalculator';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
  if (!req.query.height || !req.query.weight) {
    res.status(400).json({
      error: 'Invalid Parameters: Please provide both height and weight',
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

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
