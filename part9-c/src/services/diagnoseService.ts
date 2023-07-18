import data from '../../data/diagnoses';

import { Diagnosis, NonSensitiveDiagnosis } from '../types';

const getEntries = (): Array<Diagnosis> => {
    return data;
};

const getNonSensitiveEntries = (): Array<NonSensitiveDiagnosis> => {
    return data.map(({ code, name }) => ({
        code,
        name
    }));
};

const addNewDiagnosis = (entry: Diagnosis): Diagnosis => {
    const newDiagnosisEntry = {
        ...entry
    };
    data.push(newDiagnosisEntry);
    return newDiagnosisEntry;
};



export default {
    getEntries,
    getNonSensitiveEntries,
    addNewDiagnosis
};


