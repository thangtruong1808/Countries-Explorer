import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { Grow } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import { PieChart as PieChartIcon } from '@mui/icons-material';
import { BORDER, BORDER_RADIUS, SPACING } from '../../utils/styleUtils';
import { FONT_WEIGHTS } from '../../utils/typographyUtils';
import { pieChartOptions } from './chartConfig';

interface LanguageDistribution {
  language: string;
  count: number;
}

interface LanguagePieChartProps {
  languageDistribution: LanguageDistribution[];
}

export const LanguagePieChart: React.FC<LanguagePieChartProps> = ({
  languageDistribution
}) => {
  // Pie chart data for language distribution
  const pieChartData = {
    labels: languageDistribution.map(item => item.language),
    datasets: [
      {
        data: languageDistribution.map(item => item.count),
        backgroundColor: [
          '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
          '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
        ],
        borderWidth: 2,
        borderColor: '#ffffff',
      },
    ],
  };

  return (
    <Grow in timeout={300}>
      <Card sx={{
        background: (theme) => theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, rgba(156,39,176,0.12) 0%, rgba(156,39,176,0.06) 100%)'
          : 'linear-gradient(135deg, rgba(156,39,176,0.05) 0%, rgba(156,39,176,0.02) 100%)',
        border: BORDER.SOLID_1,
        borderColor: 'secondary.main',
        borderRadius: BORDER_RADIUS.LARGE,
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-4px) scale(1.01)',
          boxShadow: (theme) => theme.palette.mode === 'dark'
            ? '0 12px 24px rgba(156,39,176,0.25)'
            : '0 12px 24px rgba(156,39,176,0.15)',
        }
      }}>
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: 'linear-gradient(90deg, #9c27b0 0%, #ba68c8 100%)'
        }} />
        <CardContent sx={{ p: SPACING.MD, position: 'relative' }}>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            mb: SPACING.MD,
            p: SPACING.SM,
            borderRadius: BORDER_RADIUS.MEDIUM,
            background: (theme) => theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, rgba(156,39,176,0.15) 0%, rgba(156,39,176,0.08) 100%)'
              : 'linear-gradient(135deg, rgba(156,39,176,0.1) 0%, rgba(156,39,176,0.05) 100%)'
          }}>
            <PieChartIcon sx={{
              color: 'secondary.main',
              mr: 1,
              fontSize: 20,
              filter: 'drop-shadow(0 1px 2px rgba(156,39,176,0.3))'
            }} />
            <Typography variant="subtitle1" sx={{
              fontWeight: FONT_WEIGHTS.BOLD,
              background: 'linear-gradient(135deg, #9c27b0 0%, #ba68c8 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Language Distribution
            </Typography>
          </Box>
          <Typography variant="body2" sx={{
            color: 'text.secondary',
            mb: SPACING.MD,
            fontSize: '0.8rem'
          }}>
            Top 10 most spoken languages across all countries
          </Typography>
          <Box sx={{ height: 300, position: 'relative' }}>
            <Pie data={pieChartData} options={pieChartOptions} />
          </Box>
        </CardContent>
      </Card>
    </Grow>
  );
}; 