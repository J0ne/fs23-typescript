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

export default {
    getEntries,
    getNonSensitiveEntries
};


