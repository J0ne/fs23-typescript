
export interface DiagnoseEntry {
    code: string;
    name: string;
    latin?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

export enum Gender {
    male = "male",
    female = "female",
    other = "other",
}


export interface PatientEntry {
    id: string;
    name: string;
    gender: Gender;
    occupation: string;
    dateOfBirth: string;
    ssn: string;
    entries: Entry[];
}

export type NonSensitiveDiagnoseEntry = Omit<DiagnoseEntry, 'latin'>;

export type NewDiagnoseEntry = Omit<DiagnoseEntry, 'code'>;

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn' | 'entries'>;

export type NewPatientEntry = Omit<PatientEntry, 'id'>;





