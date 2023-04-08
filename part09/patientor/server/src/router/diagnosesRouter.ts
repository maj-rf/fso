import express from 'express';
import { getDiagnoses } from '../services/diagnosesService';

const diagnosesRouter = express.Router();

diagnosesRouter.get('/', (_req, res) => {
  const data = getDiagnoses();
  res.json(data);
});
export default diagnosesRouter;
