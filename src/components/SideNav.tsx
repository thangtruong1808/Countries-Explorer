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
  Menu as MenuIcon,
  Close as CloseIcon,
  FilterList as FilterIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import { ContinentFilter } from './ContinentFilter';
import { LanguageFilter } from './LanguageFilter';
import type { Continent, Country } from '../types';
import { Z_INDEX } from '../utils/styleConstants';
import { useClickOutside } from '../utils/clickOutside';
import { SPACING, BORDER_RADIUS } from '../utils/styleUtils';
import { BACKGROUND_COLORS, BORDER_COLORS } from '../utils/colorUtils';
import { getCountriesByContinents, hasActiveFilters } from '../utils/filterUtils';
import { FONT_WEIGHTS } from '../utils/typographyUtils';

interface SideNavProps {
  continents: Continent[];
  countries: Country[];
  selectedContinents: string[];
  selectedLanguages: string[];
  onContinentToggle: (code: string) => void;
  onLanguageToggle: (languageName: string) => void;
  onResetFilters?: () => void;
}

export const SideNav: React.FC<SideNavProps> = ({
  continents,
  countries,
  selectedContinents,
  selectedLanguages,
  onContinentToggle,
  onLanguageToggle,
  onResetFilters
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const drawerRef = useRef<HTMLDivElement>(null);

  // Get countries filtered by selected continents for language filter
  const filteredCountriesForLanguages = useMemo(() =>
    getCountriesByContinents(countries, selectedContinents),
    [countries, selectedContinents]
  );

  // Check if any filters are active
  const hasActiveFiltersState = hasActiveFilters(selectedContinents, selectedLanguages);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleResetFilters = () => {
    if (onResetFilters) {
      onResetFilters();
    }
  };

  // Use the click outside hook
  useClickOutside(drawerRef, isOpen, handleClose, ['[data-side-nav-toggle]']);

  const drawerWidth = 380;

  const drawerContent = (
    <Box
      ref={drawerRef}
      sx={{ width: drawerWidth, height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      {/* Header */}
      <Box sx={{
        p: SPACING.LG,
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
      <Box sx={{ flex: 1, p: SPACING.LG, overflowY: 'auto' }}>
        {/* Continent Filter */}
        <Paper
          elevation={0}
          sx={{
            p: SPACING.LG,
            borderRadius: BORDER_RADIUS.LARGE,
            border: 1,
            borderColor: BORDER_COLORS.DIVIDER,
            background: BACKGROUND_COLORS.DEFAULT,
            mb: SPACING.LG,
          }}
        >
          <ContinentFilter
            continents={continents}
            selectedContinents={selectedContinents}
            onContinentToggle={onContinentToggle}
          />
        </Paper>

        <Divider sx={{ my: SPACING.LG }} />

        {/* Language Filter */}
        <Paper
          elevation={0}
          sx={{
            p: SPACING.LG,
            borderRadius: BORDER_RADIUS.LARGE,
            border: 1,
            borderColor: BORDER_COLORS.DIVIDER,
            background: BACKGROUND_COLORS.DEFAULT,
            mb: SPACING.LG,
          }}
        >
          <LanguageFilter
            countries={filteredCountriesForLanguages}
            selectedLanguages={selectedLanguages}
            onLanguageToggle={onLanguageToggle}
            isFiltered={selectedContinents.length > 0}
          />
        </Paper>

        {/* Reset Filters Container */}
        {hasActiveFiltersState && onResetFilters && (
          <>
            <Divider sx={{ my: SPACING.LG }} />
            <Paper
              elevation={0}
              sx={{
                p: SPACING.LG,
                borderRadius: BORDER_RADIUS.LARGE,
                border: 1,
                borderColor: BORDER_COLORS.DIVIDER,
                background: BACKGROUND_COLORS.DEFAULT,
                mb: SPACING.LG,
              }}
            >
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" sx={{
                  color: 'text.secondary',
                  fontWeight: FONT_WEIGHTS.MEDIUM,
                  mb: SPACING.MD
                }}>
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
      {/* Toggle Button */}
      <IconButton
        onClick={handleToggle}
        data-side-nav-toggle
        sx={{
          position: 'fixed',
          top: 100,
          left: 20,
          zIndex: Z_INDEX.DRAWER,
          bgcolor: 'background.paper',
          border: 1,
          borderColor: 'divider',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          '&:hover': {
            bgcolor: 'background.paper',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)',
          },
        }}
        aria-label="Open filters"
      >
        <MenuIcon />
      </IconButton>

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