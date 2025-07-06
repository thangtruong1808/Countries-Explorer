import React from 'react';
import { Box, Typography } from '@mui/material';
import { BORDER_COLORS } from '../../utils/colorUtils';
import { BORDER, BORDER_RADIUS, SPACING } from '../../utils/styleUtils';
import { FONT_SIZES, FONT_WEIGHTS } from '../../utils/typographyUtils';

export const DashboardHeader: React.FC = () => {
  return (
    <Box sx={{
      textAlign: 'center',
      mb: SPACING.LG,
      background: 'linear-gradient(135deg, rgba(25,118,210,0.1) 0%, rgba(156,39,176,0.1) 100%)',
      borderRadius: BORDER_RADIUS.LARGE,
      p: SPACING.LG,
      border: BORDER.SOLID_1,
      borderColor: BORDER_COLORS.DIVIDER,
      position: 'relative',
      overflow: 'hidden'
    }}>
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 20% 80%, rgba(25,118,210,0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(156,39,176,0.05) 0%, transparent 50%)',
        pointerEvents: 'none'
      }} />
      <Typography variant="h5" sx={{
        fontWeight: FONT_WEIGHTS.BOLD,
        mb: 1,
        background: 'linear-gradient(135deg, #1976d2 0%, #9c27b0 100%)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        position: 'relative',
        zIndex: 1
      }}>
        World Explorer Dashboard
      </Typography>
      <Typography variant="body2" sx={{
        color: 'text.secondary',
        fontSize: FONT_SIZES.MD,
        position: 'relative',
        zIndex: 1
      }}>
        Discover fascinating insights about countries, continents, and cultures
      </Typography>
    </Box>
  );
}; 