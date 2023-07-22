"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requiredFields = exports.isEntryType = exports.validateEntryType = exports.toNewEntry = exports.toNewDiagnosis = exports.toNewPatientEntry = void 0;
const types_1 = require("./types");
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const toNewPatientEntry = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ("name" in object && "dateOfBirth" in object && "ssn" in object && "gender" in object && "occupation" in object) {
        const newEntry = {
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
exports.toNewPatientEntry = toNewPatientEntry;
const parseOccupation = (occupation) => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation: ' + occupation);
    }
    return occupation;
};
const isGender = (param) => {
    return Object.values(types_1.Gender).map(v => v.toString()).includes(param.toString());
};
const parseGender = (gender) => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};
const parseName = (name) => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name: ' + name);
    }
    return name;
};
const parseDateOfBirth = (dateOfBirth) => {
    if (!dateOfBirth || !isString(dateOfBirth)) {
        throw new Error('Incorrect or missing dateOfBirth: ' + dateOfBirth);
    }
    return dateOfBirth;
};
const parseSsn = (ssn) => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn: ' + ssn);
    }
    return ssn;
};
const toNewDiagnosis = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ("code" in object && "name" in object && "latin" in object) {
        const newEntry = {
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
exports.toNewDiagnosis = toNewDiagnosis;
const parseCode = (code) => {
    if (!code || !isString(code)) {
        throw new Error('Incorrect or missing code: ' + code);
    }
    return code;
};
const parseLatin = (latin) => {
    if (!latin || !isString(latin)) {
        throw new Error('Incorrect or missing latin: ' + latin);
    }
    return latin;
};
const toNewEntry = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ("type" in object && "description" in object && "date" in object && "specialist" in object) {
        const required = (0, exports.requiredFields)(object.type);
        required.forEach(field => {
            if (!(field in object)) {
                throw new Error('Incorrect or missing data: ' + field);
            }
        });
        const newEntry = {
            type: parseType(object.type),
            description: parseDescription(object.description),
            date: parseDate(object.date),
            specialist: parseSpecialist(object.specialist),
            diagnosisCodes: parseDiagnosisCodes(object)
        };
        return newEntry;
    }
    else {
        throw new Error(`Incorrect or missing data: ${object}`);
    }
};
exports.toNewEntry = toNewEntry;
// validate Entry type by given type
const validateEntryType = (type) => {
    return ['HealthCheck', 'Hospital', 'OccupationalHealthcare'].includes(type);
};
exports.validateEntryType = validateEntryType;
// do type check by given type
const isEntryType = (type) => {
    return typeof type === 'string' && (0, exports.validateEntryType)(type);
};
exports.isEntryType = isEntryType;
// check required fields by given type
const requiredFields = (type) => {
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
exports.requiredFields = requiredFields;
const parseDiagnosisCodes = (object) => {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
        // we will just trust the data to be in correct form
        return [];
    }
    return object.diagnosisCodes;
};
function parseType(type) {
    if (!type || !isString(type)) {
        throw new Error('Incorrect or missing type: ' + type);
    }
    return type;
}
function parseDescription(description) {
    if (!description || !isString(description)) {
        throw new Error('Incorrect or missing description: ' + description);
    }
    return description;
}
const parseDate = (date) => {
    if (!date || !isString(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};
const parseSpecialist = (specialist) => {
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
