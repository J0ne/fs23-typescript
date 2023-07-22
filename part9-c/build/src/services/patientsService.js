"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
const uuid_1 = require("uuid");
const utils_1 = require("../utils");
const getEntries = () => {
    return patients_1.default.map(({ id, ssn, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        ssn,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
};
const allEntries = getEntries();
const getNonSensitiveEntries = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender: gender,
        occupation,
        entries
    }));
};
const addNewPatient = (entry) => {
    const newPatientEntry = (0, utils_1.toNewPatientEntry)(entry);
    newPatientEntry.id = (0, uuid_1.v1)();
    newPatientEntry.entries = [];
    allEntries.push(newPatientEntry);
    return newPatientEntry;
};
const addEntry = (patient, entry) => {
    const newEntry = Object.assign({ id: (0, uuid_1.v1)() }, entry);
    patient.entries.push(newEntry);
    return patient;
};
exports.default = {
    getEntries,
    getNonSensitiveEntries,
    addNewPatient,
    addEntry
};
