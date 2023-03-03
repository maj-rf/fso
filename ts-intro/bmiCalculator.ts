function calculateBMI(height: number, weight: number) {
  const bmi = weight / (((height / 100) * height) / 100);
  if (bmi < 18.5) return 'Underweight';
  else if (bmi > 24.9) return 'Overweight';
  else return 'Normal (healthy weight)';
}

const height: number = Number(process.argv[2]);
const weight: number = Number(process.argv[3]);

console.log(calculateBMI(height, weight));
