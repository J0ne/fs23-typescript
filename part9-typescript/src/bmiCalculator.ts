const calculateBmi = (height: number, weight: number): string => {
    const bmi = weight / (height / 100) ** 2;
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal (healthy weight)";
    if (bmi < 30) return "Overweight";
    return "Obese";
    }

// exercise 9.1

//console.log(calculateBmi(180, 74));

// exercise 9.3
const width: number = Number(process.argv[2])
const weight: number = Number(process.argv[3])

console.log(calculateBmi(width, weight));