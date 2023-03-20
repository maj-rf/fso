import { Gender, NewPatient, Entry, EntryTypes } from '../types';

function isString(str: unknown): str is string {
  return typeof str === 'string' || str instanceof String;
}

const isUndefinedOrNull = (arg: unknown): arg is undefined | null => {
  return typeof arg === 'undefined' || arg === null;
};

const isArray = (arg: unknown): arg is unknown[] => {
  return Array.isArray(arg);
};

const isObject = (arg: unknown): arg is object => {
  return typeof arg === 'object' && arg !== null;
};

function isDate(date: string): boolean {
  return Boolean(Date.parse(date));
}

function isGender(param: string): param is Gender {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
}

const isEntry = (obj: unknown): obj is Entry => {
  return (
    isObject(obj) &&
    'type' in obj &&
    isString(obj.type) &&
    EntryTypes.includes(obj.type as typeof EntryTypes[number])
  );
};

const parseEntries = (entries: unknown): Entry[] => {
  if (isUndefinedOrNull(entries)) return [];

  if (!isArray(entries))
    throw new Error('Entries must be convertible to an array.');

  if (!entries.every((entry): entry is Entry => isEntry(entry)))
    throw new Error('Each entry must conform to the Entry type.');

  return entries;
};

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
    'occupation' in object &&
    'entries' in object
  ) {
    const newPatientEntry: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSSN(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: parseEntries(object.entries),
    };
    return newPatientEntry;
  } else throw new Error('Incorrect data: some fields are missing');
};
