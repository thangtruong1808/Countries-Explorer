import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { Grow } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { BarChart as BarChartIcon } from '@mui/icons-material';
import { BORDER, BORDER_RADIUS, SPACING } from '../../utils/styleUtils';
import { FONT_WEIGHTS } from '../../utils/typographyUtils';
import { barChartOptions } from './chartConfig';

interface ContinentChartData {
  continent: string;
  countryCount: number;
  color: string;
}

interface ContinentBarChartProps {
  continentChartData: ContinentChartData[];
}

export const ContinentBarChart: React.FC<ContinentBarChartProps> = ({
  continentChartData
}) => {
  // Bar chart data for countries per continent
  const barChartData = {
    labels: continentChartData.map(item => item.continent),
    datasets: [
      {
        label: 'Number of Countries',
        data: continentChartData.map(item => item.countryCount),
        backgroundColor: continentChartData.map(item => item.color),
        borderColor: continentChartData.map(item => item.color),
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  return (
    <Grow in timeout={500}>
      <Card sx={{
        background: (theme) => theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, rgba(25,118,210,0.12) 0%, rgba(25,118,210,0.06) 100%)'
          : 'linear-gradient(135deg, rgba(25,118,210,0.05) 0%, rgba(25,118,210,0.02) 100%)',
        border: BORDER.SOLID_1,
        borderColor: 'primary.main',
        borderRadius: BORDER_RADIUS.LARGE,
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-4px) scale(1.01)',
          boxShadow: (theme) => theme.palette.mode === 'dark'
            ? '0 12px 24px rgba(25,118,210,0.25)'
            : '0 12px 24px rgba(25,118,210,0.15)',
        }
      }}>
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)'
        }} />
        <CardContent sx={{ p: SPACING.MD, position: 'relative' }}>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            mb: SPACING.MD,
            p: SPACING.SM,
            borderRadius: BORDER_RADIUS.MEDIUM,
            background: (theme) => theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, rgba(25,118,210,0.15) 0%, rgba(25,118,210,0.08) 100%)'
              : 'linear-gradient(135deg, rgba(25,118,210,0.1) 0%, rgba(25,118,210,0.05) 100%)'
          }}>
            <BarChartIcon sx={{
              color: 'primary.main',
              mr: 1,
              fontSize: 20,
              filter: 'drop-shadow(0 1px 2px rgba(25,118,210,0.3))'
            }} />
            <Typography variant="subtitle1" sx={{
              fontWeight: FONT_WEIGHTS.BOLD,
              background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Countries per Continent
            </Typography>
          </Box>
          <Typography variant="body2" sx={{
            color: 'text.secondary',
            mb: SPACING.MD,
            fontSize: '0.8rem'
          }}>
            Number of countries in each continent
          </Typography>
          <Box sx={{ height: 300, position: 'relative' }}>
            <Bar data={barChartData} options={barChartOptions} />
          </Box>
        </CardContent>
      </Card>
    </Grow>
  );
}; 