import { Gender, NewPatient } from '../types';

function isString(str: unknown): str is string {
  return typeof str === 'string' || str instanceof String;
}

function isDate(date: string): boolean {
  return Boolean(Date.parse(date));
}

function isGender(param: string): param is Gender {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
}

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const parseSSN = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }
  return ssn;
};

const parseOccupation = (occ: unknown): string => {
  if (!isString(occ)) {
    throw new Error('Incorrect or missing occupation');
  }
  return occ;
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date:' + date);
  }
  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender:' + gender);
  }
  return gender;
};

export const toNewPatientEntry = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }
  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object
  ) {
    const newPatientEntry: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSSN(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
    };
    return newPatientEntry;
  } else throw new Error('Incorrect data: some fields are missing');
};
