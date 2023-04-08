import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import { Card } from '@mui/material';
import { Diagnose, HealthCheckEntry } from '../../types';
export const HealthCheck = ({
  entry,
  diagnosis,
}: {
  entry: HealthCheckEntry;
  diagnosis: Diagnose[];
}) => {
  return (
    <Card sx={{ p: 2, mb: 1 }}>
      <MonitorHeartIcon />
      <p>{entry.date}</p>
      <p>{entry.description}</p>
      <p>Healthcheck Rating: {entry.healthCheckRating}</p>
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
