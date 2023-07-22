import { Diagnosis, Gender, NewEntry, NewPatientEntry, NewEntryType, HealthEntryType,
    NewHealthCheckEntry, NewOccupationalHealthcareEntry, NewHospitalEntry, Discharge, SickLeave } from './types';


const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {

    if ( !object || typeof object !== 'object' ) {
        throw new Error('Incorrect or missing data');
    }

    if ("name" in object && "dateOfBirth" in object && "ssn" in object && "gender" in object && "occupation" in object) {

    const newEntry: NewPatientEntry = {
        name: parseName(object.name),
        dateOfBirth: parseDateOfBirth(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
        entries: []
    };
        return newEntry;
    }
    else {
        throw new Error('Incorrect or missing data when adding new patient');
    }

};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation: ' + occupation);
    }

    return occupation;
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(param.toString());

};

const parseGender = ( gender: unknown): Gender => {
    if(!gender || !isString(gender) || !isGender(gender)){
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name: ' + name);
    }

    return name;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
    if (!dateOfBirth || !isString(dateOfBirth)) {
        throw new Error('Incorrect or missing dateOfBirth: ' + dateOfBirth);
    }

    return dateOfBirth;
};

const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn: ' + ssn);
    }
    return ssn;
};

export const toNewDiagnosis = (object: unknown): Diagnosis => {


    if ( !object || typeof object !== 'object' ) {
        throw new Error('Incorrect or missing data');
    }

    if ("code" in object && "name" in object && "latin" in object) {
        const newEntry: Diagnosis = {
            code: parseCode(object.code),
            name: parseName(object.name),
            latin: parseLatin(object.latin)
        };
        return newEntry;
    }
    else {
        throw new Error('Incorrect or missing data when adding new diagnosis');
    }
};

const parseCode = (code: unknown): string => {
    if (!code || !isString(code)) {
        throw new Error('Incorrect or missing code: ' + code);
    }

    return code;
};

const parseLatin = (latin: unknown): string => {
    if (!latin || !isString(latin)) {
        throw new Error('Incorrect or missing latin: ' + latin);
    }

    return latin;

};

export const toNewEntry = (object: unknown):  NewEntryType => {

    if ( !object || typeof object !== 'object' ) {
        throw new Error('Incorrect or missing data when adding new entry');
    }


    if (isEntry(object)) {

        const type = parseType(object.type);
        const required = requiredFields(type);

        const newEntry: NewEntry = {
            type: type,
            description: parseDescription(object.description),
            date: parseDate(object.date),
            specialist: parseSpecialist(object.specialist),
            diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes)
        };

        if (required.every(field => Object.keys(object).includes(field))) {
            switch (type) {
                case 'HealthCheck':
                    if ( "healthCheckRating" in object) {
                        return {
                            ...newEntry,
                            healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
                        } as NewHealthCheckEntry;
                    }   else {
                        throw new Error("Incorrect or missing type healthCheckRating");
                    }
                case 'Hospital':
                    if ( "discharge" in object) {
                        return {
                            ...newEntry,
                            discharge: parseDischarge(object.discharge)
                        } as NewHospitalEntry;
                    }
                    else {
                        throw new Error("Incorrect or missing type discharge");
                    }

                case 'OccupationalHealthcare':

                    if ( "employerName" in object && "sickLeave" in object) {
                        return {
                            ...newEntry,
                            employerName: parseName(object.employerName),
                            sickLeave: parseSickLeave(object.sickLeave)
                        } as NewOccupationalHealthcareEntry;
                    }
                    else {
                        throw new Error("Incorrect or missing type employerName or sickLeave");
                    }

                default:
                    throw new Error("Incorrect or missing type");
            }
        }

        else {
            throw new Error("Incorrect or missing type");
        }
    }
    else {
        throw new Error('Incorrect or missing data');
    }

};

const isEntry = (param: any): param is NewEntry => {
   return  "type" in param && "description" in param && "date" in param && "specialist" in param && "diagnosisCodes" in param;
};


// validate Entry type by given type
export const validateEntryType = (type: string): boolean => {
    return Object.keys(HealthEntryType).includes(type);
};

// do type check by given type
export const isEntryType = (type: unknown): type is NewEntry['type'] => {
    return typeof type === 'string' && validateEntryType(type);
};


// check required fields by given type
export const requiredFields = (type: NewEntry['type']): Array<string> => {
    switch (type) {
        case 'HealthCheck':
            return ['description', 'date', 'specialist', 'diagnosisCodes', 'healthCheckRating'];
        case 'Hospital':
            return ['description', 'date', 'specialist', 'diagnosisCodes', 'discharge'];
        case 'OccupationalHealthcare':
            return ['description', 'date', 'specialist', 'diagnosisCodes', 'employerName', 'sickLeave'];
        default:
            throw new Error("Incorrect or missing type");

    }
};


const parseDiagnosisCodes = (diagnosisCodes: unknown): Array<Diagnosis['code']> =>  {
    if (!diagnosisCodes || !Array.isArray(diagnosisCodes)) {
        throw new Error('Incorrect or missing diagnosisCodes: ' + diagnosisCodes);
    }

  return diagnosisCodes as Array<Diagnosis['code']>;
};

function parseType(type: unknown): NewEntryType['type']{
    if (!type || !isString(type)) {
        throw new Error('Incorrect or missing type: ' + type);
    }

    return type as NewEntryType['type'];
}

function parseDescription(description: unknown): NewEntry['description'] {

    if (!description || !isString(description)) {
        throw new Error('Incorrect or missing description: ' + description);
    }

    return description;

}


const parseDate = (date: unknown): NewEntry['date'] => {
    if (!date || !isString(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

const parseSpecialist= (specialist: unknown): NewEntry['specialist'] => {

    if (!specialist || !isString(specialist)) {
        throw new Error('Incorrect or missing specialist: ' + specialist);
    }

    return specialist;
};




function parseHealthCheckRating(healthCheckRating: any): number {

    if(!healthCheckRating || !isNumber(healthCheckRating)){
        throw new Error('Incorrect or missing healthCheckRating: ' + healthCheckRating);
    }
    return healthCheckRating;
}

const isNumber = (param: any): param is number => {
    return typeof param === 'number' || param instanceof Number;
};


const parseDischarge = (discharge: any): Discharge => {

    if(!discharge || !isDischarge(discharge)){
        throw new Error('Incorrect or missing discharge: ' + discharge);
    }
    return discharge;

};


const isDischarge = (param: any): param is Discharge => {
    return typeof param === 'object' && param !== null && 'date' in param && 'criteria' in param;
};


const parseSickLeave = (sickLeave: any): SickLeave => {

    if(!sickLeave || !isSickLeave(sickLeave)){
        throw new Error('Incorrect or missing sickLeave: ' + sickLeave);
    }
    return sickLeave;

};

const isSickLeave = (param: any): param is SickLeave => {
    return typeof param === 'object' && param !== null && 'startDate' in param && 'endDate' in param;
};


// const assertNever = (value: never): never => {
//   throw new Error(
//     `Unhandled discriminated union member: ${JSON.stringify(value)}`
//   );
// };