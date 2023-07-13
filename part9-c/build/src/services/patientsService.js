"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
const uuid_1 = require("uuid");
const utils_1 = __importDefault(require("../utils"));
const getEntries = () => {
    return patients_1.default;
};
const allEntries = patients_1.default;
const getNonSensitiveEntries = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};
const addNewPatient = (entry) => {
    const newPatientEntry = (0, utils_1.default)(entry);
    newPatientEntry.id = (0, uuid_1.v1)();
    allEntries.push(newPatientEntry);
    return newPatientEntry;
};
exports.default = {
    getEntries,
    getNonSensitiveEntries,
    addNewPatient
};
