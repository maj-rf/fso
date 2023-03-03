interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

function calculateExercise(arr: number[], target = 2): Result {
  const periodLength = arr.length;
  const trainingDays = arr.filter((num) => (num > 0 ? true : false)).length;
  const average =
    arr.length === 0 ? 0 : arr.reduce((a, b) => a + b) / arr.length;
  const success = average >= target;
  let ratingDescription;
  let rating;
  if (average > target + 0.5) {
    ratingDescription = 'doing better';
    rating = 3;
  } else if (average > target + 0.2 && average < target + 0.5) {
    ratingDescription = 'just right';
    rating = 2;
  } else {
    ratingDescription = 'could do more';
    rating = 1;
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
}

const parseArguments = (args: string[]) => {
  const nums: number[] = [];
  if (args.length === 0) throw new Error('Not enough arguments');
  for (let i = 2; i < args.length; i++) {
    nums.push(Number(args[i]));
  }
  return nums;
};

console.log(calculateExercise(parseArguments(process.argv)));
