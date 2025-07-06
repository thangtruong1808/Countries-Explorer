import React from 'react';
import { Box, Card, CardContent, Typography, Paper, Fade, Grow, Chip } from '@mui/material';
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
import {
  PieChart as PieChartIcon,
  BarChart as BarChartIcon,
  TrendingUp as TrendingUpIcon,
  Language as LanguageIcon,
  Public as ContinentIcon,
  DataUsage as DataUsageIcon
} from '@mui/icons-material';
import type { Country, Continent } from '../types';
import { BORDER, BORDER_RADIUS, SPACING } from '../utils/styleUtils';
import { FONT_WEIGHTS, FONT_SIZES } from '../utils/typographyUtils';
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

  // Calculate total unique languages across all countries
  const totalUniqueLanguages = React.useMemo(() => {
    const allLanguages = countries.flatMap(country =>
      country.languages?.map(lang => lang.name) || []
    );
    return new Set(allLanguages).size;
  }, [countries]);

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
          color: '#666666',
          font: {
            size: 11,
            weight: 500,
          },
          usePointStyle: true,
          padding: 15,
        },
      },
      tooltip: {
        backgroundColor: '#ffffff',
        titleColor: '#000000',
        bodyColor: '#666666',
        borderColor: '#e0e0e0',
        borderWidth: 1,
        cornerRadius: 8,
        titleFont: {
          size: 13,
          weight: 600,
        },
        bodyFont: {
          size: 12,
        },
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
          color: '#e0e0e0',
          drawBorder: false,
        },
        ticks: {
          color: '#666666',
          font: {
            size: 11,
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#666666',
          font: {
            size: 11,
          },
        },
      },
    },
  };

  return (
    <Box sx={{ p: SPACING.LG }}>
      {/* Enhanced Header */}
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

      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, 1fr)' },
        gap: 2,
        mb: SPACING.LG
      }}>
        {/* Enhanced Language Distribution Pie Chart */}
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

        {/* Enhanced Countries per Continent Bar Chart */}
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
      </Box>

      {/* Enhanced Summary Statistics */}
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
        gap: 2
      }}>
        <Fade in timeout={700}>
          <Paper sx={{
            p: SPACING.MD,
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
              transform: 'translateY(-2px) scale(1.02)',
              boxShadow: (theme) => theme.palette.mode === 'dark'
                ? '0 8px 16px rgba(156,39,176,0.25)'
                : '0 8px 16px rgba(156,39,176,0.15)',
            }
          }}>
            <Box sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 2,
              background: 'linear-gradient(90deg, #9c27b0 0%, #ba68c8 100%)'
            }} />
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <LanguageIcon sx={{
                color: 'secondary.main',
                mr: 1,
                fontSize: 18,
                filter: 'drop-shadow(0 1px 2px rgba(156,39,176,0.3))'
              }} />
              <Typography variant="body2" sx={{
                fontWeight: FONT_WEIGHTS.BOLD,
                fontSize: '0.8rem',
                color: 'text.primary'
              }}>
                Most Spoken Language
              </Typography>
            </Box>
            <Typography variant="h5" sx={{
              color: 'secondary.main',
              fontWeight: FONT_WEIGHTS.BOLD,
              mb: 0.5,
              background: 'linear-gradient(135deg, #9c27b0 0%, #ba68c8 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              {languageDistribution[0]?.language || 'N/A'}
            </Typography>
            <Typography variant="caption" sx={{
              color: 'text.secondary',
              fontSize: '0.7rem'
            }}>
              {languageDistribution[0]?.count || 0} countries
            </Typography>
          </Paper>
        </Fade>

        <Fade in timeout={800}>
          <Paper sx={{
            p: SPACING.MD,
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
              transform: 'translateY(-2px) scale(1.02)',
              boxShadow: (theme) => theme.palette.mode === 'dark'
                ? '0 8px 16px rgba(25,118,210,0.25)'
                : '0 8px 16px rgba(25,118,210,0.15)',
            }
          }}>
            <Box sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 2,
              background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)'
            }} />
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <ContinentIcon sx={{
                color: 'primary.main',
                mr: 1,
                fontSize: 18,
                filter: 'drop-shadow(0 1px 2px rgba(25,118,210,0.3))'
              }} />
              <Typography variant="body2" sx={{
                fontWeight: FONT_WEIGHTS.BOLD,
                fontSize: '0.8rem',
                color: 'text.primary'
              }}>
                Largest Continent
              </Typography>
            </Box>
            <Typography variant="h5" sx={{
              color: 'primary.main',
              fontWeight: FONT_WEIGHTS.BOLD,
              mb: 0.5,
              background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              {continentStats[0]?.continent.name || 'N/A'}
            </Typography>
            <Typography variant="caption" sx={{
              color: 'text.secondary',
              fontSize: '0.7rem'
            }}>
              {continentStats[0]?.countryCount || 0} countries
            </Typography>
          </Paper>
        </Fade>

        <Fade in timeout={900}>
          <Paper sx={{
            p: SPACING.MD,
            background: (theme) => theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, rgba(76,175,80,0.12) 0%, rgba(76,175,80,0.06) 100%)'
              : 'linear-gradient(135deg, rgba(76,175,80,0.05) 0%, rgba(76,175,80,0.02) 100%)',
            border: BORDER.SOLID_1,
            borderColor: 'success.main',
            borderRadius: BORDER_RADIUS.LARGE,
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              transform: 'translateY(-2px) scale(1.02)',
              boxShadow: (theme) => theme.palette.mode === 'dark'
                ? '0 8px 16px rgba(76,175,80,0.25)'
                : '0 8px 16px rgba(76,175,80,0.15)',
            }
          }}>
            <Box sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 2,
              background: 'linear-gradient(90deg, #4caf50 0%, #66bb6a 100%)'
            }} />
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <TrendingUpIcon sx={{
                color: 'success.main',
                mr: 1,
                fontSize: 18,
                filter: 'drop-shadow(0 1px 2px rgba(76,175,80,0.3))'
              }} />
              <Typography variant="body2" sx={{
                fontWeight: FONT_WEIGHTS.BOLD,
                fontSize: '0.8rem',
                color: 'text.primary'
              }}>
                Top popular languages used across all countries
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
              {languageDistribution.slice(0, 10).map((lang, index) => (
                <Chip
                  key={index}
                  label={lang.language}
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
            <Typography variant="caption" sx={{
              color: 'text.secondary',
              fontSize: '0.7rem'
            }}>
              {totalUniqueLanguages} total unique languages
            </Typography>
          </Paper>
        </Fade>
      </Box>
    </Box>
  );
}; 