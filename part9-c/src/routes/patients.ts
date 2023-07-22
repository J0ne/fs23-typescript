import express from 'express';
import patientService from '../services/patientsService';
import {toNewPatientEntry, toNewEntry } from '../utils';


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


patientsRouter.post('/:id/entries', (req, res) => {
    const patient = patientService.getEntries().find(p => p.id === req.params.id);

    try {
        const newEntry = toNewEntry(req.body);
        if (patient && newEntry) {

        const updatedPatient = patientService.addEntry(patient, newEntry);
        res.json(updatedPatient);
      } else {
        res.sendStatus(404);
         }
    }
    catch (e) {
        if(e instanceof Error){
            console.log(e.message);
            res.status(400).send(e.message);
        }
    }

});


export default patientsRouter;