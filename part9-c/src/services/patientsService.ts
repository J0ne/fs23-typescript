import data from '../../data/patients';
import { v1 as uuid } from 'uuid';

import { Patient, NonSensitivePatientEntry, NewPatientEntry,  NewEntry } from '../types';
import {toNewPatientEntry} from '../utils';

const getEntries = (): Array<Patient> => {
    return data.map(({
         id,
         ssn,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }) => ({
         id,
         ssn,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
};

const allEntries = getEntries();


const getNonSensitiveEntries = (): Array<NonSensitivePatientEntry> => {
    return data.map(({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
     }) => ({
        id,
        name,
        dateOfBirth,
        gender: gender ,
        occupation,
        entries
    }));
};

const addNewPatient = (entry: NewPatientEntry): Patient => {
    const newPatientEntry =  toNewPatientEntry(entry) as Patient;
    newPatientEntry.id = uuid();
    newPatientEntry.entries = [];
    allEntries.push(newPatientEntry);
    return newPatientEntry;
};

const addEntry = (patient: Patient, entry: NewEntry): Patient => {

    const newEntry = {
        id: uuid(),
        ...entry
    };
    patient.entries.push(newEntry);
    return patient;
};

export default {
    getEntries,
    getNonSensitiveEntries,
    addNewPatient,
    addEntry
};
