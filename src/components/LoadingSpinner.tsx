import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { LOADING_MESSAGE } from '../constants';

export const LoadingSpinner: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 300,
        gap: 2
      }}
      data-testid="loading-spinner"
    >
      <CircularProgress size={40} />
      <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
        {LOADING_MESSAGE}
      </Typography>
    </Box>
  );
}; 