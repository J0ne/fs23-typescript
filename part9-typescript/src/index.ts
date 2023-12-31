import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises, Result } from './exerciseCalculator';


const app = express();

app.use(express.json());

// 9.4 Express
app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {

  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.status(400).json({ error: "malformatted parameters" });
  }
  else{
    let bmi = "";
    try {
      bmi = calculateBmi(height, weight);
      res.json({
        height,
        weight,
        bmi
      });
    } catch (error) {

        const errorMessage = (error as Error).message;
        res.status(400).json({ error: errorMessage });
    }
  }
});


// 9.7 WebExercises
app.post('/exercises', (req, res) => {

    console.log(req.body);
    const { target, daily_exercises } = req.body as { target: number, daily_exercises: Array<number> }; // eslint-disable-line @typescript-eslint/no-unsafe-assignment

    if (!target || !daily_exercises) {
        res.status(400).json({ error: "parameters missing" });
    }
    else if (isNaN(target) || !Array.isArray(daily_exercises)) {
        res.status(400).json({ error: "malformatted parameters" });
    }
    else {
        try {
            const result: Result = calculateExercises(daily_exercises, target);
            res.json(result);
        } catch (error) {
            const errorMessage = (error as Error).message;
            res.status(400).json({ error: errorMessage });
        }
    }



});



const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});