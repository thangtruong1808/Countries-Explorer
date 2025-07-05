import React, { useState, useMemo } from 'react';
import { Container, Box, Typography, Paper } from '@mui/material';
import { useCountries } from '../hooks/useCountries';
import {
  SearchBar,
  CountryGrid,
  LoadingSpinner,
  ErrorMessage,
  CountryDetail,
  SideNav,
  MultipleLanguagesInfo,
  LoadMoreButton
} from '../components';
import { applyFilters, getCountriesWithMultipleLanguages } from '../utils';
import { usePaginationStore } from '../store/paginationStore';

import { getFilterSummary } from '../utils/messageUtils';
import type { Country } from '../types';

export const HomePage: React.FC = () => {
  // Pagination store
  const {
    itemsPerLoad,
    totalDisplayed,
    hasMore,
    isLoading: paginationLoading,
    loadMore,
    resetPagination,
    setHasMore,
    setLoading
  } = usePaginationStore();

  // Get all countries
  const { countries, continents, totalCount, loading, error } = useCountries();

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedContinents, setSelectedContinents] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedCurrencies, setSelectedCurrencies] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);

  // Toggle continent selection (add/remove from array)
  const handleContinentToggle = (code: string) => {
    setSelectedContinents((prev) =>
      prev.includes(code)
        ? prev.filter((c) => c !== code)
        : [...prev, code]
    );
  };

  // Toggle language selection (add/remove from array)
  const handleLanguageToggle = (languageName: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(languageName)
        ? prev.filter((l) => l !== languageName)
        : [...prev, languageName]
    );
  };

  // Toggle currency selection (add/remove from array)
  const handleCurrencyToggle = (currency: string) => {
    setSelectedCurrencies((prev) =>
      prev.includes(currency)
        ? prev.filter((c) => c !== currency)
        : [...prev, currency]
    );
  };

  // Handle country card click
  const handleCountryClick = (country: Country) => {
    setSelectedCountry(country);
    setIsDetailOpen(true);
  };

  // Handle detail modal close
  const handleDetailClose = () => {
    setIsDetailOpen(false);
    setSelectedCountry(null);
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedContinents([]);
    setSelectedLanguages([]);
    setSelectedCurrencies([]);
    resetPagination();
  };

  // Reset pagination when filters change
  React.useEffect(() => {
    resetPagination();
  }, [searchTerm, selectedContinents, selectedLanguages, selectedCurrencies, resetPagination]);

  // Handle load more
  const handleLoadMore = async () => {
    setLoading(true);
    try {
      loadMore(totalCount);
    } catch (error) {
      console.error('Error loading more countries:', error);
    } finally {
      setLoading(false);
    }
  };

  // Apply search, continent, language, and currency filters with memoization
  const filteredCountries = useMemo(() => {
    const allFiltered = applyFilters(countries, searchTerm, selectedContinents, selectedLanguages, selectedCurrencies);
    // Apply pagination to filtered results
    return allFiltered.slice(0, totalDisplayed);
  }, [countries, searchTerm, selectedContinents, selectedLanguages, selectedCurrencies, totalDisplayed]);

  // Get all filtered countries (without pagination) for multiple languages info
  const allFilteredCountries = useMemo(() =>
    applyFilters(countries, searchTerm, selectedContinents, selectedLanguages, selectedCurrencies),
    [countries, searchTerm, selectedContinents, selectedLanguages, selectedCurrencies]
  );

  // Get countries that speak multiple selected languages
  const countriesWithMultipleLanguages = useMemo(() =>
    getCountriesWithMultipleLanguages(allFilteredCountries, selectedLanguages),
    [allFilteredCountries, selectedLanguages]
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Side Navigation */}
      <SideNav
        continents={continents}
        countries={countries}
        selectedContinents={selectedContinents}
        selectedLanguages={selectedLanguages}
        selectedCurrencies={selectedCurrencies}
        onContinentToggle={handleContinentToggle}
        onLanguageToggle={handleLanguageToggle}
        onCurrencyToggle={handleCurrencyToggle}
        onResetFilters={handleClearFilters}
      />

      {/* Main Content */}
      <Box sx={{ flex: 1 }}>
        <Container maxWidth="xl" sx={{ py: 4 }}>
          {/* Search Section */}
          <Paper
            elevation={0}
            sx={{
              p: 4,
              mb: 4,
              borderRadius: 3,
              border: 1,
              borderColor: 'divider',
              bgcolor: 'background.paper'
            }}
          >
            <Typography
              variant="h6"
              sx={{
                mb: 3,
                fontWeight: 600,
                color: 'text.primary',
                fontSize: '1.375rem'
              }}
            >
              Discover Countries
            </Typography>

            {/* Search Bar */}
            <Box sx={{ mb: 2 }}>
              <Typography
                variant="body2"
                sx={{
                  mb: 1.5,
                  color: 'text.secondary',
                  fontWeight: 500,
                  fontSize: '0.95rem'
                }}
              >
                Search by country name
              </Typography>
              <SearchBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />
            </Box>

            {/* Filter Status */}
            {(selectedContinents.length > 0 || selectedLanguages.length > 0 || selectedCurrencies.length > 0) && (
              <Box sx={{ mt: 3 }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    fontSize: '0.9rem'
                  }}
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

          {/* Results Section */}
          <Box>
            <Box sx={{
              mb: 3,
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'flex-start', sm: 'center' },
              justifyContent: 'space-between',
              gap: { xs: 2, sm: 0 }
            }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: 'text.primary',
                  fontSize: { xs: '1.25rem', sm: '1.375rem' }
                }}
              >
                Countries
              </Typography>
              <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'flex-start', sm: 'center' },
                gap: { xs: 1, sm: 2 },
                width: { xs: '100%', sm: 'auto' }
              }}>
                <Typography
                  variant="body2"
                  sx={{
                    bgcolor: 'primary.light',
                    color: 'primary.contrastText',
                    px: 2,
                    py: 0.5,
                    borderRadius: 2,
                    fontWeight: 600,
                    fontSize: { xs: '0.85rem', sm: '0.9rem' },
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
              onCountryClick={handleCountryClick}
              searchTerm={searchTerm}
              selectedContinents={selectedContinents}
              selectedLanguages={selectedLanguages}
              continents={continents}
              onClearFilters={handleClearFilters}
            />

            {/* Load More Button */}
            {allFilteredCountries.length > 0 && (
              <LoadMoreButton
                onLoadMore={handleLoadMore}
                isLoading={paginationLoading}
                hasMore={hasMore && filteredCountries.length < allFilteredCountries.length}
                totalLoaded={filteredCountries.length}
                totalAvailable={allFilteredCountries.length}
              />
            )}
          </Box>
        </Container>
      </Box>

      {/* Country Detail Modal */}
      <CountryDetail
        country={selectedCountry}
        open={isDetailOpen}
        onClose={handleDetailClose}
      />
    </Box>
  );
}; 