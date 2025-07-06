import {
  ArrowBack as ArrowBackIcon,
  LocationCity as CapitalIcon,
  Public as ContinentIcon,
  AttachMoney as CurrencyIcon,
  Language as LanguageIcon,
  Phone as PhoneIcon
} from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Paper,
  Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { NavBar } from '../components/NavBar';
import { useCountries } from '../hooks/useCountries';
import { BACKGROUND_COLORS, BORDER_COLORS, PRIMARY_COLORS } from '../utils/colorUtils';
import { getCountryDescription } from '../utils/countryDescription';
import { getFlagUrl } from '../utils/flagUtils';
import { ICON_STYLES } from '../utils/iconStyles';
import { BORDER, BORDER_RADIUS, SPACING, TRANSFORMS, TRANSITIONS } from '../utils/styleUtils';
import { FONT_SIZES, FONT_WEIGHTS } from '../utils/typographyUtils';

interface CountryDetailPageProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onFiltersToggle?: () => void;
}

export const CountryDetailPage: React.FC<CountryDetailPageProps> = ({
  currentTab,
  onTabChange,
  isDarkMode,
  onToggleTheme,
  onFiltersToggle
}) => {
  const { countryCode } = useParams<{ countryCode: string }>();
  const navigate = useNavigate();
  const { countries, loading, error } = useCountries();

  const [description, setDescription] = useState<string>('');
  const [loadingDescription, setLoadingDescription] = useState<boolean>(false);

  // Find the country by code
  const country = countries.find(c => c.code === countryCode);

  // Load country description
  useEffect(() => {
    if (country) {
      setLoadingDescription(true);
      const desc = getCountryDescription(country.name);
      setDescription(desc);
      setLoadingDescription(false);
    }
  }, [country]);

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <>
        <NavBar
          currentTab={currentTab}
          onTabChange={onTabChange}
          isDarkMode={isDarkMode}
          onToggleTheme={onToggleTheme}
          onFiltersToggle={onFiltersToggle}
        />
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
            <CircularProgress size={60} />
          </Box>
        </Container>
      </>
    );
  }

  if (error) {
    return (
      <>
        <NavBar
          currentTab={currentTab}
          onTabChange={onTabChange}
          isDarkMode={isDarkMode}
          onToggleTheme={onToggleTheme}
          onFiltersToggle={onFiltersToggle}
        />
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Alert severity="error" sx={{ fontSize: FONT_SIZES.MD }}>
            Error loading country data: {error.message}
          </Alert>
        </Container>
      </>
    );
  }

  if (!country) {
    return (
      <>
        <NavBar
          currentTab={currentTab}
          onTabChange={onTabChange}
          isDarkMode={isDarkMode}
          onToggleTheme={onToggleTheme}
          onFiltersToggle={onFiltersToggle}
        />
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Alert severity="warning" sx={{ fontSize: FONT_SIZES.MD }}>
            Country not found
          </Alert>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={handleGoBack}
            sx={{ mt: 2 }}
          >
            Go Back
          </Button>
        </Container>
      </>
    );
  }

  return (
    <>
      <NavBar
        currentTab={currentTab}
        onTabChange={onTabChange}
        isDarkMode={isDarkMode}
        onToggleTheme={onToggleTheme}
        onFiltersToggle={onFiltersToggle}
      />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Country Header */}
        <Paper
          elevation={0}
          sx={{
            p: SPACING.XL,
            mb: SPACING.XL,
            borderRadius: BORDER_RADIUS.LARGE,
            border: BORDER.SOLID_1,
            borderColor: BORDER_COLORS.DIVIDER,
            background: BACKGROUND_COLORS.PAPER
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: SPACING.LG, mb: SPACING.LG }}>
            <Box
              component="img"
              src={getFlagUrl(country.code)}
              alt={`Flag of ${country.name}`}
              sx={{
                width: { xs: 140, sm: 180, md: 220 },
                height: { xs: 90, sm: 120, md: 140 },
                borderRadius: BORDER_RADIUS.MEDIUM,
                border: BORDER.SOLID_2,
                borderColor: BORDER_COLORS.DIVIDER,
                objectFit: 'cover',
                boxShadow: '0 6px 16px rgba(0,0,0,0.12)',
                flexShrink: 0
              }}
            />
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: FONT_WEIGHTS.BOLD,
                  color: 'text.primary',
                  fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
                  mb: 1,
                  lineHeight: 1.2
                }}
              >
                {country.name}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  fontSize: { xs: '1rem', sm: '1.25rem' },
                  fontWeight: FONT_WEIGHTS.MEDIUM
                }}
              >
                {country.emoji}
              </Typography>
            </Box>
          </Box>

          {/* Description */}
          {loadingDescription ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: SPACING.LG }}>
              <CircularProgress size={40} />
            </Box>
          ) : (
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                fontSize: FONT_SIZES.LG,
                lineHeight: 1.6,
                mb: SPACING.LG
              }}
            >
              {description}
            </Typography>
          )}
        </Paper>

        {/* Country Details and Map Section */}
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
          gap: SPACING.LG,
          mb: SPACING.LG,
          minHeight: { lg: 600 }
        }}>
          {/* Country Details */}
          <Paper
            elevation={0}
            sx={{
              p: SPACING.LG,
              borderRadius: BORDER_RADIUS.LARGE,
              border: BORDER.SOLID_1,
              borderColor: BORDER_COLORS.DIVIDER,
              background: BACKGROUND_COLORS.PAPER,
              flex: { lg: '0 0 400px' },
              minHeight: { lg: 600 },
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: FONT_WEIGHTS.BOLD,
                color: 'text.primary',
                fontSize: { xs: '1.5rem', sm: '1.75rem' },
                mb: SPACING.LG,
                flexShrink: 0,
                textAlign: 'center',
                pb: SPACING.MD,
                borderBottom: BORDER.SOLID_1,
                borderColor: BORDER_COLORS.DIVIDER
              }}
            >
              Information
            </Typography>

            <Box sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: '1fr' },
              gap: SPACING.MD,
              flex: 1,
              overflow: 'auto',
              pr: { lg: SPACING.SM },
              pt: SPACING.SM,
              pb: SPACING.SM,
              alignContent: 'start'
            }}>
              {/* Continent */}
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: SPACING.MD,
                p: SPACING.MD,
                borderRadius: BORDER_RADIUS.MEDIUM,
                background: BACKGROUND_COLORS.HOVER,
                border: BORDER.SOLID_1,
                borderColor: BORDER_COLORS.DIVIDER,
                transition: TRANSITIONS.NORMAL,
                minHeight: 80,
                '&:hover': {
                  borderColor: 'primary.main',
                  background: BACKGROUND_COLORS.PAPER,
                  transform: TRANSFORMS.HOVER_LIFT,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                }
              }}>
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 48,
                  height: 48,
                  borderRadius: BORDER_RADIUS.MEDIUM,
                  background: PRIMARY_COLORS.LIGHT,
                  color: 'primary.main',
                  flexShrink: 0
                }}>
                  <ContinentIcon sx={{ fontSize: 24 }} />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: FONT_SIZES.SM, mb: 0.5, fontWeight: FONT_WEIGHTS.MEDIUM }}>
                    Continent
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: FONT_WEIGHTS.SEMIBOLD, fontSize: FONT_SIZES.MD }}>
                    {country.continent.name}
                  </Typography>
                </Box>
              </Box>

              {/* Capital */}
              {country.capital && (
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: SPACING.MD,
                  p: SPACING.MD,
                  borderRadius: BORDER_RADIUS.MEDIUM,
                  background: BACKGROUND_COLORS.HOVER,
                  border: BORDER.SOLID_1,
                  borderColor: BORDER_COLORS.DIVIDER,
                  transition: TRANSITIONS.NORMAL,
                  minHeight: 80,
                  '&:hover': {
                    borderColor: 'primary.main',
                    background: BACKGROUND_COLORS.PAPER,
                    transform: TRANSFORMS.HOVER_LIFT,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  }
                }}>
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 48,
                    height: 48,
                    borderRadius: BORDER_RADIUS.MEDIUM,
                    background: PRIMARY_COLORS.LIGHT,
                    color: 'primary.main',
                    flexShrink: 0
                  }}>
                    <CapitalIcon sx={{ fontSize: 24 }} />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: FONT_SIZES.SM, mb: 0.5, fontWeight: FONT_WEIGHTS.MEDIUM }}>
                      Capital
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: FONT_WEIGHTS.SEMIBOLD, fontSize: FONT_SIZES.MD }}>
                      {country.capital}
                    </Typography>
                  </Box>
                </Box>
              )}

              {/* Currency */}
              {country.currency && (
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: SPACING.MD,
                  p: SPACING.MD,
                  borderRadius: BORDER_RADIUS.MEDIUM,
                  background: BACKGROUND_COLORS.HOVER,
                  border: BORDER.SOLID_1,
                  borderColor: BORDER_COLORS.DIVIDER,
                  transition: TRANSITIONS.NORMAL,
                  minHeight: 80,
                  '&:hover': {
                    borderColor: 'primary.main',
                    background: BACKGROUND_COLORS.PAPER,
                    transform: TRANSFORMS.HOVER_LIFT,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  }
                }}>
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 48,
                    height: 48,
                    borderRadius: BORDER_RADIUS.MEDIUM,
                    background: PRIMARY_COLORS.LIGHT,
                    color: 'primary.main',
                    flexShrink: 0
                  }}>
                    <CurrencyIcon sx={{ fontSize: 24 }} />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: FONT_SIZES.SM, mb: 0.5, fontWeight: FONT_WEIGHTS.MEDIUM }}>
                      Currency
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: FONT_WEIGHTS.SEMIBOLD, fontSize: FONT_SIZES.MD }}>
                      {country.currency}
                    </Typography>
                  </Box>
                </Box>
              )}

              {/* Phone */}
              {country.phone && (
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: SPACING.MD,
                  p: SPACING.MD,
                  borderRadius: BORDER_RADIUS.MEDIUM,
                  background: BACKGROUND_COLORS.HOVER,
                  border: BORDER.SOLID_1,
                  borderColor: BORDER_COLORS.DIVIDER,
                  transition: TRANSITIONS.NORMAL,
                  minHeight: 80,
                  '&:hover': {
                    borderColor: 'primary.main',
                    background: BACKGROUND_COLORS.PAPER,
                    transform: TRANSFORMS.HOVER_LIFT,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  }
                }}>
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 48,
                    height: 48,
                    borderRadius: BORDER_RADIUS.MEDIUM,
                    background: PRIMARY_COLORS.LIGHT,
                    color: 'primary.main',
                    flexShrink: 0
                  }}>
                    <PhoneIcon sx={{ fontSize: 24 }} />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: FONT_SIZES.SM, mb: 0.5, fontWeight: FONT_WEIGHTS.MEDIUM }}>
                      Phone Code
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: FONT_WEIGHTS.SEMIBOLD, fontSize: FONT_SIZES.MD }}>
                      +{country.phone}
                    </Typography>
                  </Box>
                </Box>
              )}

              {/* Country Code */}
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: SPACING.MD,
                p: SPACING.MD,
                borderRadius: BORDER_RADIUS.MEDIUM,
                background: BACKGROUND_COLORS.HOVER,
                border: BORDER.SOLID_1,
                borderColor: BORDER_COLORS.DIVIDER,
                transition: TRANSITIONS.NORMAL,
                minHeight: 80,
                '&:hover': {
                  borderColor: 'primary.main',
                  background: BACKGROUND_COLORS.PAPER,
                  transform: TRANSFORMS.HOVER_LIFT,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                }
              }}>
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 48,
                  height: 48,
                  borderRadius: BORDER_RADIUS.MEDIUM,
                  background: PRIMARY_COLORS.LIGHT,
                  color: 'primary.main',
                  fontSize: FONT_SIZES.SM,
                  fontWeight: FONT_WEIGHTS.BOLD,
                  flexShrink: 0
                }}>
                  {country.code}
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: FONT_SIZES.SM, mb: 0.5, fontWeight: FONT_WEIGHTS.MEDIUM }}>
                    Country Code
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: FONT_WEIGHTS.SEMIBOLD, fontSize: FONT_SIZES.MD }}>
                    {country.code}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Paper>

          {/* Map Section */}
          <Paper
            elevation={0}
            sx={{
              p: SPACING.LG,
              borderRadius: BORDER_RADIUS.LARGE,
              border: BORDER.SOLID_1,
              borderColor: BORDER_COLORS.DIVIDER,
              background: BACKGROUND_COLORS.PAPER,
              flex: 1,
              minHeight: { lg: 600 },
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            }}
          >
            <Typography variant="h4" sx={{
              mb: SPACING.LG,
              fontWeight: FONT_WEIGHTS.BOLD,
              color: 'text.primary',
              fontSize: { xs: '1.5rem', sm: '1.75rem' },
              textAlign: 'center',
              pb: SPACING.MD,
              borderBottom: BORDER.SOLID_1,
              borderColor: BORDER_COLORS.DIVIDER
            }}>
              Location Map
            </Typography>
            <Box
              sx={{
                width: '100%',
                flex: 1,
                borderRadius: BORDER_RADIUS.MEDIUM,
                overflow: 'hidden',
                border: BORDER.SOLID_1,
                borderColor: BORDER_COLORS.DIVIDER,
                position: 'relative',
                background: BACKGROUND_COLORS.PAPER,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                '& iframe': {
                  border: 'none',
                  width: '100%',
                  height: '100%',
                }
              }}
            >
              <iframe
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(country.name)}`}
                title={`Map of ${country.name}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </Box>
            <Typography variant="caption" sx={{
              color: 'text.secondary',
              mt: SPACING.SM,
              display: 'block',
              fontSize: '0.75rem'
            }}>
              Interactive map showing the location of {country.name}
            </Typography>
          </Paper>
        </Box>
      </Container>

      {/* Back Button at Bottom Right */}
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            mt: SPACING.SM,
            mb: SPACING.LG
          }}
        >
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={handleGoBack}
            sx={{
              borderRadius: BORDER_RADIUS.MEDIUM,
              textTransform: 'none',
              fontWeight: FONT_WEIGHTS.MEDIUM,
              fontSize: FONT_SIZES.MD,
              px: SPACING.LG,
              py: SPACING.MD,
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              transition: TRANSITIONS.NORMAL,
              '&:hover': {
                transform: TRANSFORMS.HOVER_LIFT,
                boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
              }
            }}
          >
            Back to Countries
          </Button>
        </Box>
      </Container>
    </>
  );
}; 