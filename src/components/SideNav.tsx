import React, { useState, useRef, useMemo } from 'react';
import {
  Box,
  Drawer,
  IconButton,
  Typography,
  Paper,
  Button,
  useTheme,
  useMediaQuery,
  Divider
} from '@mui/material';
import {
  Close as CloseIcon,
  FilterList as FilterIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import { ContinentFilter } from './ContinentFilter';
import { LanguageFilter } from './LanguageFilter';
import { CurrencyFilter } from './CurrencyFilter';
import type { Continent, Country } from '../types';
import { Z_INDEX } from '../utils/styleConstants';
import { useClickOutside } from '../utils/clickOutside';
import { SPACING, BORDER_RADIUS } from '../utils/styleUtils';
import { BACKGROUND_COLORS, BORDER_COLORS } from '../utils/colorUtils';
import {
  getCountriesByContinents,
  getCountriesByContinentsAndLanguages,
  getCountriesByContinentsAndCurrencies,
  getCountriesByLanguagesAndCurrencies,
  hasActiveFilters
} from '../utils/filterUtils';
import { FONT_WEIGHTS } from '../utils/typographyUtils';
import { FILTER_COMPONENT_STYLES } from '../utils/filterComponentStyles';
import { RESPONSIVE_POSITION_STYLES } from '../utils/responsivePositionUtils';

interface SideNavProps {
  continents: Continent[];
  countries: Country[];
  selectedContinents: string[];
  selectedLanguages: string[];
  selectedCurrencies: string[];
  onContinentToggle: (code: string) => void;
  onLanguageToggle: (languageName: string) => void;
  onCurrencyToggle: (currency: string) => void;
  onResetFilters?: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export const SideNav: React.FC<SideNavProps> = ({
  continents,
  countries,
  selectedContinents,
  selectedLanguages,
  selectedCurrencies,
  onContinentToggle,
  onLanguageToggle,
  onCurrencyToggle,
  onResetFilters,
  isOpen = false,
  onClose
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const drawerRef = useRef<HTMLDivElement>(null);

  // Get countries filtered by languages and currencies for continent filter
  const filteredCountriesForContinents = useMemo(() =>
    getCountriesByLanguagesAndCurrencies(countries, selectedLanguages, selectedCurrencies),
    [countries, selectedLanguages, selectedCurrencies]
  );

  // Get countries filtered by continents and currencies for language filter
  const filteredCountriesForLanguages = useMemo(() =>
    getCountriesByContinentsAndCurrencies(countries, selectedContinents, selectedCurrencies),
    [countries, selectedContinents, selectedCurrencies]
  );

  // Get countries filtered by both continents and languages for currency filter
  const filteredCountriesForCurrencies = useMemo(() =>
    getCountriesByContinentsAndLanguages(countries, selectedContinents, selectedLanguages),
    [countries, selectedContinents, selectedLanguages]
  );

  // Check if any filters are active
  const hasActiveFiltersState = hasActiveFilters(selectedContinents, selectedLanguages, selectedCurrencies);

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleResetFilters = () => {
    if (onResetFilters) {
      onResetFilters();
    }
  };

  // Use the click outside hook
  useClickOutside(drawerRef, isOpen, handleClose, ['[data-navbar-menu]']);

  const drawerWidth = RESPONSIVE_POSITION_STYLES.RESPONSIVE_DRAWER.width; // Responsive width

  const drawerContent = (
    <Box
      ref={drawerRef}
      sx={{ width: drawerWidth, height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      {/* Header */}
      <Box sx={{
        p: SPACING.MD, // Reduced from LG
        borderBottom: 1,
        borderColor: BORDER_COLORS.DIVIDER,
        background: BACKGROUND_COLORS.PAPER,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FilterIcon sx={{ color: 'primary.main', fontSize: 24 }} />
          <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
            Filters
          </Typography>
        </Box>
        <IconButton
          onClick={handleClose}
          sx={{
            color: 'text.secondary',
            '&:hover': {
              color: 'text.primary',
              background: 'action.hover',
            }
          }}
          aria-label="Close filters"
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Content */}
      <Box sx={{ flex: 1, p: SPACING.MD, overflowY: 'auto' }}> {/* Reduced from LG */}
        {/* Continent Filter */}
        <Paper
          elevation={0}
          sx={FILTER_COMPONENT_STYLES.COMPACT_PAPER}
        >
          <ContinentFilter
            continents={continents}
            countries={filteredCountriesForContinents}
            selectedContinents={selectedContinents}
            onContinentToggle={onContinentToggle}
            isFiltered={selectedLanguages.length > 0 || selectedCurrencies.length > 0}
          />
        </Paper>

        <Divider sx={FILTER_COMPONENT_STYLES.COMPACT_DIVIDER} />

        {/* Language Filter */}
        <Paper
          elevation={0}
          sx={FILTER_COMPONENT_STYLES.COMPACT_PAPER}
        >
          <LanguageFilter
            countries={filteredCountriesForLanguages}
            selectedLanguages={selectedLanguages}
            onLanguageToggle={onLanguageToggle}
            isFiltered={selectedContinents.length > 0 || selectedCurrencies.length > 0}
          />
        </Paper>

        <Divider sx={FILTER_COMPONENT_STYLES.COMPACT_DIVIDER} />

        {/* Currency Filter */}
        <Paper
          elevation={0}
          sx={FILTER_COMPONENT_STYLES.COMPACT_PAPER}
        >
          <CurrencyFilter
            countries={filteredCountriesForCurrencies}
            selectedCurrencies={selectedCurrencies}
            onCurrencyToggle={onCurrencyToggle}
            isFiltered={selectedContinents.length > 0 || selectedLanguages.length > 0}
          />
        </Paper>

        {/* Reset Filters Container */}
        {hasActiveFiltersState && onResetFilters && (
          <>
            <Divider sx={FILTER_COMPONENT_STYLES.COMPACT_DIVIDER} />
            <Paper
              elevation={0}
              sx={FILTER_COMPONENT_STYLES.COMPACT_ACTIVE_FILTERS}
            >
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" sx={FILTER_COMPONENT_STYLES.COMPACT_SELECTED_TYPOGRAPHY}>
                  Active Filters
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<RefreshIcon />}
                  onClick={handleResetFilters}
                  sx={{
                    borderRadius: BORDER_RADIUS.MEDIUM,
                    textTransform: 'none',
                    fontWeight: FONT_WEIGHTS.MEDIUM,
                    px: SPACING.LG,
                  }}
                  fullWidth
                >
                  Clear All Filters
                </Button>
              </Box>
            </Paper>
          </>
        )}

        {/* Future Features Placeholder */}
        {/* <Box sx={{ mt: SPACING.XL }}>
          <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
            More filters coming soon...
          </Typography>
        </Box> */}
      </Box>
    </Box>
  );

  return (
    <>
      {/* Drawer */}
      <Drawer
        variant={isMobile ? 'temporary' : 'persistent'}
        anchor="left"
        open={isOpen}
        onClose={handleClose}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            border: 'none',
            background: 'background.default',
            boxShadow: '2px 0 8px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}; 