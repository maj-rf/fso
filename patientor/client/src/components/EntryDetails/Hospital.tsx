import { Card } from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { HospitalEntry } from '../../types';
export const Hospital = ({ entry }: { entry: HospitalEntry }) => {
  return (
    <Card sx={{ p: 2, mb: 1 }}>
      <LocalHospitalIcon />
      <p>{entry.date}</p>
      <p>{entry.description}</p>
      <p>Discharge Date: {entry.discharge.date}</p>
      <p>Discharge Criteria: {entry.discharge.criteria}</p>
      <p>Diagnosed by: {entry.specialist}</p>
    </Card>
  );
};
