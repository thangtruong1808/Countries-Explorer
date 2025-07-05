import React, { useState, useMemo } from 'react';
import { Container, Box, Typography, Paper, Divider } from '@mui/material';
import { useCountries } from './hooks/useCountries';
import {
  SearchBar,
  CountryGrid,
  LoadingSpinner,
  ErrorMessage,
  Footer,
  ThemeToggle,
  CountryDetail,
  SideNav
} from './components';
import { applyFilters } from './utils';
import { APP_TITLE } from './constants';
import { getFilterSummary } from './utils/messageUtils';
import type { Country } from './types';

interface AppProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

const App: React.FC<AppProps> = ({ isDarkMode, onToggleTheme }) => {
  const { countries, continents, loading, error } = useCountries();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedContinents, setSelectedContinents] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
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
  };

  // Apply search, continent, and language filters with memoization
  const filteredCountries = useMemo(() =>
    applyFilters(countries, searchTerm, selectedContinents, selectedLanguages),
    [countries, searchTerm, selectedContinents, selectedLanguages]
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box
        component="header"
        sx={{
          bgcolor: 'background.paper',
          borderBottom: 1,
          borderColor: 'divider',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              py: 2,
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: 'primary.main',
                fontSize: { xs: '1.5rem', sm: '2rem' },
              }}
            >
              {APP_TITLE}
            </Typography>
            <ThemeToggle isDarkMode={isDarkMode} onToggle={onToggleTheme} />
          </Box>
        </Container>
      </Box>

      {/* Side Navigation */}
      <SideNav
        continents={continents}
        countries={countries}
        selectedContinents={selectedContinents}
        selectedLanguages={selectedLanguages}
        onContinentToggle={handleContinentToggle}
        onLanguageToggle={handleLanguageToggle}
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
            {(selectedContinents.length > 0 || selectedLanguages.length > 0) && (
              <Box sx={{ mt: 3 }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    fontSize: '0.9rem'
                  }}
                >
                  {getFilterSummary(selectedContinents, selectedLanguages, continents)}
                </Typography>
              </Box>
            )}
          </Paper>

          {/* Results Section */}
          <Box>
            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: 'text.primary',
                  fontSize: '1.375rem'
                }}
              >
                Countries
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  bgcolor: 'primary.light',
                  color: 'primary.contrastText',
                  px: 2,
                  py: 0.5,
                  borderRadius: 2,
                  fontWeight: 600,
                  fontSize: '0.9rem'
                }}
              >
                {filteredCountries.length} {filteredCountries.length === 1 ? 'country' : 'countries'}
              </Typography>
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
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Footer />

      {/* Country Detail Modal */}
      <CountryDetail
        country={selectedCountry}
        open={isDetailOpen}
        onClose={handleDetailClose}
      />
    </Box>
  );
};

export default App;
