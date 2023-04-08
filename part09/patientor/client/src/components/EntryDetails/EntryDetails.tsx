import { Diagnose, Entry } from '../../types';
import { Hospital } from './Hospital';
import { OccupationalHealthcare } from './OccupationalHealthcare';
import { HealthCheck } from './HealthCheck';
export const EntryDetails = ({
  entry,
  diagnosis,
}: {
  entry: Entry;
  diagnosis: Diagnose[];
}) => {
  switch (entry.type) {
    case 'Hospital':
      return <Hospital entry={entry} diagnosis={diagnosis} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcare entry={entry} diagnosis={diagnosis} />;
    case 'HealthCheck':
      return <HealthCheck entry={entry} diagnosis={diagnosis} />;
  }
};
