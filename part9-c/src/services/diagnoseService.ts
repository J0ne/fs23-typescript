import data from '../../data/diagnoses';

import { DiagnoseEntry, NonSensitiveDiagnoseEntry } from '../types';

const getEntries = (): Array<DiagnoseEntry> => {
    return data;
};

const getNonSensitiveEntries = (): Array<NonSensitiveDiagnoseEntry> => {
    return data.map(({ code, name }) => ({
        code,
        name
    }));
};

export default {
    getEntries,
    getNonSensitiveEntries
};


