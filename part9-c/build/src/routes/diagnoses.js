"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const diagnoseService_1 = __importDefault(require("../services/diagnoseService"));
const utils_1 = require("../utils");
const diagnosesRouter = express_1.default.Router();
diagnosesRouter.get('/', (_req, res) => {
    res.send(diagnoseService_1.default.getNonSensitiveEntries());
});
diagnosesRouter.post('/', (req, res) => {
    const newDiagnoseEntry = diagnoseService_1.default.addNewDiagnosis((0, utils_1.toNewDiagnosis)(req.body));
    res.json(newDiagnoseEntry);
    res.send('Saving a diagnose!');
});
exports.default = diagnosesRouter;
