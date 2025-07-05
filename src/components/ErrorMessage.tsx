import React from 'react';
import { Alert, Box } from '@mui/material';
import { ERROR_PREFIX } from '../constants';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 200
      }}
      data-testid="error-message"
    >
      <Alert severity="error" sx={{ maxWidth: 600 }}>
        {ERROR_PREFIX}{message}
      </Alert>
    </Box>
  );
}; 