import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import { Card } from '@mui/material';
import { HealthCheckEntry } from '../../types';
export const HealthCheck = ({ entry }: { entry: HealthCheckEntry }) => {
  return (
    <Card sx={{ p: 2, mb: 1 }}>
      <MonitorHeartIcon />
      <p>{entry.date}</p>
      <p>{entry.description}</p>
      <p>Healthcheck Rating: {entry.healthCheckRating}</p>
      <p>Diagnosed by: {entry.specialist}</p>
    </Card>
  );
};
