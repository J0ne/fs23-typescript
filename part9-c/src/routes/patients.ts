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

patientsRouter.get('/:id', (req, res) => {
    const patient = patientService.getEntries().find(p => p.id === req.params.id);
    if (patient) {
        res.send(patient);
    } else {
        res.sendStatus(404);
    }
});



export default patientsRouter;