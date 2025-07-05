import { Refresh as RefreshIcon } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import type { Continent, Country } from '../types';
import { BACKGROUND_COLORS, BORDER_COLORS } from '../utils/colorUtils';
import { getFilterSuggestions, getNoResultsMessage } from '../utils/messageUtils';
import { BORDER, BORDER_RADIUS, SPACING, BADGE_STYLES, BUTTON_STYLES } from '../utils/styleUtils';
import { FONT_WEIGHTS, FONT_SIZES } from '../utils/typographyUtils';
import { RESPONSIVE_LAYOUT } from '../utils/layoutUtils';
import { CountryCard } from './CountryCard';

interface CountryGridProps {
  countries: Country[];
  onCountryClick?: (country: Country) => void;
  searchTerm?: string;
  selectedContinents?: string[];
  selectedLanguages?: string[];
  selectedCurrencies?: string[];
  continents?: Continent[];
  onClearFilters?: () => void;
}

export const CountryGrid: React.FC<CountryGridProps> = ({
  countries,
  onCountryClick,
  searchTerm = '',
  selectedContinents = [],
  selectedLanguages = [],
  selectedCurrencies = [],
  continents = [],
  onClearFilters
}) => {
  if (countries.length === 0) {
    const noResultsMessage = getNoResultsMessage(
      searchTerm,
      selectedContinents,
      selectedLanguages,
      selectedCurrencies,
      continents
    );
    const suggestions = getFilterSuggestions(searchTerm, selectedContinents, selectedLanguages, selectedCurrencies);

    return (
      <Box
        sx={{
          ...RESPONSIVE_LAYOUT.TEXT_CENTER,
          py: 8,
          color: 'text.secondary'
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, fontSize: FONT_SIZES.XL, fontWeight: FONT_WEIGHTS.SEMIBOLD }}>
          No countries found
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, fontSize: FONT_SIZES.MD, maxWidth: 600, mx: 'auto' }}>
          {noResultsMessage}
        </Typography>

        {suggestions.length > 0 && (
          <Box sx={{
            mb: 4,
            p: SPACING.MD,
            borderRadius: BORDER_RADIUS.MEDIUM,
            background: BACKGROUND_COLORS.HOVER,
            border: BORDER.SOLID_1,
            borderColor: BORDER_COLORS.DIVIDER,
            maxWidth: 500,
            mx: 'auto'
          }}>
            <Typography variant="body2" sx={{ mb: 2, fontWeight: FONT_WEIGHTS.MEDIUM }}>
              Suggestions:
            </Typography>
            <Box component="ul" sx={{ m: 0, pl: 2, ...RESPONSIVE_LAYOUT.TEXT_LEFT }}>
              {suggestions.map((suggestion, index) => (
                <Typography key={index} component="li" variant="body2" sx={{ mb: 1 }}>
                  {suggestion}
                </Typography>
              ))}
            </Box>
          </Box>
        )}

        {onClearFilters && (selectedContinents.length > 0 || selectedLanguages.length > 0 || selectedCurrencies.length > 0 || searchTerm.trim().length > 0) && (
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={onClearFilters}
            sx={BUTTON_STYLES.OUTLINED}
          >
            Clear All Filters
          </Button>
        )}
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
        <CountryCard
          key={country.code}
          country={country}
          onClick={onCountryClick}
        />
      ))}
    </Box>
  );
}; 