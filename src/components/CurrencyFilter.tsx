import { AttachMoney as CurrencyIcon } from '@mui/icons-material';
import { Box, Chip, Tab, Tabs, Typography } from '@mui/material';
import React from 'react';
import type { Country } from '../types';
import { BACKGROUND_COLORS, BORDER_COLORS } from '../utils/colorUtils';
import { getCurrencyCounts, getUniqueCurrencies, groupCurrenciesByLetter } from '../utils/currencyUtils';
import { FILTER_COMPONENT_STYLES } from '../utils/filterComponentStyles';
import { ICON_STYLES } from '../utils/iconStyles';
import { BORDER, BOX_SHADOWS, CURSORS, SPACING, TRANSFORMS, TRANSITIONS } from '../utils/styleUtils';
import { FONT_SIZES, FONT_WEIGHTS } from '../utils/typographyUtils';

/**
 * CurrencyFilter - A tabbed interface for filtering countries by their currency codes.
 * Groups currencies alphabetically by first letter and displays count of countries using each currency.
 * Provides chip-based selection with visual feedback and selected currencies summary.
 * Displays currencies based on currently filtered countries (by continents and languages).
 */
interface CurrencyFilterProps {
  countries: Country[]; // Filtered countries based on selected continents and languages
  selectedCurrencies: string[]; // Array of selected currency codes
  onCurrencyToggle: (currency: string) => void;
  isFiltered?: boolean; // Indicates if countries are filtered by continents/languages
}

export const CurrencyFilter: React.FC<CurrencyFilterProps> = ({
  countries,
  selectedCurrencies,
  onCurrencyToggle,
  isFiltered = false
}) => {
  const [activeTab, setActiveTab] = React.useState<string>('A');

  // Get unique currencies from countries
  const currencies = React.useMemo(() => {
    return getUniqueCurrencies(countries);
  }, [countries]);

  // Get currency counts for display
  const currencyCounts = React.useMemo(() => {
    return getCurrencyCounts(countries);
  }, [countries]);

  // Group currencies by first letter
  const currencyGroups = React.useMemo(() => {
    return groupCurrenciesByLetter(currencies);
  }, [currencies]);

  // Get sorted tab labels
  const tabLabels = React.useMemo(() => {
    return Object.keys(currencyGroups).sort();
  }, [currencyGroups]);

  // Set initial active tab
  React.useEffect(() => {
    if (tabLabels.length > 0 && !tabLabels.includes(activeTab)) {
      setActiveTab(tabLabels[0]);
    }
  }, [tabLabels, activeTab]);

  // Handle checkbox toggle for currency selection
  const handleToggle = (currency: string) => {
    onCurrencyToggle(currency);
  };

  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  return (
    <Box>
      <Box sx={{ mb: 1.5 }}> {/* Reduced from 2 */}
        <Box sx={FILTER_COMPONENT_STYLES.COMPACT_HEADER}>
          <CurrencyIcon sx={ICON_STYLES.PRIMARY} />
          <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: FONT_WEIGHTS.SEMIBOLD, fontSize: FONT_SIZES.MD }}>
            Filter by currency ({currencies.length} available{isFiltered ? ' in filtered countries' : ''})
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: FONT_SIZES.SM, pl: 4, mb: 1 }}>
          Each currency code represents countries that use that currency. Numbers show how many countries use each currency.
        </Typography>
      </Box>

      {/* Currency Tabs */}
      {tabLabels.length > 0 && (
        <Box sx={{ mb: SPACING.SM }}> {/* Reduced from MD */}
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              borderBottom: BORDER.SOLID_1,
              borderColor: BORDER_COLORS.DIVIDER,
              '& .MuiTab-root': {
                minWidth: 60,
                fontSize: FONT_SIZES.SM,
                fontWeight: FONT_WEIGHTS.MEDIUM,
                textTransform: 'none',
                color: 'text.secondary',
                '&.Mui-selected': {
                  color: 'primary.main',
                  fontWeight: FONT_WEIGHTS.SEMIBOLD,
                }
              },
              '& .MuiTabs-indicator': {
                backgroundColor: 'primary.main',
              }
            }}
          >
            {tabLabels.map((letter) => (
              <Tab
                key={letter}
                label={`${letter} (${currencyGroups[letter].length})`}
                value={letter}
              />
            ))}
          </Tabs>
        </Box>
      )}

      {/* Currency Chips for Active Tab */}
      {activeTab && currencyGroups[activeTab] && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2, minHeight: 50 }}> {/* Reduced from 3 and 60 */}
          {currencyGroups[activeTab].map((currency) => (
            <Chip
              key={currency}
              label={`${currency} (${currencyCounts[currency]})`}
              onClick={() => handleToggle(currency)}
              variant={selectedCurrencies.includes(currency) ? "filled" : "outlined"}
              color={selectedCurrencies.includes(currency) ? "primary" : "default"}
              sx={{
                cursor: CURSORS.POINTER,
                transition: TRANSITIONS.NORMAL,
                '&:hover': {
                  backgroundColor: selectedCurrencies.includes(currency)
                    ? 'primary.dark'
                    : BACKGROUND_COLORS.HOVER_VISIBLE,
                  border: selectedCurrencies.includes(currency) ? 'none' : BORDER.SOLID_1,
                  borderColor: selectedCurrencies.includes(currency) ? 'transparent' : BORDER_COLORS.HOVER,
                  transform: TRANSFORMS.HOVER_LIFT,
                  boxShadow: BOX_SHADOWS.MEDIUM,
                }
              }}
            />
          ))}
        </Box>
      )}

      {/* Selected Currencies Summary */}
      {selectedCurrencies.length > 0 && (
        <Box sx={FILTER_COMPONENT_STYLES.COMPACT_SELECTED_SUMMARY}>
          <Typography variant="body2" sx={FILTER_COMPONENT_STYLES.COMPACT_SELECTED_TYPOGRAPHY}>
            Selected Currencies ({selectedCurrencies.length}):
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {selectedCurrencies.map((currency) => (
              <Chip
                key={currency}
                label={currency}
                size="small"
                onDelete={() => handleToggle(currency)}
                sx={FILTER_COMPONENT_STYLES.COMPACT_SELECTED_CHIP}
              />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}; 