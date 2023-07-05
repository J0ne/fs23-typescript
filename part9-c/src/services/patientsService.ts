import data from '../../data/patients';
import { v1 as uuid } from 'uuid';

import { PatientEntry, NonSensitivePatientEntry, NewPatientEntry } from '../types';
import toNewPatientEntry from '../utils';

const getEntries = (): Array<PatientEntry> => {
    return data;
};

const allEntries: Array<PatientEntry> = data;


const getNonSensitiveEntries = (): Array<NonSensitivePatientEntry> => {
    return data.map(({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
     }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addNewPatient = (entry: NewPatientEntry): PatientEntry => {
    const newPatientEntry =  toNewPatientEntry(entry) as PatientEntry;
    newPatientEntry.id = uuid();
    allEntries.push(newPatientEntry);
    return newPatientEntry;
};




export default {
    getEntries,
    getNonSensitiveEntries,
    addNewPatient
};
