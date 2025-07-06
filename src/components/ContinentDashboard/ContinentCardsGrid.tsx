import React from 'react';
import { Box } from '@mui/material';
import { ContinentCard } from './ContinentCard';

interface ContinentStat {
  continent: {
    code: string;
    name: string;
  };
  countryCount: number;
  uniqueLanguages: number;
  uniqueCurrencies: number;
  languages: string[];
  currencies: string[];
}

interface ContinentCardsGridProps {
  continentStats: ContinentStat[];
  expandedLanguages: Record<string, boolean>;
  expandedCurrencies: Record<string, boolean>;
  onToggleLanguagesExpanded: (continentCode: string) => void;
  onToggleCurrenciesExpanded: (continentCode: string) => void;
}

export const ContinentCardsGrid: React.FC<ContinentCardsGridProps> = ({
  continentStats,
  expandedLanguages,
  expandedCurrencies,
  onToggleLanguagesExpanded,
  onToggleCurrenciesExpanded
}) => {
  // Calculate maximum values for progress bars
  const maxCountries = Math.max(...continentStats.map(stat => stat.countryCount));
  const maxLanguages = Math.max(...continentStats.map(stat => stat.uniqueLanguages));
  const maxCurrencies = Math.max(...continentStats.map(stat => stat.uniqueCurrencies));

  return (
    <Box sx={{
      display: 'grid',
      gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
      gap: 2
    }}>
      {continentStats.map((stat, index) => (
        <ContinentCard
          key={stat.continent.code}
          stat={stat}
          index={index}
          maxCountries={maxCountries}
          maxLanguages={maxLanguages}
          maxCurrencies={maxCurrencies}
          expandedLanguages={expandedLanguages}
          expandedCurrencies={expandedCurrencies}
          onToggleLanguagesExpanded={onToggleLanguagesExpanded}
          onToggleCurrenciesExpanded={onToggleCurrenciesExpanded}
        />
      ))}
    </Box>
  );
}; 