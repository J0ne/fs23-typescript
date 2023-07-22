"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientsService_1 = __importDefault(require("../services/patientsService"));
const utils_1 = require("../utils");
const patientsRouter = express_1.default.Router();
patientsRouter.get('/', (_req, res) => {
    res.send(patientsService_1.default.getNonSensitiveEntries());
});
patientsRouter.post('/', (req, res) => {
    res.send(patientsService_1.default.addNewPatient((0, utils_1.toNewPatientEntry)(req.body)));
});
patientsRouter.get('/:id', (req, res) => {
    const patient = patientsService_1.default.getEntries().find(p => p.id === req.params.id);
    if (patient) {
        res.send(patient);
    }
    else {
        res.sendStatus(404);
    }
});
patientsRouter.post('/:id/entries', (req, res) => {
    const patient = patientsService_1.default.getEntries().find(p => p.id === req.params.id);
    try {
        const newEntry = (0, utils_1.toNewEntry)(req.body);
        if (patient && newEntry) {
            const updatedPatient = patientsService_1.default.addEntry(patient, newEntry);
            console.log('updatedPatient', updatedPatient);
            res.json(updatedPatient);
        }
        else {
            res.sendStatus(404);
        }
    }
    catch (e) {
        if (e instanceof Error) {
            console.log(e.message);
            res.status(400).send(e.message);
        }
    }
});
exports.default = patientsRouter;
