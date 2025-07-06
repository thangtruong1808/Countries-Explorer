import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { SearchBar, MultipleLanguagesInfo } from '../../components';
import { getFilterSummary } from '../../utils/messageUtils';
import type { Country, Continent } from '../../types';
import { RESPONSIVE_LAYOUT } from '../../utils/layoutUtils';

interface SearchFilterSectionProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedContinents: string[];
  selectedLanguages: string[];
  selectedCurrencies: string[];
  continents: Continent[];
  countriesWithMultipleLanguages: Array<{ country: Country; languages: string[] }>;
}

/**
 * Renders the search bar, filter summary, and multiple languages info.
 */
export const SearchFilterSection: React.FC<SearchFilterSectionProps> = ({
  searchTerm,
  onSearchChange,
  selectedContinents,
  selectedLanguages,
  selectedCurrencies,
  continents,
  countriesWithMultipleLanguages
}) => (
  <Paper
    elevation={0}
    sx={{
      p: 2,
      mb: 2,
      borderRadius: 3,
      border: 1,
      borderColor: 'divider',
      bgcolor: 'background.paper'
    }}
  >
    <Typography
      variant="h6"
      sx={{
        mb: 2,
        fontWeight: 600,
        color: 'text.primary',
        fontSize: '1.25rem'
      }}
    >
      Discover Countries
    </Typography>
    {/* Search Bar */}
    <Box sx={RESPONSIVE_LAYOUT.MARGIN_BOTTOM_SM}>
      <SearchBar searchTerm={searchTerm} onSearchChange={onSearchChange} />
    </Box>
    {/* Filter Status */}
    {(selectedContinents.length > 0 || selectedLanguages.length > 0 || selectedCurrencies.length > 0) && (
      <Box sx={RESPONSIVE_LAYOUT.MARGIN_TOP_MD}>
        <Typography
          variant="body2"
          sx={{ color: 'text.secondary', fontSize: '0.9rem' }}
        >
          {getFilterSummary(selectedContinents, selectedLanguages, continents, selectedCurrencies)}
        </Typography>
      </Box>
    )}
    {/* Multiple Languages Info */}
    <MultipleLanguagesInfo
      countriesWithMultipleLanguages={countriesWithMultipleLanguages}
      selectedLanguages={selectedLanguages}
    />
  </Paper>
); 