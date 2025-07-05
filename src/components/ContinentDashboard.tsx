import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  Paper,
  Divider
} from '@mui/material';
import {
  Public as ContinentIcon,
  Language as LanguageIcon,
  AttachMoney as CurrencyIcon,
  Flag as FlagIcon
} from '@mui/icons-material';
import type { Country, Continent } from '../types';
import { BACKGROUND_COLORS, BORDER_COLORS, PRIMARY_COLORS } from '../utils/colorUtils';
import { BORDER, BORDER_RADIUS, SPACING } from '../utils/styleUtils';
import { FONT_SIZES, FONT_WEIGHTS } from '../utils/typographyUtils';
import { getContinentStats, getCurrencyDiversity, type ContinentStats } from '../utils/dashboardUtils';

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

  return (
    <Box sx={{ p: SPACING.LG }}>
      {/* Summary Cards */}
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
        gap: 3,
        mb: SPACING.XL
      }}>
        <Card sx={{
          background: BACKGROUND_COLORS.PAPER,
          border: BORDER.SOLID_1,
          borderColor: BORDER_COLORS.DIVIDER,
          borderRadius: BORDER_RADIUS.LARGE,
        }}>
          <CardContent sx={{ textAlign: 'center', p: SPACING.LG }}>
            <FlagIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h4" sx={{ fontWeight: FONT_WEIGHTS.BOLD, mb: 1 }}>
              {totalCountries}
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              Total Countries
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{
          background: BACKGROUND_COLORS.PAPER,
          border: BORDER.SOLID_1,
          borderColor: BORDER_COLORS.DIVIDER,
          borderRadius: BORDER_RADIUS.LARGE,
        }}>
          <CardContent sx={{ textAlign: 'center', p: SPACING.LG }}>
            <LanguageIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h4" sx={{ fontWeight: FONT_WEIGHTS.BOLD, mb: 1 }}>
              {totalLanguages}
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              Languages Spoken
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{
          background: BACKGROUND_COLORS.PAPER,
          border: BORDER.SOLID_1,
          borderColor: BORDER_COLORS.DIVIDER,
          borderRadius: BORDER_RADIUS.LARGE,
        }}>
          <CardContent sx={{ textAlign: 'center', p: SPACING.LG }}>
            <CurrencyIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h4" sx={{ fontWeight: FONT_WEIGHTS.BOLD, mb: 1 }}>
              {totalCurrencies}
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              Currency Diversity
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Continent Statistics */}
      <Typography variant="h5" sx={{
        fontWeight: FONT_WEIGHTS.BOLD,
        mb: SPACING.LG,
        color: 'text.primary'
      }}>
        Continent Statistics
      </Typography>

      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
        gap: 3
      }}>
        {continentStats.map((stat) => (
          <Box key={stat.continent.code}>
            <Card sx={{
              background: BACKGROUND_COLORS.PAPER,
              border: BORDER.SOLID_1,
              borderColor: BORDER_COLORS.DIVIDER,
              borderRadius: BORDER_RADIUS.LARGE,
              height: '100%',
              transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
              }
            }}>
              <CardContent sx={{ p: SPACING.LG }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: SPACING.MD }}>
                  <ContinentIcon sx={{ color: 'primary.main', mr: 1 }} />
                  <Typography variant="h6" sx={{ fontWeight: FONT_WEIGHTS.SEMIBOLD }}>
                    {stat.continent.name}
                  </Typography>
                </Box>

                <Typography variant="h4" sx={{
                  fontWeight: FONT_WEIGHTS.BOLD,
                  color: 'primary.main',
                  mb: SPACING.MD
                }}>
                  {stat.countryCount}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: SPACING.MD }}>
                  Countries
                </Typography>

                <Divider sx={{ my: SPACING.MD }} />

                <Box sx={{ mb: SPACING.MD }}>
                  <Typography variant="body2" sx={{
                    fontWeight: FONT_WEIGHTS.MEDIUM,
                    mb: 1,
                    color: 'text.primary'
                  }}>
                    Languages: {stat.uniqueLanguages}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {stat.languages.slice(0, 3).map((language, index) => (
                      <Chip
                        key={index}
                        label={language}
                        size="small"
                        sx={{
                          fontSize: FONT_SIZES.XS,
                          height: 20,
                          background: PRIMARY_COLORS.LIGHT,
                          color: 'primary.main',
                        }}
                      />
                    ))}
                    {stat.languages.length > 3 && (
                      <Chip
                        label={`+${stat.languages.length - 3} more`}
                        size="small"
                        sx={{
                          fontSize: FONT_SIZES.XS,
                          height: 20,
                          background: BACKGROUND_COLORS.HOVER,
                          color: 'text.secondary',
                        }}
                      />
                    )}
                  </Box>
                </Box>

                <Box>
                  <Typography variant="body2" sx={{
                    fontWeight: FONT_WEIGHTS.MEDIUM,
                    mb: 1,
                    color: 'text.primary'
                  }}>
                    Currencies: {stat.uniqueCurrencies}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {stat.currencies.slice(0, 3).map((currency, index) => (
                      <Chip
                        key={index}
                        label={currency}
                        size="small"
                        sx={{
                          fontSize: FONT_SIZES.XS,
                          height: 20,
                          background: PRIMARY_COLORS.LIGHT,
                          color: 'primary.main',
                        }}
                      />
                    ))}
                    {stat.currencies.length > 3 && (
                      <Chip
                        label={`+${stat.currencies.length - 3} more`}
                        size="small"
                        sx={{
                          fontSize: FONT_SIZES.XS,
                          height: 20,
                          background: BACKGROUND_COLORS.HOVER,
                          color: 'text.secondary',
                        }}
                      />
                    )}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
}; 