type Result = {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
};

function calculateExercise(arr: number[], target: number): Result {
  const periodLength = arr.length;
  const trainingDays = arr.filter((num) => (num > 0 ? true : false)).length;
  const average = arr.reduce((a, b) => a + b) / 7;
  const success = average >= target;

  return {
    periodLength,
    trainingDays,
    success,
    rating: 2,
    ratingDescription: 'okay',
    target,
    average,
  };
}

console.log(calculateExercise([3, 0, 2, 4.5, 0, 3, 1], 2));
