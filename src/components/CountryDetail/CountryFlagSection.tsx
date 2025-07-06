import { Box, Chip, Paper, Typography } from '@mui/material';
import { Public as ContinentIcon } from '@mui/icons-material';
import React from 'react';
import type { Country } from '../../types';
import { getFlagUrl } from '../../utils/flagUtils';

interface CountryFlagSectionProps {
  country: Country;
}

/**
 * Displays the country flag, name, and continent information.
 */
export const CountryFlagSection: React.FC<CountryFlagSectionProps> = ({ country }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        textAlign: 'center',
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        background: 'background.default',
        mb: 3,
      }}
    >
      <Box
        component="img"
        src={getFlagUrl(country.code)}
        alt={`Flag of ${country.name}`}
        sx={{
          width: '100%',
          maxWidth: 250,
          height: 175,
          borderRadius: 3,
          border: '3px solid',
          borderColor: 'divider',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
          objectFit: 'cover',
          mb: 2,
        }}
      />
      <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary', mb: 1 }}>
        {country.name}
      </Typography>
      <Chip
        label={country.continent.name}
        icon={<ContinentIcon />}
        sx={{
          fontWeight: 600,
          background: 'rgba(100, 108, 255, 0.1)',
          color: 'primary.main',
          border: '1px solid',
          borderColor: 'primary.main',
        }}
      />
    </Paper>
  );
}; 