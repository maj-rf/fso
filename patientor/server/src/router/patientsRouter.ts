import express from 'express';
import { getPatients } from '../services/patientsServices';
import { addNewPatient } from '../services/patientsServices';
import { NewPatient } from '../types';
const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
  const data = getPatients();
  res.json(data);
});

patientsRouter.post('/', (req, res) => {
  const { name, ssn, dateOfBirth, occupation, gender } = req.body as NewPatient;
  const addedPatient = addNewPatient({
    name,
    ssn,
    dateOfBirth,
    occupation,
    gender,
  });
  res.json(addedPatient);
});

export default patientsRouter;
