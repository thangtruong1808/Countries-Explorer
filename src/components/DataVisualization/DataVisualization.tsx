import React from 'react';
import { Box } from '@mui/material';
import type { Country, Continent } from '../../types';
import { getContinentStats, getLanguageDistribution, getContinentChartData, getCountriesWithManyLanguages } from '../../utils/dashboardUtils';
import { SPACING } from '../../utils/styleUtils';
import { DashboardHeader } from './DashboardHeader';
import { ChartsGrid } from './ChartsGrid';
import { SummaryStatsSection } from './SummaryStatsSection';

interface DataVisualizationProps {
  countries: Country[];
  continents: Continent[];
}

export const DataVisualization: React.FC<DataVisualizationProps> = ({
  countries,
  continents
}) => {
  const continentStats = React.useMemo(() =>
    getContinentStats(countries, continents),
    [countries, continents]
  );

  const languageDistribution = React.useMemo(() =>
    getLanguageDistribution(countries),
    [countries]
  );

  const continentChartData = React.useMemo(() =>
    getContinentChartData(continentStats),
    [continentStats]
  );

  const countriesWithManyLanguages = React.useMemo(() =>
    getCountriesWithManyLanguages(countries),
    [countries]
  );

  // Calculate total unique languages across all countries
  const totalUniqueLanguages = React.useMemo(() => {
    const allLanguages = countries.flatMap(country =>
      country.languages?.map(lang => lang.name) || []
    );
    return new Set(allLanguages).size;
  }, [countries]);

  return (
    <Box sx={{ px: SPACING.LG, pb: SPACING.LG }}>
      {/* Enhanced Header */}
      <DashboardHeader />

      {/* Charts Grid */}
      <ChartsGrid
        languageDistribution={languageDistribution}
        continentChartData={continentChartData}
      />

      {/* Enhanced Summary Statistics */}
      <SummaryStatsSection
        languageDistribution={languageDistribution}
        continentStats={continentStats}
        totalUniqueLanguages={totalUniqueLanguages}
        countriesWithManyLanguages={countriesWithManyLanguages}
      />
    </Box>
  );
}; 