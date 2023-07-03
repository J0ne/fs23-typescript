import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();

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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});