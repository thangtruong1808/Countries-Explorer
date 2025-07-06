import React, { useState, useMemo } from 'react';
import { Container, Box, Typography, Paper } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useCountries } from '../hooks/useCountries';
import {
  SearchBar,
  CountryGrid,
  LoadingSpinner,
  ErrorMessage,
  CountryDetail,
  SideNav,
  MultipleLanguagesInfo,
  LoadMoreButton,
  NavBar,
  ContinentDashboard,
  DataVisualization
} from '../components';
import { applyFilters, getCountriesWithMultipleLanguages } from '../utils';
import { usePaginationStore } from '../store/paginationStore';

import { getFilterSummary } from '../utils/messageUtils';
import { RESPONSIVE_LAYOUT } from '../utils/layoutUtils';
import type { Country } from '../types';
import { BORDER, BORDER_RADIUS, SPACING, BADGE_STYLES } from '../utils/styleUtils';
import { FONT_SIZES, FONT_WEIGHTS, RESPONSIVE_FONT_SIZES } from '../utils/typographyUtils';

export interface HomePageProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ isDarkMode, onToggleTheme }) => {
  const location = useLocation();

  // Tab navigation state
  const [currentTab, setCurrentTab] = useState<string>(() => {
    // Check if we have a selected tab from navigation state
    const selectedTab = location.state?.selectedTab;
    return selectedTab || 'home';
  });

  // SideNav state - separate from tab state
  const [isSideNavOpen, setIsSideNavOpen] = useState<boolean>(false);

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

  // Reset all states to initial values
  const resetAllStates = () => {
    setSearchTerm('');
    setSelectedContinents([]);
    setSelectedLanguages([]);
    setSelectedCurrencies([]);
    setSelectedCountry(null);
    setIsDetailOpen(false);
    setIsSideNavOpen(false);
    // Force complete pagination reset
    resetPagination();
    // Force re-render by updating current tab
    setCurrentTab('home');
  };

  // Handle tab change with reset functionality
  const handleTabChange = (tab: string) => {
    if (tab === 'home') {
      resetAllStates();
    } else if (tab === 'filters') {
      setIsSideNavOpen(true);
    } else {
      setIsSideNavOpen(false);
    }
    setCurrentTab(tab);
  };

  // Handle SideNav close without changing tab
  const handleSideNavClose = () => {
    setIsSideNavOpen(false);
  };

  // Handle Filters tab toggle (reopen SideNav when already on Filters tab)
  const handleFiltersToggle = () => {
    setIsSideNavOpen(true);
  };

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

  // Handle SideNav state when tab changes from navigation
  React.useEffect(() => {
    if (currentTab === 'filters') {
      setIsSideNavOpen(true);
    } else {
      setIsSideNavOpen(false);
    }
  }, [currentTab]);

  // Clear navigation state after using it
  React.useEffect(() => {
    if (location.state?.selectedTab) {
      // Clear the navigation state to prevent it from persisting
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

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
    <Box sx={RESPONSIVE_LAYOUT.FULL_HEIGHT_CONTAINER}>
      {/* Navigation Bar */}
      <NavBar
        currentTab={currentTab}
        onTabChange={handleTabChange}
        isDarkMode={isDarkMode}
        onToggleTheme={onToggleTheme}
        onFiltersToggle={handleFiltersToggle}
      />

      {/* Side Navigation - Show when filters tab is selected */}
      {currentTab === 'filters' && (
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
          isOpen={isSideNavOpen}
          onClose={handleSideNavClose}
        />
      )}

      {/* Main Content */}
      <Box sx={RESPONSIVE_LAYOUT.FLEX_GROW_CONTAINER}>
        {(currentTab === 'home' || currentTab === 'filters') && (
          <Container maxWidth="xl" sx={{ py: 3 }}>
            {/* Search Section */}
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
                <SearchBar
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                />
              </Box>

              {/* Filter Status */}
              {(selectedContinents.length > 0 || selectedLanguages.length > 0 || selectedCurrencies.length > 0) && (
                <Box sx={RESPONSIVE_LAYOUT.MARGIN_TOP_MD}>
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
        )}

        {/* Continent Dashboard Tab */}
        {currentTab === 'dashboard' && (
          <Container maxWidth="xl" sx={{ py: 4 }}>
            <ContinentDashboard
              countries={countries}
              continents={continents}
            />
          </Container>
        )}

        {/* Data Visualization Tab */}
        {currentTab === 'charts' && (
          <Container maxWidth="xl" sx={{ py: 4 }}>
            <DataVisualization
              countries={countries}
              continents={continents}
            />
          </Container>
        )}
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