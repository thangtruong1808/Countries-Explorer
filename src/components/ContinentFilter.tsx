import { Public as ContinentIcon } from '@mui/icons-material';
import { Box, Chip, Typography } from '@mui/material';
import React from 'react';
import type { Continent, Country } from '../types';
import { BACKGROUND_COLORS, BORDER_COLORS } from '../utils/colorUtils';
import { getContinentCounts, getUniqueContinents } from '../utils/continentUtils';
import { FILTER_COMPONENT_STYLES } from '../utils/filterComponentStyles';
import { ICON_STYLES } from '../utils/iconStyles';
import { BORDER, BOX_SHADOWS, CURSORS, TRANSFORMS, TRANSITIONS } from '../utils/styleUtils';
import { FONT_SIZES, FONT_WEIGHTS } from '../utils/typographyUtils';

interface ContinentFilterProps {
  continents: Continent[];
  countries: Country[]; // Filtered countries based on other filters
  selectedContinents: string[]; // Array of selected continent codes
  onContinentToggle: (code: string) => void;
  isFiltered?: boolean; // Indicates if countries are filtered by other criteria
}

export const ContinentFilter: React.FC<ContinentFilterProps> = ({
  continents,
  countries,
  selectedContinents,
  onContinentToggle,
  isFiltered = false
}) => {
  // Get available continents from filtered countries
  const availableContinents = React.useMemo(() => {
    return getUniqueContinents(countries);
  }, [countries]);

  // Get continent counts for display
  const continentCounts = React.useMemo(() => {
    return getContinentCounts(countries);
  }, [countries]);

  // Handle checkbox toggle for continent selection
  const handleToggle = (code: string) => {
    onContinentToggle(code);
  };

  return (
    <Box>
      <Box sx={FILTER_COMPONENT_STYLES.COMPACT_HEADER}>
        <ContinentIcon sx={ICON_STYLES.PRIMARY} />
        <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: FONT_WEIGHTS.SEMIBOLD, fontSize: FONT_SIZES.MD }}>
          Filter by continent ({availableContinents.length} available{isFiltered ? ' in filtered countries' : ''})
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, ...FILTER_COMPONENT_STYLES.COMPACT_CONTAINER }}>
        {availableContinents.map((continent) => (
          <Chip
            key={continent.code}
            label={`${continent.name} (${continentCounts[continent.code] || 0})`}
            onClick={() => handleToggle(continent.code)}
            variant={selectedContinents.includes(continent.code) ? "filled" : "outlined"}
            color={selectedContinents.includes(continent.code) ? "primary" : "default"}
            sx={{
              cursor: CURSORS.POINTER,
              transition: TRANSITIONS.NORMAL,
              '&:hover': {
                backgroundColor: selectedContinents.includes(continent.code)
                  ? 'primary.dark'
                  : BACKGROUND_COLORS.HOVER_VISIBLE,
                border: selectedContinents.includes(continent.code) ? 'none' : BORDER.SOLID_1,
                borderColor: selectedContinents.includes(continent.code) ? 'transparent' : BORDER_COLORS.HOVER,
                transform: TRANSFORMS.HOVER_LIFT,
                boxShadow: BOX_SHADOWS.MEDIUM,
              }
            }}
          />
        ))}
      </Box>

      {/* Selected Continents Summary */}
      {selectedContinents.length > 0 && (
        <Box sx={FILTER_COMPONENT_STYLES.COMPACT_SELECTED_SUMMARY}>
          <Typography variant="body2" sx={FILTER_COMPONENT_STYLES.COMPACT_SELECTED_TYPOGRAPHY}>
            Selected Continents ({selectedContinents.length}):
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {selectedContinents.map((continentCode) => {
              const continent = availableContinents.find(c => c.code === continentCode) || continents.find(c => c.code === continentCode);
              return (
                <Chip
                  key={continentCode}
                  label={continent?.name || continentCode}
                  size="small"
                  onDelete={() => handleToggle(continentCode)}
                  sx={FILTER_COMPONENT_STYLES.COMPACT_SELECTED_CHIP}
                />
              );
            })}
          </Box>
        </Box>
      )}
    </Box>
  );
}; 