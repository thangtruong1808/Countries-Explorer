import { Box, Paper, Typography } from '@mui/material';
import React from 'react';
import type { Country } from '../../types';

interface CountryMapSectionProps {
  country: Country;
}

/**
 * Displays an interactive Google Maps iframe for the country location.
 */
export const CountryMapSection: React.FC<CountryMapSectionProps> = ({ country }) => {
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
        Location Map
      </Typography>
      <Box
        sx={{
          width: '100%',
          height: 250,
          borderRadius: 2,
          overflow: 'hidden',
          border: '1px solid',
          borderColor: 'divider',
          position: 'relative',
          background: 'background.paper',
          '& iframe': {
            border: 'none',
            width: '100%',
            height: '100%',
          }
        }}
      >
        <iframe
          src={`https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(country.name)}`}
          title={`Map of ${country.name}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </Box>
      <Typography variant="caption" sx={{
        color: 'text.secondary',
        mt: 1,
        display: 'block',
        fontSize: '0.75rem'
      }}>
        Interactive map showing the location of {country.name}
      </Typography>
    </Paper>
  );
}; 