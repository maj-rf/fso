import { Card } from '@mui/material';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import { Diagnose, OccupationalHealthcareEntry } from '../../types';

export const OccupationalHealthcare = ({
  entry,
  diagnosis,
}: {
  entry: OccupationalHealthcareEntry;
  diagnosis: Diagnose[];
}) => {
  return (
    <Card sx={{ p: 2, mb: 1 }}>
      <MedicalInformationIcon />
      <p>{entry.date}</p>
      <p>{entry.description}</p>
      <p>Employer Name: {entry.employerName}</p>
      <ul>
        {entry.diagnosisCodes?.map((code) => (
          <li key={code}>
            {code}: {diagnosis.find((d) => d.code === code)?.name}
          </li>
        ))}
      </ul>
      <p>Diagnosed by: {entry.specialist}</p>
    </Card>
  );
};
