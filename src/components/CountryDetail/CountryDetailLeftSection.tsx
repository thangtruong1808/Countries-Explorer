import { Box } from '@mui/material';
import React from 'react';
import type { Country } from '../../types';
import { CountryFlagSection } from './CountryFlagSection';
import { CountryDescriptionSection } from './CountryDescriptionSection';
import { CountryMapSection } from './CountryMapSection';

interface CountryDetailLeftSectionProps {
  country: Country;
  description: string;
  loadingDescription: boolean;
}

/**
 * Left section component containing flag, description, and map.
 */
export const CountryDetailLeftSection: React.FC<CountryDetailLeftSectionProps> = ({
  country,
  description,
  loadingDescription
}) => {
  return (
    <Box sx={{ flex: { lg: '0 0 400px' } }}>
      <CountryFlagSection country={country} />
      <CountryDescriptionSection
        country={country}
        description={description}
        loadingDescription={loadingDescription}
      />
      <CountryMapSection country={country} />
    </Box>
  );
}; 