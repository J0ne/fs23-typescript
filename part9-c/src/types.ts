
export interface DiagnoseEntry {
    code: string;
    name: string;
    latin?: string;
}

export type NonSensitiveDiagnoseEntry = Omit<DiagnoseEntry, 'latin'>;


export interface PatientEntry {
    id: string;
    name: string;
    gender: Gender;
    occupation: string;
    dateOfBirth: string;
    ssn?: string;
}

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn'>;

export type NewPatientEntry = Omit<PatientEntry, 'id'>;

export enum Gender {
    male = "male",
    female = "female",
    other = "other",
}



