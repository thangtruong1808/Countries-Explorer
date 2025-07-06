import { Box, Paper, Typography } from '@mui/material';
import { AttachMoney as CurrencyIcon } from '@mui/icons-material';
import React from 'react';
import type { Country } from '../../types';

interface CountryCurrencyInfoProps {
  country: Country;
}

/**
 * Displays the country's currency information.
 */
export const CountryCurrencyInfo: React.FC<CountryCurrencyInfoProps> = ({ country }) => {
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
        Currency
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <CurrencyIcon sx={{ color: 'primary.main', fontSize: 20 }} />
        <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 600 }}>
          {country.currency}
        </Typography>
      </Box>
    </Paper>
  );
}; 