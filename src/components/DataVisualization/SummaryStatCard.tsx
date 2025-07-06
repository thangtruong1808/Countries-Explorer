import React from 'react';
import { Box, Paper, Typography, Chip } from '@mui/material';
import { Fade } from '@mui/material';
import { BORDER, BORDER_RADIUS, SPACING } from '../../utils/styleUtils';
import { FONT_WEIGHTS } from '../../utils/typographyUtils';

interface SummaryStatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle: string;
  color: 'primary' | 'secondary' | 'success' | 'warning';
  delay: number;
  chips?: string[];
  totalLanguages?: number;
}

export const SummaryStatCard: React.FC<SummaryStatCardProps> = ({
  icon,
  title,
  value,
  subtitle,
  color,
  delay,
  chips,
  totalLanguages
}) => {
  const getGradientColors = () => {
    switch (color) {
      case 'primary':
        return {
          background: (theme: any) => theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, rgba(25,118,210,0.12) 0%, rgba(25,118,210,0.06) 100%)'
            : 'linear-gradient(135deg, rgba(25,118,210,0.05) 0%, rgba(25,118,210,0.02) 100%)',
          borderColor: 'primary.main',
          topGradient: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)',
          textGradient: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
          shadow: (theme: any) => theme.palette.mode === 'dark'
            ? '0 8px 16px rgba(25,118,210,0.25)'
            : '0 8px 16px rgba(25,118,210,0.15)',
          iconShadow: 'drop-shadow(0 1px 2px rgba(25,118,210,0.3))'
        };
      case 'secondary':
        return {
          background: (theme: any) => theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, rgba(156,39,176,0.12) 0%, rgba(156,39,176,0.06) 100%)'
            : 'linear-gradient(135deg, rgba(156,39,176,0.05) 0%, rgba(156,39,176,0.02) 100%)',
          borderColor: 'secondary.main',
          topGradient: 'linear-gradient(90deg, #9c27b0 0%, #ba68c8 100%)',
          textGradient: 'linear-gradient(135deg, #9c27b0 0%, #ba68c8 100%)',
          shadow: (theme: any) => theme.palette.mode === 'dark'
            ? '0 8px 16px rgba(156,39,176,0.25)'
            : '0 8px 16px rgba(156,39,176,0.15)',
          iconShadow: 'drop-shadow(0 1px 2px rgba(156,39,176,0.3))'
        };
      case 'success':
        return {
          background: (theme: any) => theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, rgba(76,175,80,0.12) 0%, rgba(76,175,80,0.06) 100%)'
            : 'linear-gradient(135deg, rgba(76,175,80,0.05) 0%, rgba(76,175,80,0.02) 100%)',
          borderColor: 'success.main',
          topGradient: 'linear-gradient(90deg, #4caf50 0%, #66bb6a 100%)',
          textGradient: 'linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)',
          shadow: (theme: any) => theme.palette.mode === 'dark'
            ? '0 8px 16px rgba(76,175,80,0.25)'
            : '0 8px 16px rgba(76,175,80,0.15)',
          iconShadow: 'drop-shadow(0 1px 2px rgba(76,175,80,0.3))'
        };
      case 'warning':
        return {
          background: (theme: any) => theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, rgba(255,152,0,0.12) 0%, rgba(255,152,0,0.06) 100%)'
            : 'linear-gradient(135deg, rgba(255,152,0,0.05) 0%, rgba(255,152,0,0.02) 100%)',
          borderColor: 'warning.main',
          topGradient: 'linear-gradient(90deg, #ff9800 0%, #ffb74d 100%)',
          textGradient: 'linear-gradient(135deg, #ff9800 0%, #ffb74d 100%)',
          shadow: (theme: any) => theme.palette.mode === 'dark'
            ? '0 8px 16px rgba(255,152,0,0.25)'
            : '0 8px 16px rgba(255,152,0,0.15)',
          iconShadow: 'drop-shadow(0 1px 2px rgba(255,152,0,0.3))'
        };
    }
  };

  const colors = getGradientColors();

  return (
    <Fade in timeout={delay}>
      <Paper sx={{
        p: SPACING.MD,
        background: colors.background,
        border: BORDER.SOLID_1,
        borderColor: colors.borderColor,
        borderRadius: BORDER_RADIUS.LARGE,
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-2px) scale(1.02)',
          boxShadow: colors.shadow,
        }
      }}>
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: colors.topGradient
        }} />
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Box sx={{
            color: `${color}.main`,
            mr: 1,
            fontSize: 18,
            filter: colors.iconShadow
          }}>
            {icon}
          </Box>
          <Typography variant="body2" sx={{
            fontWeight: FONT_WEIGHTS.BOLD,
            fontSize: '0.8rem',
            color: 'text.primary'
          }}>
            {title}
          </Typography>
        </Box>
        <Typography variant="h5" sx={{
          color: `${color}.main`,
          fontWeight: FONT_WEIGHTS.BOLD,
          mb: 0.5,
          background: colors.textGradient,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          {value}
        </Typography>
        <Typography variant="caption" sx={{
          color: 'text.secondary',
          fontSize: '0.7rem'
        }}>
          {subtitle}
        </Typography>

        {chips && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1, mt: 1 }}>
            {chips.map((chip, index) => (
              <Chip
                key={index}
                label={chip}
                size="small"
                sx={{
                  fontSize: '0.6rem',
                  height: 18,
                  background: 'linear-gradient(135deg, rgba(76,175,80,0.1) 0%, rgba(76,175,80,0.05) 100%)',
                  color: 'success.main',
                  fontWeight: FONT_WEIGHTS.MEDIUM,
                  border: '1px solid',
                  borderColor: 'success.main',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    background: 'linear-gradient(135deg, rgba(76,175,80,0.2) 0%, rgba(76,175,80,0.1) 100%)',
                    transform: 'scale(1.05)'
                  }
                }}
              />
            ))}
          </Box>
        )}

        {totalLanguages && (
          <Typography variant="caption" sx={{
            color: 'text.secondary',
            fontSize: '0.7rem'
          }}>
            {totalLanguages} total unique languages
          </Typography>
        )}
      </Paper>
    </Fade>
  );
}; 