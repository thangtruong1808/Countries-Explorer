import React, { useState, useMemo } from 'react';
import { Container, Box, Typography, Paper, Divider } from '@mui/material';
import { useCountries } from './hooks/useCountries';
import {
  SearchBar,
  ContinentFilter,
  CountryGrid,
  LoadingSpinner,
  ErrorMessage,
  Footer,
  ThemeToggle
} from './components';
import { applyFilters } from './utils';
import { APP_TITLE } from './constants';

interface AppProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

const App: React.FC<AppProps> = ({ isDarkMode, onToggleTheme }) => {
  const { countries, continents, loading, error } = useCountries();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedContinents, setSelectedContinents] = useState<string[]>([]);

  // Toggle continent selection (add/remove from array)
  const handleContinentToggle = (code: string) => {
    setSelectedContinents((prev) =>
      prev.includes(code)
        ? prev.filter((c) => c !== code)
        : [...prev, code]
    );
  };

  // Apply search and continent filters with memoization
  const filteredCountries = useMemo(() =>
    applyFilters(countries, searchTerm, selectedContinents),
    [countries, searchTerm, selectedContinents]
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <Box sx={{
      minHeight: '100vh',
      bgcolor: 'background.default',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Theme Toggle */}
      <ThemeToggle isDarkMode={isDarkMode} onToggle={onToggleTheme} />

      {/* Header Section */}
      <Box sx={{
        bgcolor: 'background.paper',
        borderBottom: 1,
        borderColor: 'divider',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <Container maxWidth="xl" sx={{ py: 3 }}>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 700,
              color: 'primary.main',
              textAlign: 'center'
            }}
          >
            {APP_TITLE}
          </Typography>
        </Container>
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1 }}>
        <Container maxWidth="xl" sx={{ py: 4 }}>
          {/* Search and Filters Section */}
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
            <Box sx={{ mb: 4 }}>
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

            <Divider sx={{ my: 3 }} />

            {/* Continent Filters */}
            <ContinentFilter
              continents={continents}
              selectedContinents={selectedContinents}
              onContinentToggle={handleContinentToggle}
            />
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

            <CountryGrid countries={filteredCountries} />
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default App;
