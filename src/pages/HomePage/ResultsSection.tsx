import React from 'react';
import { Box, Typography } from '@mui/material';
import { CountryGrid, LoadMoreButton } from '../../components';
import type { Country, Continent } from '../../types';
import { RESPONSIVE_LAYOUT } from '../../utils/layoutUtils';
import { BADGE_STYLES } from '../../utils/styleUtils';
import { RESPONSIVE_FONT_SIZES } from '../../utils/typographyUtils';

interface ResultsSectionProps {
  filteredCountries: Country[];
  allFilteredCountries: Country[];
  continents: Continent[];
  searchTerm: string;
  selectedContinents: string[];
  selectedLanguages: string[];
  onCountryClick: (country: Country) => void;
  onClearFilters: () => void;
  onLoadMore: () => void;
  isLoading: boolean;
  hasMore: boolean;
  totalLoaded: number;
  totalAvailable: number;
}

/**
 * Renders the country grid, summary, and load more button.
 */
export const ResultsSection: React.FC<ResultsSectionProps> = ({
  filteredCountries,
  allFilteredCountries,
  continents,
  searchTerm,
  selectedContinents,
  selectedLanguages,
  onCountryClick,
  onClearFilters,
  onLoadMore,
  isLoading,
  hasMore,
  totalLoaded,
  totalAvailable
}) => (
  <Box>
    <Box sx={{
      mb: 2,
      ...RESPONSIVE_LAYOUT.RESPONSIVE_FLEX,
      alignItems: { xs: 'flex-start', sm: 'center' },
      justifyContent: 'space-between',
      ...RESPONSIVE_LAYOUT.RESPONSIVE_GAP
    }}>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          color: 'text.primary',
          fontSize: { xs: '1.125rem', sm: '1.25rem' }
        }}
      >
        Countries
      </Typography>
      <Box sx={{
        ...RESPONSIVE_LAYOUT.RESPONSIVE_FLEX,
        alignItems: { xs: 'flex-start', sm: 'center' },
        gap: { xs: 1, sm: 2 },
        width: { xs: '100%', sm: 'auto' }
      }}>
        <Typography
          variant="body2"
          sx={{
            ...BADGE_STYLES.PRIMARY,
            fontSize: RESPONSIVE_FONT_SIZES.SMALL_MEDIUM,
            textAlign: { xs: 'center', sm: 'left' },
            width: { xs: 'fit-content', sm: 'auto' }
          }}
        >
          {allFilteredCountries.length} {allFilteredCountries.length === 1 ? 'country' : 'countries'} total
        </Typography>
        {allFilteredCountries.length > filteredCountries.length && (
          <Typography
            variant="body2"
            sx={{
              bgcolor: 'background.paper',
              color: 'text.secondary',
              px: 2,
              py: 0.5,
              borderRadius: 2,
              fontWeight: 500,
              fontSize: { xs: '0.8rem', sm: '0.85rem' },
              border: 1,
              borderColor: 'divider',
              textAlign: { xs: 'center', sm: 'left' },
              width: { xs: 'fit-content', sm: 'auto' }
            }}
          >
            Showing {filteredCountries.length} of {allFilteredCountries.length}
          </Typography>
        )}
      </Box>
    </Box>
    <CountryGrid
      countries={filteredCountries}
      onCountryClick={onCountryClick}
      searchTerm={searchTerm}
      selectedContinents={selectedContinents}
      selectedLanguages={selectedLanguages}
      continents={continents}
      onClearFilters={onClearFilters}
    />
    {/* Load More Button */}
    {allFilteredCountries.length > 0 && (
      <LoadMoreButton
        onLoadMore={onLoadMore}
        isLoading={isLoading}
        hasMore={hasMore && filteredCountries.length < allFilteredCountries.length}
        totalLoaded={totalLoaded}
        totalAvailable={totalAvailable}
      />
    )}
  </Box>
); 