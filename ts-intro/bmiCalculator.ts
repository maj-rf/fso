function calculateBMI(height: number, weight: number) {
  const bmi = weight / (((height / 100) * height) / 100);
  if (bmi < 18.5) return 'Underweight';
  else if (bmi > 24.9) return 'Overweight';
  else if (bmi > 18.5 && bmi < 24.9) return 'Normal (healthy weight)';
}

console.log(calculateBMI(180, 74));
console.log(calculateBMI(180, 50));
