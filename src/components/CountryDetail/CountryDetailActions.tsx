import { Button, DialogActions } from '@mui/material';
import React from 'react';

interface CountryDetailActionsProps {
  onClose: () => void;
  onGoToPage: () => void;
}

/**
 * Action buttons for the CountryDetail modal (Close and Go to Page).
 */
export const CountryDetailActions: React.FC<CountryDetailActionsProps> = ({
  onClose,
  onGoToPage
}) => {
  return (
    <DialogActions sx={{ p: 3, pt: 0, gap: 2 }}>
      <Button
        onClick={onClose}
        variant="outlined"
        sx={{
          borderRadius: 2,
          textTransform: 'none',
          fontWeight: 600,
          px: 3,
        }}
      >
        Close
      </Button>
      <Button
        onClick={onGoToPage}
        variant="contained"
        sx={{
          borderRadius: 2,
          textTransform: 'none',
          fontWeight: 600,
          px: 3,
        }}
      >
        Go to Page Detail
      </Button>
    </DialogActions>
  );
}; 