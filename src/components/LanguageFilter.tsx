import React from 'react';
import { Box, Typography, FormGroup, FormControlLabel, Checkbox, Chip } from '@mui/material';
import { Language as LanguageIcon } from '@mui/icons-material';
import type { Country } from '../types';
import { ICON_STYLES } from '../utils/iconStyles';
import { PRIMARY_COLORS, BACKGROUND_COLORS, BORDER_COLORS, TEXT_COLORS } from '../utils/colorUtils';
import { BORDER_RADIUS, TRANSITIONS, SPACING, TRANSFORMS, CURSORS, DISPLAY, FLEX, BORDER } from '../utils/styleUtils';
import { FONT_SIZES, FONT_WEIGHTS } from '../utils/typographyUtils';

interface LanguageFilterProps {
  countries: Country[];
  selectedLanguages: string[];
  onLanguageToggle: (languageName: string) => void;
}

export const LanguageFilter: React.FC<LanguageFilterProps> = ({
  countries,
  selectedLanguages,
  onLanguageToggle
}) => {
  // Extract all unique languages from countries
  const getAllLanguages = (): Array<{ name: string; count: number }> => {
    const languageMap = new Map<string, number>();

    countries.forEach(country => {
      country.languages.forEach(language => {
        const currentCount = languageMap.get(language.name) || 0;
        languageMap.set(language.name, currentCount + 1);
      });
    });

    // Convert to array and sort by count (descending) then by name
    return Array.from(languageMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => {
        if (b.count !== a.count) {
          return b.count - a.count; // Sort by count descending
        }
        return a.name.localeCompare(b.name); // Then by name alphabetically
      });
  };

  const languages = getAllLanguages();

  const handleToggle = (languageName: string) => {
    onLanguageToggle(languageName);
  };

  if (languages.length === 0) {
    return (
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
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
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <LanguageIcon sx={ICON_STYLES.PRIMARY} />
        <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: FONT_WEIGHTS.SEMIBOLD, fontSize: FONT_SIZES.XL }}>
          Filter by language ({languages.length} available)
        </Typography>
      </Box>

      {/* Language Checkboxes - Vertical Layout */}
      <Box sx={{
        maxHeight: 200,
        overflowY: 'auto',
        mb: 2,
        border: BORDER.SOLID_1,
        borderColor: BORDER_COLORS.DIVIDER,
        borderRadius: BORDER_RADIUS.SMALL,
        p: SPACING.SM,
        background: BACKGROUND_COLORS.PAPER
      }}>
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
        <Box sx={{ mt: SPACING.MD, p: SPACING.MD, borderRadius: BORDER_RADIUS.MEDIUM, background: BACKGROUND_COLORS.HOVER, border: BORDER.SOLID_1, borderColor: BORDER_COLORS.DIVIDER }}>
          <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: FONT_WEIGHTS.MEDIUM, mb: 1 }}>
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
                  sx={{
                    background: PRIMARY_COLORS.LIGHT,
                    color: TEXT_COLORS.PRIMARY_MAIN,
                    border: BORDER.SOLID_1,
                    borderColor: BORDER_COLORS.PRIMARY,
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