import { Box } from '@mui/material';
import React from 'react';
import type { Country } from '../../types';
import { CountryDetailLeftSection } from './CountryDetailLeftSection';
import { CountryDetailRightSection } from './CountryDetailRightSection';

interface CountryDetailContentProps {
  country: Country;
  description: string;
  loadingDescription: boolean;
}

/**
 * Main content component that displays the left and right sections of country details.
 */
export const CountryDetailContent: React.FC<CountryDetailContentProps> = ({
  country,
  description,
  loadingDescription
}) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 4 }}>
      <CountryDetailLeftSection
        country={country}
        description={description}
        loadingDescription={loadingDescription}
      />
      <CountryDetailRightSection country={country} />
    </Box>
  );
}; 