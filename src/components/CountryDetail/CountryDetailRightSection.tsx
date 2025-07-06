import { Box } from '@mui/material';
import React from 'react';
import type { Country } from '../../types';
import { CountryBasicInfo } from './CountryBasicInfo';
import { CountryCurrencyInfo } from './CountryCurrencyInfo';
import { CountryLanguagesInfo } from './CountryLanguagesInfo';
import { CountryContactInfo } from './CountryContactInfo';

interface CountryDetailRightSectionProps {
  country: Country;
}

/**
 * Right section component containing all country information cards.
 */
export const CountryDetailRightSection: React.FC<CountryDetailRightSectionProps> = ({ country }) => {
  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
      <CountryBasicInfo country={country} />
      {country.currency && <CountryCurrencyInfo country={country} />}
      {country.languages && country.languages.length > 0 && (
        <CountryLanguagesInfo country={country} />
      )}
      {country.phone && <CountryContactInfo country={country} />}
    </Box>
  );
}; 