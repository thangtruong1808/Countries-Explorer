import React from 'react';
import { Box } from '@mui/material';
import { LanguagePieChart } from './LanguagePieChart';
import { ContinentBarChart } from './ContinentBarChart';
import { SPACING } from '../../utils/styleUtils';

interface LanguageDistribution {
  language: string;
  count: number;
}

interface ContinentChartData {
  continent: string;
  countryCount: number;
  color: string;
}

interface ChartsGridProps {
  languageDistribution: LanguageDistribution[];
  continentChartData: ContinentChartData[];
}

export const ChartsGrid: React.FC<ChartsGridProps> = ({
  languageDistribution,
  continentChartData
}) => {
  return (
    <Box sx={{
      display: 'grid',
      gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, 1fr)' },
      gap: 2,
      mb: SPACING.LG
    }}>
      <LanguagePieChart languageDistribution={languageDistribution} />
      <ContinentBarChart continentChartData={continentChartData} />
    </Box>
  );
}; 