import React from 'react';
import { Box } from '@mui/material';
import type { Continent, Country } from '../../types';
import { getContinentStats, getCurrencyDiversity } from '../../utils/dashboardUtils';
import { SPACING } from '../../utils/styleUtils';
import { DashboardHeader } from './DashboardHeader';
import { SummaryCardsSection } from './SummaryCardsSection';
import { ContinentStatsHeader } from './ContinentStatsHeader';
import { ContinentCardsGrid } from './ContinentCardsGrid';

interface ContinentDashboardProps {
  countries: Country[];
  continents: Continent[];
}

export const ContinentDashboard: React.FC<ContinentDashboardProps> = ({
  countries,
  continents
}) => {
  const continentStats = React.useMemo(() =>
    getContinentStats(countries, continents),
    [countries, continents]
  );

  const currencyDiversity = React.useMemo(() =>
    getCurrencyDiversity(countries),
    [countries]
  );

  // State to track expanded languages and currencies for each continent
  const [expandedLanguages, setExpandedLanguages] = React.useState<Record<string, boolean>>({});
  const [expandedCurrencies, setExpandedCurrencies] = React.useState<Record<string, boolean>>({});

  const totalCountries = countries.length;
  const totalLanguages = new Set(
    countries.flatMap(country =>
      country.languages?.map(lang => lang.name) || []
    )
  ).size;
  const totalCurrencies = currencyDiversity.totalCurrencies;

  // Toggle expanded state for languages
  const toggleLanguagesExpanded = (continentCode: string) => {
    setExpandedLanguages(prev => ({
      ...prev,
      [continentCode]: !prev[continentCode]
    }));
  };

  // Toggle expanded state for currencies
  const toggleCurrenciesExpanded = (continentCode: string) => {
    setExpandedCurrencies(prev => ({
      ...prev,
      [continentCode]: !prev[continentCode]
    }));
  };

  return (
    <Box sx={{ p: SPACING.LG }}>
      {/* Enhanced Header */}
      <DashboardHeader />

      {/* Enhanced Summary Cards */}
      <SummaryCardsSection
        totalCountries={totalCountries}
        totalLanguages={totalLanguages}
        totalCurrencies={totalCurrencies}
      />

      {/* Enhanced Continent Statistics */}
      <ContinentStatsHeader />

      <ContinentCardsGrid
        continentStats={continentStats}
        expandedLanguages={expandedLanguages}
        expandedCurrencies={expandedCurrencies}
        onToggleLanguagesExpanded={toggleLanguagesExpanded}
        onToggleCurrenciesExpanded={toggleCurrenciesExpanded}
      />
    </Box>
  );
}; 