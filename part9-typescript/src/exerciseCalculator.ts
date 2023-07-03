import { isNotNumber, parseArguments } from '../../utils';

interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const calculateExercises = (dailyExercise: Array<number>, target: number): Result => {
    if (isNotNumber(target)) throw new Error("Target is not a number");

    console.log(dailyExercise, target);
    const periodLength = dailyExercise.length;

    if(periodLength === 0) throw new Error("Provide at least one day of exercise");

    const trainingDays = dailyExercise.filter(hours => hours > 0).length;
    const average = dailyExercise.reduce((previous, current) => previous + current, 0) / periodLength;
    const success = average >= target;
    let rating = 1;
    let ratingDescription = "You can do better!";
    if (average >= target) {
        rating = 3;
        ratingDescription = "Great job!";
    } else if (average >= target * 0.8) {
        rating = 2;
        ratingDescription = "Not too bad but could be better";
    }
    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
};

// exercise 9.2
// const exerciseHours: Array<number> =[ 3, 0, 2, 4.5, 0, 3, 1];
// const target: number = 2;
// console.log(calculateExercises(exerciseHours, target));


// exercise 9.3
const args = parseArguments(process.argv);
let target: number;
let exerciseHours: Array<number> = [];
try {
    target = Number(args[0]);
    exerciseHours = args.slice(1).map(arg => Number(arg));
} catch (error) {
    const errorMessage = (error as Error).message;

    throw new Error("Error, issues with arguments: " + errorMessage);
}

console.log(calculateExercises(exerciseHours, target));