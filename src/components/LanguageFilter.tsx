import React from 'react';
import { Box, Typography, FormGroup, FormControlLabel, Checkbox, Chip } from '@mui/material';
import { Language as LanguageIcon } from '@mui/icons-material';
import type { Country } from '../types';
import { ICON_STYLES } from '../utils/iconStyles';
import { PRIMARY_COLORS, BACKGROUND_COLORS, BORDER_COLORS, TEXT_COLORS } from '../utils/colorUtils';
import { BORDER_RADIUS, TRANSITIONS, SPACING, TRANSFORMS, CURSORS, DISPLAY, FLEX, BORDER } from '../utils/styleUtils';
import { FONT_SIZES, FONT_WEIGHTS } from '../utils/typographyUtils';
import { getAllLanguages } from '../utils/languageUtils';
import { FILTER_COMPONENT_STYLES } from '../utils/filterComponentStyles';

interface LanguageFilterProps {
  countries: Country[]; // Filtered countries based on other filters
  selectedLanguages: string[];
  onLanguageToggle: (languageName: string) => void;
  isFiltered?: boolean; // Indicates if countries are filtered by other criteria
}

export const LanguageFilter: React.FC<LanguageFilterProps> = ({
  countries,
  selectedLanguages,
  onLanguageToggle,
  isFiltered = false
}) => {
  // Use centralized language utility
  const languages = getAllLanguages(countries);

  const handleToggle = (languageName: string) => {
    onLanguageToggle(languageName);
  };

  if (languages.length === 0) {
    return (
      <Box>
        <Box sx={FILTER_COMPONENT_STYLES.COMPACT_HEADER}>
          <LanguageIcon sx={ICON_STYLES.PRIMARY} />
          <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: FONT_WEIGHTS.SEMIBOLD, fontSize: FONT_SIZES.XL }}>
            Filter by language
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
          No languages available
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={FILTER_COMPONENT_STYLES.COMPACT_HEADER}>
        <LanguageIcon sx={ICON_STYLES.PRIMARY} />
        <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: FONT_WEIGHTS.SEMIBOLD, fontSize: FONT_SIZES.XL }}>
          Filter by language ({languages.length} available{isFiltered ? ' in filtered countries' : ''})
        </Typography>
      </Box>

      {/* Language Checkboxes - Vertical Layout */}
      <Box sx={FILTER_COMPONENT_STYLES.COMPACT_SCROLLABLE}>
        <FormGroup>
          {languages.map((language) => (
            <Box
              key={language.name}
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '4px 8px',
                borderRadius: BORDER_RADIUS.SMALL,
                transition: TRANSITIONS.NORMAL,
                cursor: CURSORS.POINTER,
                '&:hover': {
                  background: BACKGROUND_COLORS.HOVER_VISIBLE,
                  border: BORDER.SOLID_1,
                  borderColor: BORDER_COLORS.HOVER,
                  transform: TRANSFORMS.HOVER_LIFT,
                },
              }}
              onClick={() => handleToggle(language.name)}
            >
              <Checkbox
                checked={selectedLanguages.includes(language.name)}
                onChange={() => handleToggle(language.name)}
                size="small"
                sx={{
                  color: 'text.secondary',
                  '&.Mui-checked': {
                    color: 'primary.main',
                  },
                  '&:hover': {
                    backgroundColor: BACKGROUND_COLORS.TRANSPARENT,
                  },
                  '& .MuiTouchRipple-root': {
                    display: DISPLAY.NONE,
                  },
                }}
              />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: FLEX.GROW_1 }}>
                <Typography variant="body2" sx={{ color: 'text.primary', fontSize: FONT_SIZES.MD, flex: FLEX.GROW_1 }}>
                  {language.name}
                </Typography>
                <Chip
                  label={language.count}
                  size="small"
                  sx={{
                    height: 18,
                    fontSize: FONT_SIZES.XS,
                    background: PRIMARY_COLORS.LIGHT,
                    color: TEXT_COLORS.PRIMARY_MAIN,
                    border: BORDER.SOLID_1,
                    borderColor: BORDER_COLORS.PRIMARY,
                    minWidth: 'auto',
                    '& .MuiChip-label': {
                      px: 1,
                    },
                  }}
                />
              </Box>
            </Box>
          ))}
        </FormGroup>
      </Box>

      {/* Selected Languages Summary */}
      {selectedLanguages.length > 0 && (
        <Box sx={FILTER_COMPONENT_STYLES.COMPACT_SELECTED_SUMMARY}>
          <Typography variant="body2" sx={FILTER_COMPONENT_STYLES.COMPACT_SELECTED_TYPOGRAPHY}>
            Selected Languages ({selectedLanguages.length}):
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {selectedLanguages.map((languageName) => {
              const language = languages.find(lang => lang.name === languageName);
              return (
                <Chip
                  key={languageName}
                  label={`${languageName} (${language?.count || 0})`}
                  size="small"
                  onDelete={() => handleToggle(languageName)}
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