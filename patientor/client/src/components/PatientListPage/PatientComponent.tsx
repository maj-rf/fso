import {
  Card,
  CardHeader,
  List,
  ListItem,
  CardContent,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPatient } from '../../services/patients';
import { Diagnose, Patient } from '../../types';

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
    <Card sx={{ maxWidth: 'max-content' }}>
      <CardHeader title={patient?.name} />
      <CardContent>
        <Typography variant="body1" component="div">
          Occupation: {patient?.occupation}
        </Typography>
        <Typography gutterBottom variant="body1" component="div">
          SSN: {patient?.ssn}
        </Typography>
        <Typography variant="h6">Entries</Typography>
        {patient?.entries.map((entry) => {
          return (
            <List key={entry.id}>
              <ListItem>{entry.date}</ListItem>
              <ListItem>{entry.description}</ListItem>
              <ul>
                {entry.diagnosisCodes?.map((code) => (
                  <li key={code}>
                    {code}: {diagnosis.find((d) => d.code === code)?.name}
                  </li>
                ))}
              </ul>
            </List>
          );
        })}
      </CardContent>
    </Card>
  );
};
