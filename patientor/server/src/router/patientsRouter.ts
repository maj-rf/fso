import { toNewEntry } from './../utils/toNewPatientEntry';
import express from 'express';
import {
  getPatients,
  getNonSensitivePatientsData,
  addNewEntry,
} from '../services/patientsServices';
import { addNewPatient } from '../services/patientsServices';
import { toNewPatientEntry } from '../utils/toNewPatientEntry';
const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
  const data = getNonSensitivePatientsData();
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

patientsRouter.get('/:id', (req, res) => {
  const id = req.params.id;
  const data = getPatients();
  const patient = data.find((x) => x.id === id);
  res.json(patient);
});

patientsRouter.post('/:id', (req, res) => {
  try {
    const id = req.params.id;
    const newEntry = toNewEntry(req.body);
    const addedEntry = addNewEntry(id, newEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default patientsRouter;
