import { Card } from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { HospitalEntry, Diagnose } from '../../types';
export const Hospital = ({
  entry,
  diagnosis,
}: {
  entry: HospitalEntry;
  diagnosis: Diagnose[];
}) => {
  return (
    <Card sx={{ p: 2, mb: 1 }}>
      <LocalHospitalIcon />
      <p>{entry.date}</p>
      <p>{entry.description}</p>
      <p>Discharge Date: {entry.discharge.date}</p>
      <p>Discharge Criteria: {entry.discharge.criteria}</p>
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
