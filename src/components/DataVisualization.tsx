import React from 'react';
import { Box, Card, CardContent, Typography, Paper } from '@mui/material';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import type { Country, Continent } from '../types';
import { BACKGROUND_COLORS, BORDER_COLORS } from '../utils/colorUtils';
import { BORDER, BORDER_RADIUS, SPACING } from '../utils/styleUtils';
import { FONT_WEIGHTS } from '../utils/typographyUtils';
import {
  getContinentStats,
  getLanguageDistribution,
  getContinentChartData
} from '../utils/dashboardUtils';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface DataVisualizationProps {
  countries: Country[];
  continents: Continent[];
}

export const DataVisualization: React.FC<DataVisualizationProps> = ({
  countries,
  continents
}) => {
  const continentStats = React.useMemo(() =>
    getContinentStats(countries, continents),
    [countries, continents]
  );

  const languageDistribution = React.useMemo(() =>
    getLanguageDistribution(countries),
    [countries]
  );

  const continentChartData = React.useMemo(() =>
    getContinentChartData(continentStats),
    [continentStats]
  );

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
        borderColor: BACKGROUND_COLORS.PAPER,
      },
    ],
  };

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

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: 'text.primary',
          font: {
            size: 12,
          },
          usePointStyle: true,
        },
      },
      tooltip: {
        backgroundColor: BACKGROUND_COLORS.PAPER,
        titleColor: 'text.primary',
        bodyColor: 'text.secondary',
        borderColor: BORDER_COLORS.DIVIDER,
        borderWidth: 1,
        cornerRadius: 8,
      },
    },
  };

  const pieChartOptions = {
    ...chartOptions,
    plugins: {
      ...chartOptions.plugins,
      legend: {
        ...chartOptions.plugins.legend,
        display: true,
      },
    },
  };

  const barChartOptions = {
    ...chartOptions,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: BORDER_COLORS.DIVIDER,
        },
        ticks: {
          color: 'text.secondary',
        },
      },
      x: {
        grid: {
          color: BORDER_COLORS.DIVIDER,
        },
        ticks: {
          color: 'text.secondary',
        },
      },
    },
  };

  return (
    <Box sx={{ p: SPACING.LG }}>
      <Typography variant="h4" sx={{
        fontWeight: FONT_WEIGHTS.BOLD,
        mb: SPACING.XL,
        color: 'text.primary'
      }}>
        Data Visualization
      </Typography>

      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, 1fr)' },
        gap: 4,
        mb: SPACING.XL
      }}>
        {/* Language Distribution Pie Chart */}
        <Card sx={{
          background: BACKGROUND_COLORS.PAPER,
          border: BORDER.SOLID_1,
          borderColor: BORDER_COLORS.DIVIDER,
          borderRadius: BORDER_RADIUS.LARGE,
        }}>
          <CardContent sx={{ p: SPACING.LG }}>
            <Typography variant="h6" sx={{
              fontWeight: FONT_WEIGHTS.SEMIBOLD,
              mb: SPACING.MD,
              color: 'text.primary'
            }}>
              Language Distribution
            </Typography>
            <Typography variant="body2" sx={{
              color: 'text.secondary',
              mb: SPACING.LG
            }}>
              Top 10 most spoken languages across all countries
            </Typography>
            <Box sx={{ height: 400, position: 'relative' }}>
              <Pie data={pieChartData} options={pieChartOptions} />
            </Box>
          </CardContent>
        </Card>

        {/* Countries per Continent Bar Chart */}
        <Card sx={{
          background: BACKGROUND_COLORS.PAPER,
          border: BORDER.SOLID_1,
          borderColor: BORDER_COLORS.DIVIDER,
          borderRadius: BORDER_RADIUS.LARGE,
        }}>
          <CardContent sx={{ p: SPACING.LG }}>
            <Typography variant="h6" sx={{
              fontWeight: FONT_WEIGHTS.SEMIBOLD,
              mb: SPACING.MD,
              color: 'text.primary'
            }}>
              Countries per Continent
            </Typography>
            <Typography variant="body2" sx={{
              color: 'text.secondary',
              mb: SPACING.LG
            }}>
              Number of countries in each continent
            </Typography>
            <Box sx={{ height: 400, position: 'relative' }}>
              <Bar data={barChartData} options={barChartOptions} />
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Summary Statistics */}
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
        gap: 3
      }}>
        <Paper sx={{
          p: SPACING.LG,
          background: BACKGROUND_COLORS.PAPER,
          border: BORDER.SOLID_1,
          borderColor: BORDER_COLORS.DIVIDER,
          borderRadius: BORDER_RADIUS.MEDIUM,
        }}>
          <Typography variant="h6" sx={{ fontWeight: FONT_WEIGHTS.SEMIBOLD, mb: 1 }}>
            Most Spoken Language
          </Typography>
          <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: FONT_WEIGHTS.BOLD }}>
            {languageDistribution[0]?.language || 'N/A'}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {languageDistribution[0]?.count || 0} countries
          </Typography>
        </Paper>

        <Paper sx={{
          p: SPACING.LG,
          background: BACKGROUND_COLORS.PAPER,
          border: BORDER.SOLID_1,
          borderColor: BORDER_COLORS.DIVIDER,
          borderRadius: BORDER_RADIUS.MEDIUM,
        }}>
          <Typography variant="h6" sx={{ fontWeight: FONT_WEIGHTS.SEMIBOLD, mb: 1 }}>
            Largest Continent
          </Typography>
          <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: FONT_WEIGHTS.BOLD }}>
            {continentStats[0]?.continent.name || 'N/A'}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {continentStats[0]?.countryCount || 0} countries
          </Typography>
        </Paper>

        <Paper sx={{
          p: SPACING.LG,
          background: BACKGROUND_COLORS.PAPER,
          border: BORDER.SOLID_1,
          borderColor: BORDER_COLORS.DIVIDER,
          borderRadius: BORDER_RADIUS.MEDIUM,
        }}>
          <Typography variant="h6" sx={{ fontWeight: FONT_WEIGHTS.SEMIBOLD, mb: 1 }}>
            Total Languages
          </Typography>
          <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: FONT_WEIGHTS.BOLD }}>
            {languageDistribution.length}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Unique languages
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
}; 