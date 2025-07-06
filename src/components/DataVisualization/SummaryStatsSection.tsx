import React from 'react';
import { Box } from '@mui/material';
import {
  Language as LanguageIcon,
  Public as ContinentIcon,
  TrendingUp as TrendingUpIcon,
  Translate as TranslateIcon
} from '@mui/icons-material';
import { SummaryStatCard } from './SummaryStatCard';

interface LanguageDistribution {
  language: string;
  count: number;
}

interface ContinentStat {
  continent: {
    name: string;
  };
  countryCount: number;
}

interface SummaryStatsSectionProps {
  languageDistribution: LanguageDistribution[];
  continentStats: ContinentStat[];
  totalUniqueLanguages: number;
  countriesWithManyLanguages: {
    topCountry: { name: string; languageCount: number; languages: string[] } | null;
    topCountries: Array<{ name: string; languageCount: number; languages: string[] }>;
    averageLanguages: string;
  };
}

export const SummaryStatsSection: React.FC<SummaryStatsSectionProps> = ({
  languageDistribution,
  continentStats,
  totalUniqueLanguages,
  countriesWithManyLanguages
}) => {
  return (
    <Box sx={{
      display: 'grid',
      gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
      gap: 2
    }}>
      <SummaryStatCard
        icon={<LanguageIcon />}
        title="Most Spoken Language"
        value={languageDistribution[0]?.language || 'N/A'}
        subtitle={`${languageDistribution[0]?.count || 0} countries`}
        color="secondary"
        delay={700}
      />

      <SummaryStatCard
        icon={<ContinentIcon />}
        title="Largest Continent"
        value={continentStats[0]?.continent.name || 'N/A'}
        subtitle={`${continentStats[0]?.countryCount || 0} countries`}
        color="primary"
        delay={800}
      />

      <SummaryStatCard
        icon={<TrendingUpIcon />}
        title="Top popular languages used across all countries"
        value=""
        subtitle=""
        color="success"
        delay={900}
        chips={languageDistribution.slice(0, 10).map(lang => lang.language)}
        totalLanguages={totalUniqueLanguages}
      />

      <SummaryStatCard
        icon={<TranslateIcon />}
        title="Country with Most Languages"
        value={countriesWithManyLanguages.topCountry?.name || 'N/A'}
        subtitle={`${countriesWithManyLanguages.topCountry?.languageCount || 0} languages spoken`}
        color="warning"
        delay={1000}
        chips={countriesWithManyLanguages.topCountry?.languages || []}
      />
    </Box>
  );
}; 