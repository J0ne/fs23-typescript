import data from '../../data/patients';
import { PatientEntry, NonSensitivePatientEntry } from '../types/patientsEntry';


const getEntries = (): Array<PatientEntry> => {
    return data;
}

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
}

export default {
    getEntries,
    getNonSensitiveEntries,
};
