import React from 'react';
import { Box, Typography } from '@mui/material';
import { DataUsage as DataUsageIcon } from '@mui/icons-material';
import { BORDER, BORDER_RADIUS, SPACING } from '../../utils/styleUtils';
import { FONT_SIZES, FONT_WEIGHTS } from '../../utils/typographyUtils';

export const DashboardHeader: React.FC = () => {
  return (
    <Box sx={{
      textAlign: 'center',
      mb: SPACING.LG,
      background: (theme) => theme.palette.mode === 'dark'
        ? 'linear-gradient(135deg, rgba(76,175,80,0.15) 0%, rgba(76,175,80,0.08) 100%)'
        : 'linear-gradient(135deg, rgba(76,175,80,0.1) 0%, rgba(76,175,80,0.05) 100%)',
      borderRadius: BORDER_RADIUS.LARGE,
      p: SPACING.LG,
      border: BORDER.SOLID_1,
      borderColor: 'success.main',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: (theme) => theme.palette.mode === 'dark'
          ? 'radial-gradient(circle at 30% 70%, rgba(76,175,80,0.08) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(76,175,80,0.08) 0%, transparent 50%)'
          : 'radial-gradient(circle at 30% 70%, rgba(76,175,80,0.05) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(76,175,80,0.05) 0%, transparent 50%)',
        pointerEvents: 'none'
      }} />
      <DataUsageIcon sx={{
        color: 'success.main',
        fontSize: 32,
        mb: 1,
        filter: 'drop-shadow(0 2px 4px rgba(76,175,80,0.3))'
      }} />
      <Typography variant="h5" sx={{
        fontWeight: FONT_WEIGHTS.BOLD,
        mb: 1,
        background: 'linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        position: 'relative',
        zIndex: 1
      }}>
        Data Visualization
      </Typography>
      <Typography variant="body2" sx={{
        color: 'text.secondary',
        fontSize: FONT_SIZES.MD,
        position: 'relative',
        zIndex: 1
      }}>
        Interactive charts and insights about world data
      </Typography>
    </Box>
  );
}; 