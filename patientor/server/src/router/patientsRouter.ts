import express from 'express';
import { getPatients } from '../services/patientsServices';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
  const data = getPatients();
  res.json(data);
});
export default patientsRouter;
