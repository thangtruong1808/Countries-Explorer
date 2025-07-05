import {
  Public as ContinentIcon,
  AttachMoney as CurrencyIcon,
  Flag as FlagIcon,
  Language as LanguageIcon,
  Explore as ExploreIcon
} from '@mui/icons-material';
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Typography,
  LinearProgress,
  Fade,
  Grow
} from '@mui/material';
import React from 'react';
import type { Continent, Country } from '../types';
import { BORDER_COLORS } from '../utils/colorUtils';
import { getContinentStats, getCurrencyDiversity } from '../utils/dashboardUtils';
import { BORDER, BORDER_RADIUS, SPACING } from '../utils/styleUtils';
import { FONT_SIZES, FONT_WEIGHTS } from '../utils/typographyUtils';

interface ContinentDashboardProps {
  countries: Country[];
  continents: Continent[];
}

export const ContinentDashboard: React.FC<ContinentDashboardProps> = ({
  countries,
  continents
}) => {
  const continentStats = React.useMemo(() =>
    getContinentStats(countries, continents),
    [countries, continents]
  );

  const currencyDiversity = React.useMemo(() =>
    getCurrencyDiversity(countries),
    [countries]
  );

  const totalCountries = countries.length;
  const totalLanguages = new Set(
    countries.flatMap(country =>
      country.languages?.map(lang => lang.name) || []
    )
  ).size;
  const totalCurrencies = currencyDiversity.totalCurrencies;

  // Calculate percentage for progress bars
  const maxCountries = Math.max(...continentStats.map(stat => stat.countryCount));
  const maxLanguages = Math.max(...continentStats.map(stat => stat.uniqueLanguages));

  return (
    <Box sx={{ p: SPACING.LG }}>
      {/* Enhanced Header */}
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

      {/* Enhanced Summary Cards */}
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
        gap: 2,
        mb: SPACING.LG
      }}>
        <Grow in timeout={300}>
          <Card sx={{
            background: 'linear-gradient(135deg, rgba(25,118,210,0.05) 0%, rgba(25,118,210,0.02) 100%)',
            border: BORDER.SOLID_1,
            borderColor: 'primary.main',
            borderRadius: BORDER_RADIUS.LARGE,
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              transform: 'translateY(-4px) scale(1.02)',
              boxShadow: '0 12px 24px rgba(25,118,210,0.15)',
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
              background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)'
            }} />
            <CardContent sx={{ textAlign: 'center', p: SPACING.MD, position: 'relative' }}>
              <FlagIcon className="card-icon" sx={{
                fontSize: 40,
                color: 'primary.main',
                mb: 1.5,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                filter: 'drop-shadow(0 2px 4px rgba(25,118,210,0.3))'
              }} />
              <Typography variant="h4" sx={{
                fontWeight: FONT_WEIGHTS.BOLD,
                mb: 0.5,
                background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                {totalCountries}
              </Typography>
              <Typography variant="body2" sx={{
                color: 'text.secondary',
                fontWeight: FONT_WEIGHTS.MEDIUM,
                textTransform: 'uppercase',
                letterSpacing: 0.5
              }}>
                Total Countries
              </Typography>
            </CardContent>
          </Card>
        </Grow>

        <Grow in timeout={500}>
          <Card sx={{
            background: 'linear-gradient(135deg, rgba(156,39,176,0.05) 0%, rgba(156,39,176,0.02) 100%)',
            border: BORDER.SOLID_1,
            borderColor: 'secondary.main',
            borderRadius: BORDER_RADIUS.LARGE,
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              transform: 'translateY(-4px) scale(1.02)',
              boxShadow: '0 12px 24px rgba(156,39,176,0.15)',
              '& .card-icon': {
                transform: 'scale(1.1) rotate(-5deg)',
              }
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
            <CardContent sx={{ textAlign: 'center', p: SPACING.MD, position: 'relative' }}>
              <LanguageIcon className="card-icon" sx={{
                fontSize: 40,
                color: 'secondary.main',
                mb: 1.5,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                filter: 'drop-shadow(0 2px 4px rgba(156,39,176,0.3))'
              }} />
              <Typography variant="h4" sx={{
                fontWeight: FONT_WEIGHTS.BOLD,
                mb: 0.5,
                background: 'linear-gradient(135deg, #9c27b0 0%, #ba68c8 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                {totalLanguages}
              </Typography>
              <Typography variant="body2" sx={{
                color: 'text.secondary',
                fontWeight: FONT_WEIGHTS.MEDIUM,
                textTransform: 'uppercase',
                letterSpacing: 0.5
              }}>
                Languages Spoken
              </Typography>
            </CardContent>
          </Card>
        </Grow>

        <Grow in timeout={700}>
          <Card sx={{
            background: 'linear-gradient(135deg, rgba(255,152,0,0.05) 0%, rgba(255,152,0,0.02) 100%)',
            border: BORDER.SOLID_1,
            borderColor: 'warning.main',
            borderRadius: BORDER_RADIUS.LARGE,
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              transform: 'translateY(-4px) scale(1.02)',
              boxShadow: '0 12px 24px rgba(255,152,0,0.15)',
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
              background: 'linear-gradient(90deg, #ff9800 0%, #ffb74d 100%)'
            }} />
            <CardContent sx={{ textAlign: 'center', p: SPACING.MD, position: 'relative' }}>
              <CurrencyIcon className="card-icon" sx={{
                fontSize: 40,
                color: 'warning.main',
                mb: 1.5,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                filter: 'drop-shadow(0 2px 4px rgba(255,152,0,0.3))'
              }} />
              <Typography variant="h4" sx={{
                fontWeight: FONT_WEIGHTS.BOLD,
                mb: 0.5,
                background: 'linear-gradient(135deg, #ff9800 0%, #ffb74d 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                {totalCurrencies}
              </Typography>
              <Typography variant="body2" sx={{
                color: 'text.secondary',
                fontWeight: FONT_WEIGHTS.MEDIUM,
                textTransform: 'uppercase',
                letterSpacing: 0.5
              }}>
                Currency Diversity
              </Typography>
            </CardContent>
          </Card>
        </Grow>
      </Box>

      {/* Enhanced Continent Statistics */}
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

      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
        gap: 2
      }}>
        {continentStats.map((stat, index) => (
          <Fade in timeout={800 + index * 200} key={stat.continent.code}>
            <Card sx={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
              backdropFilter: 'blur(10px)',
              border: BORDER.SOLID_1,
              borderColor: BORDER_COLORS.DIVIDER,
              borderRadius: BORDER_RADIUS.LARGE,
              height: '100%',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                transform: 'translateY(-4px) scale(1.02)',
                boxShadow: '0 12px 24px rgba(0,0,0,0.12)',
                '& .continent-header': {
                  background: 'linear-gradient(135deg, rgba(25,118,210,0.1) 0%, rgba(156,39,176,0.1) 100%)',
                }
              }
            }}>
              {/* Animated background pattern */}
              <Box sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `radial-gradient(circle at ${20 + index * 20}% ${30 + index * 15}%, rgba(25,118,210,0.03) 0%, transparent 50%)`,
                pointerEvents: 'none'
              }} />

              <CardContent sx={{ p: SPACING.MD, position: 'relative', zIndex: 1 }}>
                <Box className="continent-header" sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mb: SPACING.MD,
                  p: SPACING.SM,
                  borderRadius: BORDER_RADIUS.MEDIUM,
                  transition: 'all 0.3s ease',
                  background: 'linear-gradient(135deg, rgba(25,118,210,0.05) 0%, rgba(156,39,176,0.05) 100%)'
                }}>
                  <ContinentIcon sx={{
                    color: 'primary.main',
                    mr: 1,
                    fontSize: 20,
                    filter: 'drop-shadow(0 1px 2px rgba(25,118,210,0.3))'
                  }} />
                  <Typography variant="subtitle1" sx={{
                    fontWeight: FONT_WEIGHTS.BOLD,
                    background: 'linear-gradient(135deg, #1976d2 0%, #9c27b0 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    {stat.continent.name}
                  </Typography>
                </Box>

                <Box sx={{ mb: SPACING.MD }}>
                  <Typography variant="h4" sx={{
                    fontWeight: FONT_WEIGHTS.BOLD,
                    color: 'primary.main',
                    mb: 0.5,
                    textAlign: 'center',
                    textShadow: '0 1px 2px rgba(25,118,210,0.2)'
                  }}>
                    {stat.countryCount}
                  </Typography>
                  <Typography variant="body2" sx={{
                    color: 'text.secondary',
                    textAlign: 'center',
                    fontWeight: FONT_WEIGHTS.MEDIUM,
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                    mb: 1
                  }}>
                    Countries
                  </Typography>

                  {/* Progress bar for countries */}
                  <Box sx={{ mb: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={(stat.countryCount / maxCountries) * 100}
                      sx={{
                        height: 6,
                        borderRadius: BORDER_RADIUS.SMALL,
                        background: 'rgba(25,118,210,0.1)',
                        '& .MuiLinearProgress-bar': {
                          background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)',
                          borderRadius: BORDER_RADIUS.SMALL
                        }
                      }}
                    />
                    <Typography variant="caption" sx={{
                      color: 'text.secondary',
                      mt: 0.25,
                      display: 'block',
                      textAlign: 'center',
                      fontSize: '0.7rem'
                    }}>
                      {((stat.countryCount / maxCountries) * 100).toFixed(0)}% of max
                    </Typography>
                  </Box>
                </Box>

                <Divider sx={{
                  my: SPACING.MD,
                  background: 'linear-gradient(90deg, transparent 0%, rgba(25,118,210,0.2) 50%, transparent 100%)',
                  height: 1
                }} />

                <Box sx={{ mb: SPACING.MD }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <LanguageIcon sx={{ color: 'secondary.main', mr: 0.5, fontSize: 16 }} />
                    <Typography variant="body2" sx={{
                      fontWeight: FONT_WEIGHTS.BOLD,
                      color: 'text.primary',
                      fontSize: '0.8rem'
                    }}>
                      Languages: {stat.uniqueLanguages}
                    </Typography>
                  </Box>

                  {/* Progress bar for languages */}
                  <Box sx={{ mb: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={(stat.uniqueLanguages / maxLanguages) * 100}
                      sx={{
                        height: 4,
                        borderRadius: BORDER_RADIUS.SMALL,
                        background: 'rgba(156,39,176,0.1)',
                        '& .MuiLinearProgress-bar': {
                          background: 'linear-gradient(90deg, #9c27b0 0%, #ba68c8 100%)',
                          borderRadius: BORDER_RADIUS.SMALL
                        }
                      }}
                    />
                  </Box>

                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.25 }}>
                    {stat.languages.slice(0, 3).map((language, langIndex) => (
                      <Chip
                        key={langIndex}
                        label={language}
                        size="small"
                        sx={{
                          fontSize: '0.65rem',
                          height: 20,
                          background: 'linear-gradient(135deg, rgba(156,39,176,0.1) 0%, rgba(156,39,176,0.05) 100%)',
                          color: 'secondary.main',
                          fontWeight: FONT_WEIGHTS.MEDIUM,
                          border: BORDER.SOLID_1,
                          borderColor: 'secondary.main',
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            background: 'linear-gradient(135deg, rgba(156,39,176,0.2) 0%, rgba(156,39,176,0.1) 100%)',
                            transform: 'scale(1.05)'
                          }
                        }}
                      />
                    ))}
                    {stat.languages.length > 3 && (
                      <Chip
                        label={`+${stat.languages.length - 3}`}
                        size="small"
                        sx={{
                          fontSize: '0.65rem',
                          height: 20,
                          background: 'linear-gradient(135deg, rgba(255,152,0,0.1) 0%, rgba(255,152,0,0.05) 100%)',
                          color: 'warning.main',
                          fontWeight: FONT_WEIGHTS.MEDIUM,
                          border: BORDER.SOLID_1,
                          borderColor: 'warning.main'
                        }}
                      />
                    )}
                  </Box>
                </Box>

                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <CurrencyIcon sx={{ color: 'warning.main', mr: 0.5, fontSize: 16 }} />
                    <Typography variant="body2" sx={{
                      fontWeight: FONT_WEIGHTS.BOLD,
                      color: 'text.primary',
                      fontSize: '0.8rem'
                    }}>
                      Currencies: {stat.uniqueCurrencies}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.25 }}>
                    {stat.currencies.slice(0, 3).map((currency, currIndex) => (
                      <Chip
                        key={currIndex}
                        label={currency}
                        size="small"
                        sx={{
                          fontSize: '0.65rem',
                          height: 20,
                          background: 'linear-gradient(135deg, rgba(255,152,0,0.1) 0%, rgba(255,152,0,0.05) 100%)',
                          color: 'warning.main',
                          fontWeight: FONT_WEIGHTS.MEDIUM,
                          border: BORDER.SOLID_1,
                          borderColor: 'warning.main',
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            background: 'linear-gradient(135deg, rgba(255,152,0,0.2) 0%, rgba(255,152,0,0.1) 100%)',
                            transform: 'scale(1.05)'
                          }
                        }}
                      />
                    ))}
                    {stat.currencies.length > 3 && (
                      <Chip
                        label={`+${stat.currencies.length - 3}`}
                        size="small"
                        sx={{
                          fontSize: '0.65rem',
                          height: 20,
                          background: 'linear-gradient(135deg, rgba(76,175,80,0.1) 0%, rgba(76,175,80,0.05) 100%)',
                          color: 'success.main',
                          fontWeight: FONT_WEIGHTS.MEDIUM,
                          border: BORDER.SOLID_1,
                          borderColor: 'success.main'
                        }}
                      />
                    )}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Fade>
        ))}
      </Box>
    </Box>
  );
}; 