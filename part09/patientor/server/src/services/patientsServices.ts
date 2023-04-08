import { Entry } from './../../../client/src/types';
import { data } from '../../data/patients';
import {
  Patient,
  NonSensitivePatientData,
  NewPatient,
  EntryWithoutId,
} from '../types';
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

export const addNewEntry = (
  currentID: string,
  entry: EntryWithoutId
): Entry => {
  const id = uuid();
  const currentPatient = data.find((x) => x.id === currentID);
  if (!currentPatient) {
    throw new Error(`No matching patient ID found for: ${currentID}`);
  }
  const newPatientEntry = { id, ...entry };
  currentPatient?.entries.push(newPatientEntry);
  return newPatientEntry;
};
