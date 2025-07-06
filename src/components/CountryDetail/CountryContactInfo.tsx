import { Box, Paper, Typography } from '@mui/material';
import { Phone as PhoneIcon } from '@mui/icons-material';
import React from 'react';
import type { Country } from '../../types';

interface CountryContactInfoProps {
  country: Country;
}

/**
 * Displays the country's contact information including phone code.
 */
export const CountryContactInfo: React.FC<CountryContactInfoProps> = ({ country }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        background: 'background.default',
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
        Contact Information
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <PhoneIcon sx={{ color: 'primary.main', fontSize: 20 }} />
        <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 600 }}>
          +{country.phone}
        </Typography>
      </Box>
    </Paper>
  );
}; 