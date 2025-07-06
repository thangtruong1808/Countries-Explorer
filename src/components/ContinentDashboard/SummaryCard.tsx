import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { Grow } from '@mui/material';
import { BORDER, BORDER_RADIUS, SPACING } from '../../utils/styleUtils';
import { FONT_WEIGHTS } from '../../utils/typographyUtils';

interface SummaryCardProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  color: 'primary' | 'secondary' | 'warning';
  delay: number;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  icon,
  value,
  label,
  color,
  delay
}) => {
  const getGradientColors = () => {
    switch (color) {
      case 'primary':
        return {
          background: 'linear-gradient(135deg, rgba(25,118,210,0.05) 0%, rgba(25,118,210,0.02) 100%)',
          borderColor: 'primary.main',
          topGradient: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)',
          textGradient: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
          shadow: '0 12px 24px rgba(25,118,210,0.15)',
          iconShadow: 'drop-shadow(0 2px 4px rgba(25,118,210,0.3))'
        };
      case 'secondary':
        return {
          background: 'linear-gradient(135deg, rgba(156,39,176,0.05) 0%, rgba(156,39,176,0.02) 100%)',
          borderColor: 'secondary.main',
          topGradient: 'linear-gradient(90deg, #9c27b0 0%, #ba68c8 100%)',
          textGradient: 'linear-gradient(135deg, #9c27b0 0%, #ba68c8 100%)',
          shadow: '0 12px 24px rgba(156,39,176,0.15)',
          iconShadow: 'drop-shadow(0 2px 4px rgba(156,39,176,0.3))'
        };
      case 'warning':
        return {
          background: 'linear-gradient(135deg, rgba(255,152,0,0.05) 0%, rgba(255,152,0,0.02) 100%)',
          borderColor: 'warning.main',
          topGradient: 'linear-gradient(90deg, #ff9800 0%, #ffb74d 100%)',
          textGradient: 'linear-gradient(135deg, #ff9800 0%, #ffb74d 100%)',
          shadow: '0 12px 24px rgba(255,152,0,0.15)',
          iconShadow: 'drop-shadow(0 2px 4px rgba(255,152,0,0.3))'
        };
    }
  };

  const colors = getGradientColors();

  return (
    <Grow in timeout={delay}>
      <Card sx={{
        background: colors.background,
        border: BORDER.SOLID_1,
        borderColor: colors.borderColor,
        borderRadius: BORDER_RADIUS.LARGE,
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-4px) scale(1.02)',
          boxShadow: colors.shadow,
          '& .card-icon': {
            transform: 'scale(1.1) rotate(5deg)',
          }
        }
      }}>
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: colors.topGradient
        }} />
        <CardContent sx={{ textAlign: 'center', p: SPACING.MD, position: 'relative' }}>
          <Box className="card-icon" sx={{
            fontSize: 50,
            color: `${color}.main`,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            filter: colors.iconShadow
          }}>
            {icon}
          </Box>
          <Typography variant="h4" sx={{
            fontWeight: FONT_WEIGHTS.BOLD,
            mb: 0.5,
            background: colors.textGradient,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            {value}
          </Typography>
          <Typography variant="body2" sx={{
            color: 'text.secondary',
            fontWeight: FONT_WEIGHTS.MEDIUM,
            textTransform: 'uppercase',
            letterSpacing: 0.5
          }}>
            {label}
          </Typography>
        </CardContent>
      </Card>
    </Grow>
  );
}; 