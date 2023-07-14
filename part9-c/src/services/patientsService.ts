import data from '../../data/patients';
import { v1 as uuid } from 'uuid';

import { Patient, NonSensitivePatientEntry, NewPatientEntry } from '../types';
import toNewPatientEntry from '../utils';

const getEntries = (): Array<Patient> => {
    return data.map(({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        ssn,
        entries
     }) => ({
        id,
        name,
        dateOfBirth,
        gender: gender ,
        occupation,
        ssn,
        entries
    }));
};




const allEntries: Array<Patient> = data ;


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




export default {
    getEntries,
    getNonSensitiveEntries,
    addNewPatient
};
