import { useState, SyntheticEvent } from 'react';

import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  SelectChangeEvent,
} from '@mui/material';

import { PatientFormValues, EntryTypes } from '../../types';

interface Props {
  onCancel: () => void;
  onSubmit: (values: PatientFormValues) => void;
}

interface TypeOptions {
  value: typeof EntryTypes[number];
  label: string;
}

const typeOptions: TypeOptions[] = EntryTypes.map((v) => ({
  value: v,
  label: v.toString(),
}));

export const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [type, setType] = useState<typeof EntryTypes[number]>(EntryTypes[1]);
  const [ddate, setDDate] = useState('');
  const [dcriteria, setDCriteria] = useState('');
  const [employer, setEmployer] = useState('');
  const onTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === 'string') {
      const value = event.target.value;
      const t = EntryTypes.find((t) => t.toString() === value);
      if (t) {
        setType(t);
      }
    }
  };

  // const addPatient = (event: SyntheticEvent) => {
  //   event.preventDefault();
  //   onSubmit({
  //     name,
  //     occupation,
  //     ssn,
  //     dateOfBirth,
  //     gender,
  //   });
  // };

  function showTypeEntries() {
    switch (type) {
      case 'Hospital':
        return (
          <div>
            <TextField
              label="Discharge Date"
              fullWidth
              value={ddate}
              onChange={({ target }) => setDDate(target.value)}
            />
            <TextField
              label="Discharge Criteria"
              fullWidth
              value={dcriteria}
              onChange={({ target }) => setDCriteria(target.value)}
            />
          </div>
        );
      case 'OccupationalHealthcare':
        return (
          <div>
            <TextField
              label="Discharge Date"
              fullWidth
              value={ddate}
              onChange={({ target }) => setDDate(target.value)}
            />
          </div>
        );
    }
  }

  return (
    <div>
      <form>
        <InputLabel style={{ marginTop: 20 }}>Checkup Type</InputLabel>
        <Select label="Type" fullWidth value={type} onChange={onTypeChange}>
          {typeOptions.map((option) => (
            <MenuItem key={option.label} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        {type && showTypeEntries()}
        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: 'left' }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: 'right',
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
