import express from 'express';
import data from '../services/diagnoseService';
import {toNewDiagnosis} from '../utils';


const diagnosesRouter = express.Router();

diagnosesRouter.get('/', (_req, res) => {
    res.send(data.getNonSensitiveEntries());
    }
);

diagnosesRouter.post('/', (req, res) => {

    const newDiagnoseEntry = data.addNewDiagnosis(toNewDiagnosis(req.body));
    res.json(newDiagnoseEntry);

    res.send('Saving a diagnose!');
    }
);






export default diagnosesRouter;


