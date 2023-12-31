
export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

export enum HealthEntryType {
    HealthCheck = "HealthCheck",
    OccupationalHealthcare = "OccupationalHealthcare",
    Hospital = "Hospital"
}


export interface HealthCheckEntry extends BaseEntry {
  type: HealthEntryType.HealthCheck;
  healthCheckRating?: HealthCheckRating;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
    type: HealthEntryType.OccupationalHealthcare;
    employerName: string;
    sickLeave?: SickLeave;
}

export interface HospitalEntry extends BaseEntry {
    type: HealthEntryType.Hospital;
    discharge: Discharge;
}

export interface Discharge {
    date: string;
    criteria: string;
}

export interface SickLeave {
    startDate: string;
    endDate: string;
}



export type EntryType = HealthCheckEntry | OccupationalHealthcareEntry | HospitalEntry;

//Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

//Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, 'id'>;

export interface Entry extends BaseEntry {
    type: string;

}

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other",
}


export interface Patient {
    id: string;
    name: string;
    gender: Gender;
    occupation: string;
    dateOfBirth: string;
    ssn: string;
    entries: Array<Entry>;
}

export type NonSensitiveDiagnosis = Omit<Diagnosis, 'latin'>;

export type NewDiagnosis = Omit<Diagnosis, 'code'>;

export type NonSensitivePatientEntry = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatientEntry = Omit<Patient, 'id'>;

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;

export type NewEntry = Omit<Entry, 'id'>;

export type NewHealthCheckEntry = Omit<HealthCheckEntry, 'id'>;

export type NewOccupationalHealthcareEntry = Omit<OccupationalHealthcareEntry, 'id'>;

export type NewHospitalEntry = Omit<HospitalEntry, 'id'>;

export type NewEntryType = NewHealthCheckEntry | NewOccupationalHealthcareEntry | NewHospitalEntry;

export type NewBaseEntry = Omit<BaseEntry, 'id'>;


