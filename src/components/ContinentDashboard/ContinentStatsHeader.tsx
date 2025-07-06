import React from 'react';
import { Box, Typography } from '@mui/material';
import { Explore as ExploreIcon } from '@mui/icons-material';
import { BORDER, BORDER_RADIUS, SPACING } from '../../utils/styleUtils';
import { FONT_WEIGHTS } from '../../utils/typographyUtils';

export const ContinentStatsHeader: React.FC = () => {
  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      mb: SPACING.LG,
      p: SPACING.SM,
      background: 'linear-gradient(135deg, rgba(76,175,80,0.1) 0%, rgba(76,175,80,0.05) 100%)',
      borderRadius: BORDER_RADIUS.LARGE,
      border: BORDER.SOLID_1,
      borderColor: 'success.main'
    }}>
      <ExploreIcon sx={{ color: 'success.main', mr: 1.5, fontSize: 24 }} />
      <Typography variant="h6" sx={{
        fontWeight: FONT_WEIGHTS.BOLD,
        color: 'text.primary',
        background: 'linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        Continent Statistics
      </Typography>
    </Box>
  );
}; 