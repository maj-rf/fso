import { useState, useEffect, SyntheticEvent } from 'react';

import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  SelectChangeEvent,
  FormGroup,
  FormControl,
  OutlinedInput,
} from '@mui/material';

import {
  EntryTypes,
  HealthCheckRating,
  EntryWithoutId,
  Diagnose,
} from '../../types';

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryWithoutId) => void;
  diagnosis: Diagnose[];
}

interface TypeOptions {
  value: typeof EntryTypes[number];
  label: string;
}

interface HealthRatingOption {
  value: number;
  label: string | HealthCheckRating;
}

const ratingValues = Object.values(HealthCheckRating).filter(
  (v) => !isNaN(Number(v))
);

const ratingKeys = Object.keys(HealthCheckRating).filter((v) =>
  isNaN(Number(v))
);

const healthRatingOptions: HealthRatingOption[] = ratingValues.map(
  (v, index) => ({
    value: Number(v),
    label: ratingKeys[index],
  })
);

const typeOptions: TypeOptions[] = EntryTypes.map((v) => ({
  value: v,
  label: v.toString(),
}));

export const AddEntryForm = ({ onCancel, onSubmit, diagnosis }: Props) => {
  const [type, setType] = useState<typeof EntryTypes[number]>(EntryTypes[1]);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCode] = useState<Array<Diagnose['code']>>(
    []
  );
  const [ddate, setDDate] = useState('');
  const [dcriteria, setDCriteria] = useState('');
  const [employer, setEmployer] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [healthCheckRating, setHealtCheckRating] = useState<HealthCheckRating>(
    HealthCheckRating.Healthy
  );

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

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

  const onRatingChange = (event: SelectChangeEvent<number>) => {
    event.preventDefault();
    if (typeof event.target.value === 'number') {
      const value = event.target.value;

      if (value) {
        setHealtCheckRating(value);
      }
    }
  };

  const onDiagnosisChange = (
    event: SelectChangeEvent<typeof diagnosisCodes>
  ) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCode(typeof value === 'string' ? value.split(',') : value);
  };

  const addPatient = (event: SyntheticEvent) => {
    event.preventDefault();
    if (type === 'HealthCheck') {
      return onSubmit({
        type,
        date,
        description,
        specialist,
        healthCheckRating,
        diagnosisCodes,
      });
    } else if (type === 'Hospital') {
      return onSubmit({
        type,
        date,
        description,
        specialist,
        diagnosisCodes,
        discharge: {
          date: ddate,
          criteria: dcriteria,
        },
      });
    } else if (type === 'OccupationalHealthcare') {
      return onSubmit({
        type,
        date,
        description,
        specialist,
        diagnosisCodes,
        employerName: employer,
        sickLeave: { startDate, endDate },
      });
    }
    return;
  };

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
              type="date"
              InputLabelProps={{ shrink: true }}
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
              label="Employer Name"
              fullWidth
              value={employer}
              onChange={({ target }) => setEmployer(target.value)}
            />
            <TextField
              label="Start Date"
              fullWidth
              value={startDate}
              onChange={({ target }) => setStartDate(target.value)}
              type="date"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="End Date"
              fullWidth
              value={endDate}
              onChange={({ target }) => setEndDate(target.value)}
              type="date"
              InputLabelProps={{ shrink: true }}
            />
          </div>
        );
      case 'HealthCheck':
        return (
          <div>
            <InputLabel style={{ marginTop: 20 }}>Health Rating</InputLabel>
            <Select
              label="Type"
              fullWidth
              value={healthCheckRating}
              onChange={onRatingChange}
            >
              {healthRatingOptions.map((option) => (
                <MenuItem key={option.label} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </div>
        );
    }
  }

  return (
    <div>
      <form onSubmit={addPatient}>
        <FormGroup>
          <InputLabel style={{ marginTop: 20 }}>Checkup Type</InputLabel>
          <Select label="Type" fullWidth value={type} onChange={onTypeChange}>
            {typeOptions.map((option) => (
              <MenuItem key={option.label} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormGroup>
        <TextField
          label="Date"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
          placeholder="YYYY-MM-DD"
          type="date"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <FormControl sx={{ width: 400 }}>
          <InputLabel id="diagnosis-code-label">Diagnosis Codes</InputLabel>
          <Select
            labelId="diagnosis-code-label"
            id="diagnosis-code-list"
            multiple
            value={diagnosisCodes}
            onChange={onDiagnosisChange}
            input={<OutlinedInput label="Codes" />}
            MenuProps={MenuProps}
          >
            {diagnosis.map((d) => (
              <MenuItem key={d.code} value={d.code}>
                {d.code}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
