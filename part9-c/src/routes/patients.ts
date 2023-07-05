import express from 'express';
import patientService from '../services/patientsService';
import toNewPatientEntry from '../utils';


const patientsRouter = express.Router();


patientsRouter.get('/', (_req, res) => {
    res.send(patientService.getNonSensitiveEntries());
});

patientsRouter.post('/', (req, res) => {
    res.send(patientService.addNewPatient(toNewPatientEntry(req.body)));
});



export default patientsRouter;