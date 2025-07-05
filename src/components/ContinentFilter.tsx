import React from 'react';
import { FormGroup, FormControlLabel, Checkbox, Box, Typography, Chip } from '@mui/material';
import { Public as ContinentIcon } from '@mui/icons-material';
import type { Continent } from '../types';
import { ICON_STYLES } from '../utils/iconStyles';
import { PRIMARY_COLORS, BACKGROUND_COLORS, SHADOW_COLORS, BORDER_COLORS } from '../utils/colorUtils';
import { TRANSITIONS, SPACING, BORDER_RADIUS, TRANSFORMS, BOX_SHADOWS, CURSORS, BORDER } from '../utils/styleUtils';
import { FONT_SIZES, FONT_WEIGHTS } from '../utils/typographyUtils';

interface ContinentFilterProps {
  continents: Continent[];
  selectedContinents: string[]; // Array of selected continent codes
  onContinentToggle: (code: string) => void;
}

export const ContinentFilter: React.FC<ContinentFilterProps> = ({
  continents,
  selectedContinents,
  onContinentToggle
}) => {
  // Handle checkbox toggle for continent selection
  const handleToggle = (code: string) => {
    onContinentToggle(code);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <ContinentIcon sx={ICON_STYLES.PRIMARY} />
        <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: FONT_WEIGHTS.SEMIBOLD, fontSize: FONT_SIZES.XL }}>
          Filter by continent ({continents.length} available)
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
        {continents.map((continent) => (
          <Chip
            key={continent.code}
            label={continent.name}
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
        <Box sx={{ mt: SPACING.MD, p: SPACING.MD, borderRadius: BORDER_RADIUS.MEDIUM, background: BACKGROUND_COLORS.HOVER, border: BORDER.SOLID_1, borderColor: BORDER_COLORS.DIVIDER }}>
          <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: FONT_WEIGHTS.MEDIUM, mb: 1 }}>
            Selected Continents ({selectedContinents.length}):
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {selectedContinents.map((continentCode) => {
              const continent = continents.find(c => c.code === continentCode);
              return (
                <Chip
                  key={continentCode}
                  label={continent?.name || continentCode}
                  size="small"
                  onDelete={() => handleToggle(continentCode)}
                  sx={{
                    background: PRIMARY_COLORS.LIGHT,
                    color: 'primary.main',
                    border: BORDER.SOLID_1,
                    borderColor: 'primary.main',
                    fontSize: FONT_SIZES.SM,
                    height: 24,
                    transition: TRANSITIONS.NORMAL,
                    '&:hover': {
                      background: PRIMARY_COLORS.MEDIUM,
                      transform: TRANSFORMS.HOVER_LIFT,
                    },
                  }}
                />
              );
            })}
          </Box>
        </Box>
      )}
    </Box>
  );
}; 