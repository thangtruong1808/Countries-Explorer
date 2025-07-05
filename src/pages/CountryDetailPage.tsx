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
import { useCountries } from '../hooks/useCountries';
import { BACKGROUND_COLORS, BORDER_COLORS, PRIMARY_COLORS } from '../utils/colorUtils';
import { getCountryDescription } from '../utils/countryDescription';
import { getFlagUrl } from '../utils/flagUtils';
import { ICON_STYLES } from '../utils/iconStyles';
import { BORDER, BORDER_RADIUS, SPACING, TRANSFORMS, TRANSITIONS } from '../utils/styleUtils';
import { FONT_SIZES, FONT_WEIGHTS } from '../utils/typographyUtils';

export const CountryDetailPage: React.FC = () => {
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
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <CircularProgress size={60} />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Alert severity="error" sx={{ fontSize: FONT_SIZES.MD }}>
          Error loading country data: {error.message}
        </Alert>
      </Container>
    );
  }

  if (!country) {
    return (
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
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Back Button */}
      <Box sx={{ mb: 4 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={handleGoBack}
          sx={{
            borderRadius: BORDER_RADIUS.MEDIUM,
            textTransform: 'none',
            fontWeight: FONT_WEIGHTS.MEDIUM,
            fontSize: FONT_SIZES.MD,
            px: SPACING.LG,
            py: SPACING.SM
          }}
        >
          Back to Countries
        </Button>
      </Box>

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

      {/* Country Details */}
      <Paper
        elevation={0}
        sx={{
          p: SPACING.XL,
          borderRadius: BORDER_RADIUS.LARGE,
          border: BORDER.SOLID_1,
          borderColor: BORDER_COLORS.DIVIDER,
          background: BACKGROUND_COLORS.PAPER
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: FONT_WEIGHTS.BOLD,
            color: 'text.primary',
            fontSize: { xs: '1.5rem', sm: '2rem' },
            mb: SPACING.LG
          }}
        >
          Country Information
        </Typography>

        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
          gap: SPACING.LG
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
            '&:hover': {
              borderColor: 'primary.main',
              background: BACKGROUND_COLORS.PAPER,
              transform: TRANSFORMS.HOVER_LIFT,
            }
          }}>
            <ContinentIcon sx={ICON_STYLES.PRIMARY} />
            <Box>
              <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: FONT_SIZES.SM, mb: 0.5 }}>
                Continent
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: FONT_WEIGHTS.MEDIUM, fontSize: FONT_SIZES.MD }}>
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
              '&:hover': {
                borderColor: 'primary.main',
                background: BACKGROUND_COLORS.PAPER,
                transform: TRANSFORMS.HOVER_LIFT,
              }
            }}>
              <CapitalIcon sx={ICON_STYLES.PRIMARY} />
              <Box>
                <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: FONT_SIZES.SM, mb: 0.5 }}>
                  Capital
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: FONT_WEIGHTS.MEDIUM, fontSize: FONT_SIZES.MD }}>
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
              '&:hover': {
                borderColor: 'primary.main',
                background: BACKGROUND_COLORS.PAPER,
                transform: TRANSFORMS.HOVER_LIFT,
              }
            }}>
              <CurrencyIcon sx={ICON_STYLES.PRIMARY} />
              <Box>
                <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: FONT_SIZES.SM, mb: 0.5 }}>
                  Currency
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: FONT_WEIGHTS.MEDIUM, fontSize: FONT_SIZES.MD }}>
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
              '&:hover': {
                borderColor: 'primary.main',
                background: BACKGROUND_COLORS.PAPER,
                transform: TRANSFORMS.HOVER_LIFT,
              }
            }}>
              <PhoneIcon sx={ICON_STYLES.PRIMARY} />
              <Box>
                <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: FONT_SIZES.SM, mb: 0.5 }}>
                  Phone Code
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: FONT_WEIGHTS.MEDIUM, fontSize: FONT_SIZES.MD }}>
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
            '&:hover': {
              borderColor: 'primary.main',
              background: BACKGROUND_COLORS.PAPER,
              transform: TRANSFORMS.HOVER_LIFT,
            }
          }}>
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 32,
              height: 32,
              borderRadius: BORDER_RADIUS.SMALL,
              background: PRIMARY_COLORS.LIGHT,
              color: 'primary.main',
              fontSize: FONT_SIZES.SM,
              fontWeight: FONT_WEIGHTS.BOLD
            }}>
              {country.code}
            </Box>
            <Box>
              <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: FONT_SIZES.SM, mb: 0.5 }}>
                Country Code
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: FONT_WEIGHTS.MEDIUM, fontSize: FONT_SIZES.MD }}>
                {country.code}
              </Typography>
            </Box>
          </Box>

          {/* Languages Count */}
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
            '&:hover': {
              borderColor: 'primary.main',
              background: BACKGROUND_COLORS.PAPER,
              transform: TRANSFORMS.HOVER_LIFT,
            }
          }}>
            <LanguageIcon sx={ICON_STYLES.PRIMARY} />
            <Box>
              <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: FONT_SIZES.SM, mb: 0.5 }}>
                Languages
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: FONT_WEIGHTS.MEDIUM, fontSize: FONT_SIZES.MD }}>
                {country.languages.length} {country.languages.length === 1 ? 'language' : 'languages'}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Languages Detail Section */}
        {country.languages && country.languages.length > 0 && (
          <Box sx={{ mt: SPACING.XL }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: FONT_WEIGHTS.SEMIBOLD,
                color: 'text.primary',
                fontSize: { xs: '1.25rem', sm: '1.5rem' },
                mb: SPACING.LG
              }}
            >
              Languages Details
            </Typography>
            <Box sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
              gap: SPACING.MD
            }}>
              {country.languages.map((language) => (
                <Box
                  key={language.name}
                  sx={{
                    p: SPACING.MD,
                    borderRadius: BORDER_RADIUS.MEDIUM,
                    background: BACKGROUND_COLORS.PAPER,
                    border: BORDER.SOLID_1,
                    borderColor: BORDER_COLORS.DIVIDER,
                    transition: TRANSITIONS.NORMAL,
                    '&:hover': {
                      borderColor: 'primary.main',
                      background: BACKGROUND_COLORS.HOVER,
                      transform: TRANSFORMS.HOVER_LIFT,
                    }
                  }}
                >
                  <Typography variant="body1" sx={{ fontWeight: FONT_WEIGHTS.SEMIBOLD, color: 'text.primary', mb: 1 }}>
                    {language.name}
                  </Typography>
                  {language.native && language.native !== language.name && (
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1, fontStyle: 'italic' }}>
                      Native: {language.native}
                    </Typography>
                  )}
                  <Chip
                    label={language.rtl ? 'Right-to-Left' : 'Left-to-Right'}
                    size="small"
                    sx={{
                      fontSize: FONT_SIZES.XS,
                      background: language.rtl ? 'rgba(255, 152, 0, 0.1)' : 'rgba(76, 175, 80, 0.1)',
                      color: language.rtl ? 'warning.main' : 'success.main',
                      border: BORDER.SOLID_1,
                      borderColor: language.rtl ? 'warning.main' : 'success.main',
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </Paper>
    </Container>
  );
}; 