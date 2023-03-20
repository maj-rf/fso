import { Card, CardHeader, List, ListItem } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPatient } from '../../services/patients';
import { Patient } from '../../types';

export const PatientComponent = () => {
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
    <Card sx={{ maxWidth: 'max-content' }}>
      <CardHeader title={patient?.name} />
      <List>
        <ListItem>Occupation: {patient?.occupation}</ListItem>
        <ListItem>SSN: {patient?.ssn}</ListItem>
      </List>
    </Card>
  );
};
