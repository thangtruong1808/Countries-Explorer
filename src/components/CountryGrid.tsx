import React from 'react';
import { Box, Typography } from '@mui/material';
import { CountryCard } from './CountryCard';
import type { Country } from '../types';
import { NO_RESULTS_MESSAGE } from '../constants';

interface CountryGridProps {
  countries: Country[];
}

export const CountryGrid: React.FC<CountryGridProps> = ({ countries }) => {
  if (countries.length === 0) {
    return (
      <Box
        sx={{
          textAlign: 'center',
          py: 8,
          color: 'text.secondary'
        }}
      >
        <Typography variant="h6" sx={{ mb: 1, fontSize: '1.25rem' }}>
          No countries found
        </Typography>
        <Typography variant="body2" sx={{ fontSize: '1rem' }}>
          {NO_RESULTS_MESSAGE}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: 'repeat(auto-fit, minmax(280px, 1fr))',
          sm: 'repeat(auto-fit, minmax(300px, 1fr))',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
          xl: 'repeat(5, 1fr)'
        },
        gap: 3,
        width: '100%'
      }}
      data-testid="country-grid"
    >
      {countries.map((country) => (
        <CountryCard key={country.code} country={country} />
      ))}
    </Box>
  );
}; 