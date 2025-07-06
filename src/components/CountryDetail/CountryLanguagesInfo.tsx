import { Box, Chip, Paper, Typography, useTheme } from '@mui/material';
import { Language as LanguageIcon } from '@mui/icons-material';
import React from 'react';
import type { Country } from '../../types';
import { BACKGROUND_COLORS, BORDER_COLORS, PRIMARY_COLORS } from '../../utils/colorUtils';
import { BORDER_RADIUS, SPACING } from '../../utils/styleUtils';
import { getLanguageStatistics } from '../../utils/languageUtils';

interface CountryLanguagesInfoProps {
  country: Country;
}

/**
 * Displays detailed language information including RTL/LTR indicators and statistics.
 */
export const CountryLanguagesInfo: React.FC<CountryLanguagesInfoProps> = ({ country }) => {
  const theme = useTheme();
  const languageStats = getLanguageStatistics(country.languages);

  // Determine bullet color based on theme mode
  const bulletColor = theme.palette.mode === 'dark'
    ? theme.palette.primary.light
    : theme.palette.primary.main;

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        background: 'background.default',
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
        Languages
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <LanguageIcon sx={{ color: 'primary.main', fontSize: 20 }} />
        <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
          Languages Spoken ({country.languages.length}):
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {country.languages.map((language, index) => (
          <Box
            key={index}
            sx={{
              p: 2,
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
              background: 'background.paper',
              transition: 'all 0.3s ease',
              '&:hover': {
                borderColor: 'primary.main',
                background: 'action.hover',
                transform: 'translateX(4px)',
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                {language.name}
              </Typography>
              <Chip
                label={language.rtl ? 'RTL' : 'LTR'}
                size="small"
                sx={{
                  fontSize: '0.65rem',
                  height: 20,
                  background: language.rtl ? 'rgba(255, 152, 0, 0.1)' : 'rgba(76, 175, 80, 0.1)',
                  color: language.rtl ? 'warning.main' : 'success.main',
                  border: '1px solid',
                  borderColor: language.rtl ? 'warning.main' : 'success.main',
                }}
              />
            </Box>

            {language.native && language.native !== language.name && (
              <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                Native: {language.native}
              </Typography>
            )}

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: bulletColor,
                  opacity: 0.8,
                }}
              />
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                {language.rtl ? 'Right-to-Left Script' : 'Left-to-Right Script'}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Language Statistics */}
      <Box sx={{
        mt: SPACING.LG,
        p: SPACING.MD,
        borderRadius: BORDER_RADIUS.MEDIUM,
        background: BACKGROUND_COLORS.HOVER,
        border: '1px solid',
        borderColor: BORDER_COLORS.DIVIDER
      }}>
        <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500, mb: 1 }}>
          Language Statistics:
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <Chip
            label={`${languageStats.total} Total`}
            size="small"
            sx={{
              background: PRIMARY_COLORS.LIGHT,
              color: 'primary.main',
              border: '1px solid',
              borderColor: 'primary.main',
            }}
          />
          <Chip
            label={`${languageStats.rtl} RTL`}
            size="small"
            sx={{
              background: 'rgba(255, 152, 0, 0.1)',
              color: 'warning.main',
              border: '1px solid',
              borderColor: 'warning.main',
            }}
          />
          <Chip
            label={`${languageStats.ltr} LTR`}
            size="small"
            sx={{
              background: 'rgba(76, 175, 80, 0.1)',
              color: 'success.main',
              border: '1px solid',
              borderColor: 'success.main',
            }}
          />
        </Box>
      </Box>
    </Paper>
  );
}; 