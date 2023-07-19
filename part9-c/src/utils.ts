import { Diagnosis, Gender, NewEntry, NewPatientEntry } from './types';


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
        throw new Error('Incorrect or missing data');
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
        throw new Error('Incorrect or missing data');
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

export const toNewEntry = (object: unknown): NewEntry => {

        if ( !object || typeof object !== 'object' ) {
            throw new Error('Incorrect or missing data');
        }

        if ("type" in object && "description" in object && "date" in object && "specialist" in object) {

        const required = requiredFields(object.type as NewEntry['type']);
        required.forEach(field => {
            if (!(field in object)) {
                throw new Error('Incorrect or missing data: ' + field);
            }
        });

        const newEntry: NewEntry = {
            type: parseType(object.type),
            description: parseDescription(object.description),
            date: parseDate(object.date),
            specialist: parseSpecialist(object.specialist),
            diagnosisCodes: parseDiagnosisCodes(object)
        };
        return newEntry;
    } else {
        throw new Error('Incorrect or missing data');
    }
    };

// validate Entry type by given type
export const validateEntryType = (type: string): boolean => {
    return ['HealthCheck', 'Hospital', 'OccupationalHealthcare'].includes(type);
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
            return ['description', 'date', 'specialist', 'diagnosisCodes', 'employerName'];
        default:
            throw new Error("Incorrect or missing type");

    }
};


const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {

  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

function parseType(type: unknown) {
    if (!type || !isString(type)) {
        throw new Error('Incorrect or missing type: ' + type);
    }

    return type;
}

function parseDescription(description: unknown) {

    if (!description || !isString(description)) {
        throw new Error('Incorrect or missing description: ' + description);
    }

    return description;

}


const parseDate = (date: unknown) => {
    if (!date || !isString(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }

    return date;
};

const parseSpecialist= (specialist: unknown) => {

    if (!specialist || !isString(specialist)) {
        throw new Error('Incorrect or missing specialist: ' + specialist);
    }

    return specialist;
};

// const assertNever = (value: never): never => {
//   throw new Error(
//     `Unhandled discriminated union member: ${JSON.stringify(value)}`
//   );
// };