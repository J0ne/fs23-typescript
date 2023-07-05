import express from 'express';

import patientService from '../services/patientsService';
// import toNewPatientEntry from './utils';

const patientsRouter = express.Router();


patientsRouter.get('/', (_req, res) => {
    res.send(patientService.getNonSensitiveEntries());
});

// patientsRouter.post('/', (req, res) => {
//     try {
//         const newPatientEntry = toNewPatientEntry(req.body);
//         const addedEntry = patientService.addPatient(newPatientEntry);
//         res.json(addedEntry);
//     } catch (e) {
//         if (e instanceof Error){
//             res.status(400).send(e.message);
//         }
//     }
// });


export default patientsRouter;