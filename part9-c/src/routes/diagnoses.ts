import express from 'express';
import data from '../services/diagnoseService';

const diagnosesRouter = express.Router();

diagnosesRouter.get('/', (_req, res) => {
    res.send(data.getNonSensitiveEntries());
    }
);

export default diagnosesRouter;


