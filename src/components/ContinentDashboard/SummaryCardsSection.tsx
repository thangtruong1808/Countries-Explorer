import React from 'react';
import { Box } from '@mui/material';
import { Flag as FlagIcon, Language as LanguageIcon, AttachMoney as CurrencyIcon } from '@mui/icons-material';
import { SummaryCard } from './SummaryCard';
import { SPACING } from '../../utils/styleUtils';

interface SummaryCardsSectionProps {
  totalCountries: number;
  totalLanguages: number;
  totalCurrencies: number;
}

export const SummaryCardsSection: React.FC<SummaryCardsSectionProps> = ({
  totalCountries,
  totalLanguages,
  totalCurrencies
}) => {
  return (
    <Box sx={{
      display: 'grid',
      gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
      gap: 2,
      mb: SPACING.LG
    }}>
      <SummaryCard
        icon={<FlagIcon sx={{ fontSize: 'inherit' }} />}
        value={totalCountries}
        label="Total Countries"
        color="primary"
        delay={300}
      />
      <SummaryCard
        icon={<LanguageIcon sx={{ fontSize: 'inherit' }} />}
        value={totalLanguages}
        label="Languages Spoken"
        color="secondary"
        delay={500}
      />
      <SummaryCard
        icon={<CurrencyIcon sx={{ fontSize: 'inherit' }} />}
        value={totalCurrencies}
        label="Currency Diversity"
        color="warning"
        delay={700}
      />
    </Box>
  );
}; 