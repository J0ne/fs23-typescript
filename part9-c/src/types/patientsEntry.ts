
export interface PatientEntry {
    id: string;
    name: string;
    gender: string;
    occupation: string;
    dateOfBirth: string;
    ssn?: string;
}

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn'>;

export type NewPatientEntry = Omit<PatientEntry, 'id'>;
