import {
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  Alert,
} from '@mui/material';
import { Diagnose, EntryWithoutId } from '../../types';

import { AddEntryForm } from './AddEntryForm';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryWithoutId) => void;
  error?: string;
  diagnosis: Diagnose[];
}

export const AddEntryModal = ({
  modalOpen,
  onClose,
  onSubmit,
  error,
  diagnosis,
}: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>Add a new entry</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{error}</Alert>}
      <AddEntryForm
        onSubmit={onSubmit}
        onCancel={onClose}
        diagnosis={diagnosis}
      />
    </DialogContent>
  </Dialog>
);
