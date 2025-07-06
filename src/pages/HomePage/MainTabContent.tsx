import React from 'react';
import { Container } from '@mui/material';
import { ContinentDashboard, DataVisualization, LoadingSpinner } from '../../components';
import type { Continent, Country } from '../../types';
import { ResultsSection } from './ResultsSection';
import { SearchFilterSection } from './SearchFilterSection';

interface MainTabContentProps {
  currentTab: string;
  countries: Country[];
  continents: Continent[];
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedContinents: string[];
  selectedLanguages: string[];
  selectedCurrencies: string[];
  countriesWithMultipleLanguages: Array<{ country: Country; languages: string[] }>;
  filteredCountries: Country[];
  allFilteredCountries: Country[];
  onCountryClick: (country: Country) => void;
  onClearFilters: () => void;
  onLoadMore: () => void;
  isLoading: boolean;
  hasMore: boolean;
  totalLoaded: number;
  totalAvailable: number;
}

/**
 * Renders the main tab content (search/filter, results, dashboard, charts).
 */
export const MainTabContent: React.FC<MainTabContentProps> = ({
  currentTab,
  countries,
  continents,
  searchTerm,
  onSearchChange,
  selectedContinents,
  selectedLanguages,
  selectedCurrencies,
  countriesWithMultipleLanguages,
  filteredCountries,
  allFilteredCountries,
  onCountryClick,
  onClearFilters,
  onLoadMore,
  isLoading,
  hasMore,
  totalLoaded,
  totalAvailable
}) => {
  if (isLoading) return <LoadingSpinner />;
  return (
    <>
      {(currentTab === 'home' || currentTab === 'filters') && (
        <Container maxWidth="xl" sx={{ py: 3 }}>
          <SearchFilterSection
            searchTerm={searchTerm}
            onSearchChange={onSearchChange}
            selectedContinents={selectedContinents}
            selectedLanguages={selectedLanguages}
            selectedCurrencies={selectedCurrencies}
            continents={continents}
            countriesWithMultipleLanguages={countriesWithMultipleLanguages}
          />
          <ResultsSection
            filteredCountries={filteredCountries}
            allFilteredCountries={allFilteredCountries}
            continents={continents}
            searchTerm={searchTerm}
            selectedContinents={selectedContinents}
            selectedLanguages={selectedLanguages}
            onCountryClick={onCountryClick}
            onClearFilters={onClearFilters}
            onLoadMore={onLoadMore}
            isLoading={isLoading}
            hasMore={hasMore}
            totalLoaded={totalLoaded}
            totalAvailable={totalAvailable}
          />
        </Container>
      )}
      {currentTab === 'dashboard' && (
        <Container maxWidth="xl" sx={{ py: 4 }}>
          <ContinentDashboard countries={countries} continents={continents} />
        </Container>
      )}
      {currentTab === 'charts' && (
        <Container maxWidth="xl" sx={{ py: 4 }}>
          <DataVisualization countries={countries} continents={continents} />
        </Container>
      )}
    </>
  );
}; 