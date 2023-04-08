import { Typography, Container, Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createEntry, getPatient } from '../../services/patients';
import { Diagnose, EntryWithoutId, Patient } from '../../types';
import { AddEntryModal } from '../AddEntryModal';
import { EntryDetails } from '../EntryDetails/EntryDetails';
import axios from 'axios';

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

  const submitNewEntry = async (values: EntryWithoutId) => {
    try {
      if (id) {
        const entry = await createEntry(id, values);
        if (patient?.entries)
          setPatient({ ...patient, entries: patient?.entries.concat(entry) });
        setModalOpen(false);
      }
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === 'string') {
          const message = e.response.data.replace(
            'Something went wrong. Error: ',
            ''
          );
          console.error(message);
          setError(message);
        } else {
          setError('Unrecognized axios error');
        }
      } else {
        console.error('Unknown error', e);
        setError('Unknown error');
      }
    }
  };

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
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
        diagnosis={diagnosis}
      />
    </Container>
  );
};
