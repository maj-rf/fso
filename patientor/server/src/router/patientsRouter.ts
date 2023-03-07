import express from 'express';
import { getPatients } from '../services/patientsServices';
import { addNewPatient } from '../services/patientsServices';
import { toNewPatientEntry } from '../utils/toNewPatientEntry';
const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
  const data = getPatients();
  res.json(data);
});

patientsRouter.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedPatient = addNewPatient(newPatientEntry);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default patientsRouter;
