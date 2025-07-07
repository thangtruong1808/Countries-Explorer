import { Box } from '@mui/material';
import React, { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useCountries } from '../hooks/useCountries';
import { usePaginationStore } from '../store/paginationStore';
import { applyFilters, getCountriesWithMultipleLanguages } from '../utils';
import type { Country } from '../types';
import { RESPONSIVE_LAYOUT } from '../utils/layoutUtils';
import { HomeTabs } from './HomePage/HomeTabs';
import { MainTabContent } from './HomePage/MainTabContent';
import { CountryDetail, LoadingSpinner } from '../components';

export interface HomePageProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

/**
 * HomePage main component. Handles state and orchestrates subcomponents.
 */
export const HomePage: React.FC<HomePageProps> = ({ isDarkMode, onToggleTheme }) => {
  const location = useLocation();

  // Tab navigation state
  const [currentTab, setCurrentTab] = useState<string>(() => {
    const selectedTab = location.state?.selectedTab;
    return selectedTab || 'home';
  });

  // SideNav state
  const [isSideNavOpen, setIsSideNavOpen] = useState<boolean>(false);

  // Pagination store
  const {
    totalDisplayed,
    hasMore,
    isLoading: paginationLoading,
    loadMore,
    resetPagination,
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

  /**
   * Resets all filter and selection states.
   */
  const resetAllStates = () => {
    setSearchTerm('');
    setSelectedContinents([]);
    setSelectedLanguages([]);
    setSelectedCurrencies([]);
    setSelectedCountry(null);
    setIsDetailOpen(false);
    setIsSideNavOpen(false);
    resetPagination();
  };

  /**
   * Handles tab change and resets state if needed.
   */
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

  // SideNav close handler
  const handleSideNavClose = () => setIsSideNavOpen(false);
  // Filters tab toggle handler
  const handleFiltersToggle = () => setIsSideNavOpen(true);

  // Filter selection handlers
  const handleContinentToggle = (code: string) => setSelectedContinents((prev) => prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]);
  const handleLanguageToggle = (languageName: string) => setSelectedLanguages((prev) => prev.includes(languageName) ? prev.filter((l) => l !== languageName) : [...prev, languageName]);
  const handleCurrencyToggle = (currency: string) => setSelectedCurrencies((prev) => prev.includes(currency) ? prev.filter((c) => c !== currency) : [...prev, currency]);

  // Country card click handler
  const handleCountryClick = (country: Country) => {
    setSelectedCountry(country);
    setIsDetailOpen(true);
  };
  // Detail modal close handler
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
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // Load more handler
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

  // Filtered countries (paginated)
  const filteredCountries = useMemo(() => {
    const allFiltered = applyFilters(countries, searchTerm, selectedContinents, selectedLanguages, selectedCurrencies);
    return allFiltered.slice(0, totalDisplayed);
  }, [countries, searchTerm, selectedContinents, selectedLanguages, selectedCurrencies, totalDisplayed]);

  // All filtered countries (no pagination)
  const allFilteredCountries = useMemo(() =>
    applyFilters(countries, searchTerm, selectedContinents, selectedLanguages, selectedCurrencies),
    [countries, searchTerm, selectedContinents, selectedLanguages, selectedCurrencies]
  );

  // Countries that speak multiple selected languages
  const countriesWithMultipleLanguages = useMemo(() =>
    getCountriesWithMultipleLanguages(allFilteredCountries, selectedLanguages),
    [allFilteredCountries, selectedLanguages]
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <Box sx={RESPONSIVE_LAYOUT.FULL_HEIGHT_CONTAINER}>Error: {error.message}</Box>;

  return (
    <Box sx={RESPONSIVE_LAYOUT.FULL_HEIGHT_CONTAINER}>
      <HomeTabs
        currentTab={currentTab}
        onTabChange={handleTabChange}
        isDarkMode={isDarkMode}
        onToggleTheme={onToggleTheme}
        isSideNavOpen={isSideNavOpen}
        onFiltersToggle={handleFiltersToggle}
        onSideNavClose={handleSideNavClose}
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
      <Box sx={RESPONSIVE_LAYOUT.FLEX_GROW_CONTAINER}>
        <MainTabContent
          currentTab={currentTab}
          countries={countries}
          continents={continents}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedContinents={selectedContinents}
          selectedLanguages={selectedLanguages}
          selectedCurrencies={selectedCurrencies}
          countriesWithMultipleLanguages={countriesWithMultipleLanguages}
          filteredCountries={filteredCountries}
          allFilteredCountries={allFilteredCountries}
          onCountryClick={handleCountryClick}
          onClearFilters={handleClearFilters}
          onLoadMore={handleLoadMore}
          isLoading={paginationLoading}
          hasMore={hasMore}
          totalLoaded={filteredCountries.length}
          totalAvailable={allFilteredCountries.length}
        />
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