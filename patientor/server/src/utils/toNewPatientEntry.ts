//import { Gender, NewPatient, Entry, EntryTypes } from '../types';
import {
  Gender,
  NewPatient,
  Entry,
  EntryTypes,
  EntryWithoutId,
} from '../types';

type SickLeave = {
  startDate: string;
  endDate: string;
};

type Discharge = {
  criteria: string;
  date: string;
};

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

// const isUndefinedOrNull = (arg: unknown): arg is undefined | null => {
//   return typeof arg === 'undefined' || arg === null;
// };

const isArray = (arg: unknown): arg is unknown[] => {
  return Array.isArray(arg);
};

const isObject = (arg: unknown): arg is object => {
  return typeof arg === 'object' && arg !== null;
};

const isEntry = (arg: unknown): arg is Entry => {
  return (
    isObject(arg) &&
    'type' in arg &&
    isString(arg.type) &&
    EntryTypes.includes(arg.type as typeof EntryTypes[number])
  );
};

// const parseEntries = (entries: unknown): Entry[] => {
//   if (isUndefinedOrNull(entries)) return [];

//   if (!isArray(entries))
//     throw new Error('Entries must be convertible to an array.');

//   if (!entries.every((entry): entry is Entry => isEntry(entry)))
//     throw new Error('Each entry must conform to the Entry type.');

//   return entries;
// };

const isSickLeave = (arg: unknown): arg is SickLeave => {
  return (
    isObject(arg) &&
    'startDate' in arg &&
    isString(arg.startDate) &&
    isDate(arg.startDate) &&
    'endDate' in arg &&
    isString(arg.endDate) &&
    isDate(arg.endDate)
  );
};

const isDischarge = (arg: unknown): arg is Discharge => {
  return (
    isObject(arg) &&
    'date' in arg &&
    isString(arg.date) &&
    isDate(arg.date) &&
    'criteria' in arg &&
    isString(arg.criteria)
  );
};

const parseString = (value: unknown, fieldName: string): string => {
  if (!value || !isString(value)) {
    throw new Error(`Incorrect or missing ${fieldName}`);
  }
  return value;
};

// const parseName = (name: unknown): string => {
//   if (!isString(name)) {
//     throw new Error('Incorrect or missing name');
//   }
//   return name;
// };

// const parseSSN = (ssn: unknown): string => {
//   if (!isString(ssn)) {
//     throw new Error('Incorrect or missing ssn');
//   }
//   return ssn;
// };

// const parseOccupation = (occ: unknown): string => {
//   if (!isString(occ)) {
//     throw new Error('Incorrect or missing occupation');
//   }
//   return occ;
// };

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

// const parseDescription = (desc: unknown): string => {
//   if (!isString(desc)) {
//     throw new Error('Incorrect or missing description');
//   }
//   return desc;
// };

// const parseSpecialist = (s: unknown): string => {
//   if (!isString(s)) {
//     throw new Error('Incorrect or missing description');
//   }
//   return s;
// };

const parseDiagnosisCodes = (arg: unknown): Entry['diagnosisCodes'] => {
  if (!isArray(arg) || !arg.every((code): code is string => isString(code)))
    throw new Error('Diagnosis codes must be an array of strings.');

  return arg;
};

const parseSickLeave = (arg: unknown): SickLeave => {
  if (!isSickLeave(arg))
    throw new Error('Sick leave must conform to its type.');

  return {
    startDate: parseDate(arg.startDate),
    endDate: parseDate(arg.endDate),
  };
};

const parseDischarge = (arg: unknown): Discharge => {
  if (!isDischarge(arg)) throw new Error('Discharge must conform to its type.');
  return {
    date: parseDate(arg.date),
    criteria: parseString(arg.criteria, 'criteria'),
  };
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
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
      name: parseString(object.name, 'name'),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseString(object.ssn, 'ssn'),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation, 'occupation'),
      entries: [],
    };
    return newPatientEntry;
  } else throw new Error('Incorrect data: some fields are missing');
};

export const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }
  if (!isEntry(object)) throw new Error('Data must conform to the Entry type.');
  const baseProps = {
    description: parseString(object.description, 'description'),
    date: parseDate(object.date),
    specialist: parseString(object.specialist, 'specialist'),
    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes) || undefined,
  };
  switch (object.type) {
    case 'HealthCheck':
      return {
        ...baseProps,
        type: 'HealthCheck',
        healthCheckRating: object.healthCheckRating,
      };
    case 'Hospital':
      return {
        ...baseProps,
        type: 'Hospital',
        discharge: parseDischarge(object.discharge),
      };
    case 'OccupationalHealthcare':
      return {
        ...baseProps,
        type: 'OccupationalHealthcare',
        employerName: parseString(object.employerName, 'employerName'),
        sickLeave: parseSickLeave(object.sickLeave),
      };
    default:
      return assertNever(object);
  }
};
