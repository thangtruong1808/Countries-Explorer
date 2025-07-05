import React from 'react';
import { Box, Typography, Chip, Divider } from '@mui/material';
import { Translate as LanguageIcon } from '@mui/icons-material';
import type { Country } from '../types';
import { ICON_STYLES } from '../utils/iconStyles';
import { PRIMARY_COLORS, BACKGROUND_COLORS, BORDER_COLORS } from '../utils/colorUtils';
import { SPACING, BORDER_RADIUS, TRANSITIONS, TRANSFORMS, BORDER } from '../utils/styleUtils';
import { FONT_SIZES, FONT_WEIGHTS } from '../utils/typographyUtils';

interface MultipleLanguagesInfoProps {
  countriesWithMultipleLanguages: Array<{ country: Country; languages: string[] }>;
  selectedLanguages: string[];
}

export const MultipleLanguagesInfo: React.FC<MultipleLanguagesInfoProps> = ({
  countriesWithMultipleLanguages,
  selectedLanguages
}) => {
  if (selectedLanguages.length < 2 || countriesWithMultipleLanguages.length === 0) {
    return null;
  }

  return (
    <Box sx={{
      mt: SPACING.LG,
      p: SPACING.LG,
      borderRadius: BORDER_RADIUS.LARGE,
      background: BACKGROUND_COLORS.HOVER,
      border: BORDER.SOLID_1,
      borderColor: BORDER_COLORS.DIVIDER,
      boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
    }}>
      {/* Header Section */}
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: SPACING.MD,
        mb: SPACING.LG,
        pb: SPACING.MD,
        borderBottom: BORDER.SOLID_1,
        borderColor: BORDER_COLORS.DIVIDER
      }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 40,
          height: 40,
          borderRadius: BORDER_RADIUS.MEDIUM,
          background: PRIMARY_COLORS.LIGHT,
          color: 'primary.main'
        }}>
          <LanguageIcon sx={{ fontSize: 20 }} />
        </Box>
        <Box>
          <Typography variant="h6" sx={{
            color: 'text.primary',
            fontWeight: FONT_WEIGHTS.BOLD,
            fontSize: FONT_SIZES.XL,
            lineHeight: 1.2,
            mb: 0.5
          }}>
            Countries Speaking Multiple Languages
          </Typography>
          <Typography variant="body2" sx={{
            color: 'text.secondary',
            fontSize: FONT_SIZES.MD,
            fontWeight: FONT_WEIGHTS.MEDIUM
          }}>
            {countriesWithMultipleLanguages.length} countries found
          </Typography>
        </Box>
      </Box>

      {/* Description */}
      <Typography variant="body1" sx={{
        color: 'text.secondary',
        mb: SPACING.LG,
        fontSize: FONT_SIZES.MD,
        lineHeight: 1.5,
        px: SPACING.SM
      }}>
        These countries speak {selectedLanguages.length > 2 ? 'multiple' : 'both'} of the selected languages,
        which explains why the total count may be less than expected:
      </Typography>

      {/* Countries List */}
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: SPACING.MD
      }}>
        {countriesWithMultipleLanguages.map(({ country, languages }, index) => (
          <Box key={country.code}>
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: SPACING.MD,
              borderRadius: BORDER_RADIUS.MEDIUM,
              background: BACKGROUND_COLORS.PAPER,
              border: BORDER.SOLID_1,
              borderColor: BORDER_COLORS.DIVIDER,
              transition: TRANSITIONS.NORMAL,
              '&:hover': {
                transform: TRANSFORMS.HOVER_LIFT,
                boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                borderColor: 'primary.main',
              }
            }}>
              {/* Country Info */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: SPACING.MD }}>
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 32,
                  height: 32,
                  borderRadius: BORDER_RADIUS.SMALL,
                  background: PRIMARY_COLORS.LIGHT,
                  color: 'primary.main',
                  fontSize: FONT_SIZES.SM,
                  fontWeight: FONT_WEIGHTS.BOLD
                }}>
                  {country.name.charAt(0)}
                </Box>
                <Box>
                  <Typography variant="body1" sx={{
                    color: 'text.primary',
                    fontWeight: FONT_WEIGHTS.SEMIBOLD,
                    fontSize: FONT_SIZES.LG,
                    lineHeight: 1.2
                  }}>
                    {country.name}
                  </Typography>
                  <Typography variant="body2" sx={{
                    color: 'text.secondary',
                    fontSize: FONT_SIZES.SM,
                    fontWeight: FONT_WEIGHTS.MEDIUM
                  }}>
                    Speaks {languages.length} selected language{languages.length > 1 ? 's' : ''}
                  </Typography>
                </Box>
              </Box>

              {/* Languages */}
              <Box sx={{
                display: 'flex',
                gap: SPACING.SM,
                flexWrap: 'wrap',
                maxWidth: '50%'
              }}>
                {languages.map((language) => (
                  <Chip
                    key={language}
                    label={language}
                    size="small"
                    sx={{
                      background: PRIMARY_COLORS.LIGHT,
                      color: 'primary.main',
                      border: BORDER.SOLID_1,
                      borderColor: 'primary.main',
                      fontSize: FONT_SIZES.SM,
                      height: 24,
                      fontWeight: FONT_WEIGHTS.MEDIUM,
                      '& .MuiChip-label': {
                        px: SPACING.SM,
                      },
                      '&:hover': {
                        background: PRIMARY_COLORS.MEDIUM,
                        transform: TRANSFORMS.HOVER_LIFT,
                      }
                    }}
                  />
                ))}
              </Box>
            </Box>

            {index < countriesWithMultipleLanguages.length - 1 && (
              <Divider sx={{
                my: SPACING.MD,
                borderColor: BORDER_COLORS.DIVIDER,
                opacity: 0.6
              }} />
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
}; 