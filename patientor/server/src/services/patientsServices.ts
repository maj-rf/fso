import { data } from '../../data/patients';
import { Patient, NonSensitivePatientData, NewPatient } from '../types';
import { v1 as uuid } from 'uuid';

export const getPatients = (): Patient[] => {
  return data;
};

export const getNonSensitivePatientsData =
  (): Array<NonSensitivePatientData> => {
    return data.map((patient) => ({
      id: patient.id,
      name: patient.name,
      dateOfBirth: patient.dateOfBirth,
      gender: patient.gender,
      occupation: patient.occupation,
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
