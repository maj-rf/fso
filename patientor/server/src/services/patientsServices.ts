import { data } from '../../data/patients';
import { Patient } from '../types';
import { NewPatient } from '../types';
import { v1 as uuid } from 'uuid';

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

export const addNewPatient = (entry: NewPatient): Patient => {
  const id = uuid();
  const newPatientEntry = {
    id,
    ...entry,
  };
  data.push(newPatientEntry);
  return newPatientEntry;
};
