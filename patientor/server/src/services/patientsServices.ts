import { data } from '../../data/patients';
import { Patient } from '../types';

type PublicPatient = Omit<Patient, 'ssn'>;

export const getPatients = (): PublicPatient[] => {
  return data.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};
