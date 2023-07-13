import data from '../../data/patients';
import { v1 as uuid } from 'uuid';

import { PatientEntry, NonSensitivePatientEntry, NewPatientEntry, Gender } from '../types';
import toNewPatientEntry from '../utils';

const getEntries = (): Array<PatientEntry> => {
    return data.map(({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        ssn,
     }) => ({
        id,
        name,
        dateOfBirth,
        gender: gender as Gender,
        occupation,
        ssn,
        entries: []
    }));
};




const allEntries: Array<PatientEntry> = data as Array<PatientEntry>;


const getNonSensitiveEntries = (): Array<NonSensitivePatientEntry> => {
    return data.map(({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
     }) => ({
        id,
        name,
        dateOfBirth,
        gender: gender as Gender,
        occupation,
    }));
};

const addNewPatient = (entry: NewPatientEntry): PatientEntry => {
    const newPatientEntry =  toNewPatientEntry(entry) as PatientEntry;
    newPatientEntry.id = uuid();
    newPatientEntry.entries = [];
    allEntries.push(newPatientEntry);
    return newPatientEntry;
};




export default {
    getEntries,
    getNonSensitiveEntries,
    addNewPatient
};
