import axios from 'axios';
import { Diagnose } from '../types';

import { apiBaseUrl } from '../constants';

export const getAllDiagnoses = async () => {
  const { data } = await axios.get<Diagnose[]>(`${apiBaseUrl}/diagnoses`);
  return data;
};
