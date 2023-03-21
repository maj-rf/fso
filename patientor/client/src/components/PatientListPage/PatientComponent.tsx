import { Typography, Container, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPatient } from '../../services/patients';
import { Diagnose, Patient } from '../../types';
import { EntryDetails } from '../EntryDetails/EntryDetails';

export const PatientComponent = ({ diagnosis }: { diagnosis: Diagnose[] }) => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        const p = await getPatient(id);
        setPatient(p);
      }
    };
    void fetchPatient();
  }, [id]);
  return (
    <Container maxWidth="sm">
      <Box sx={{ bgcolor: '#cfe8fc', p: 2 }}>
        <Typography variant="h4">{patient?.name}</Typography>
        <Typography variant="body1" component="div">
          Occupation: {patient?.occupation}
        </Typography>
        <Typography gutterBottom variant="body1" component="div">
          SSN: {patient?.ssn}
        </Typography>
        <Typography variant="h6">Entries</Typography>
        {patient?.entries.map((entry) => {
          return (
            <EntryDetails key={entry.id} entry={entry} diagnosis={diagnosis} />
          );
        })}
      </Box>
    </Container>
  );
};
