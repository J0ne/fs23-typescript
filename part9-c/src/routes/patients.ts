import express from 'express';

import patientService from './services/patientService';
import toNewPatientEntry from './utils';

const router = express.Router();

router.get('/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
    }
);

router.get('/api/patients', (_req, res) => {
    res.send(patientService.getNonSensitiveEntries());
    }
);

router.post('/api/patients', (req, res) => {
    try {
        const newPatientEntry = toNewPatientEntry(req.body);
        const addedEntry = patientService.addPatient(newPatientEntry);
        res.json(addedEntry);
    } catch (e) {
        res.status(400).send(e.message);
    }
    }
);

export default router;