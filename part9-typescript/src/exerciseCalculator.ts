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
    const periodLength = dailyExercise.length;
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
}

// exercise 9.2
// const exerciseHours: Array<number> =[ 3, 0, 2, 4.5, 0, 3, 1];
// const target: number = 2;
// console.log(calculateExercises(exerciseHours, target));


// exercise 9.3
const args = process.argv.slice(2);
const target: number = Number(args[0]);
const exerciseHours: Array<number> = args.slice(1).map(hours => Number(hours));

console.log(calculateExercises(exerciseHours, target));