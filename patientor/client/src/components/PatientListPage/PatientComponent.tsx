import { Typography, Container, Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPatient } from '../../services/patients';
import { Diagnose, Patient } from '../../types';
import { AddEntryModal } from '../AddEntryModal';
import { EntryDetails } from '../EntryDetails/EntryDetails';

export const PatientComponent = ({ diagnosis }: { diagnosis: Diagnose[] }) => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

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
        <Button variant="contained" onClick={() => openModal()}>
          Add New Entry
        </Button>
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
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={() => console.log('open')}
        error={error}
        onClose={closeModal}
      />
    </Container>
  );
};
