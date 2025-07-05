import React from 'react';
import { Card, CardContent, Typography, Box, Chip, Stack } from '@mui/material';
import { LocationOn as LocationIcon, Language as LanguageIcon, Phone as PhoneIcon, AttachMoney as CurrencyIcon } from '@mui/icons-material';
import type { Country } from '../types';

interface CountryCardProps {
  country: Country;
}

export const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
  // Format languages for display
  const formatLanguages = (languages: { name: string }[]) => {
    if (!languages || languages.length === 0) return 'N/A';
    return languages.map(lang => lang.name).join(', ');
  };

  // Build flag image URL using country code
  const getFlagUrl = (countryCode: string) => {
    return `https://flagcdn.com/${countryCode.toLowerCase()}.svg`;
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        borderRadius: 2,
        border: 1,
        borderColor: 'grey.200',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
          borderColor: 'primary.main'
        }
      }}
      data-testid={`country-card-${country.code}`}
    >
      <CardContent sx={{
        textAlign: 'center',
        flexGrow: 1,
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        <Box>
          <Box
            sx={{
              mb: 2,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Box
              component="img"
              src={getFlagUrl(country.code)}
              alt={`Flag of ${country.name}`}
              sx={{
                width: 80,
                height: 60,
                borderRadius: 1,
                border: '1px solid #e0e0e0',
                objectFit: 'cover'
              }}
            />
          </Box>
          <Typography
            variant="h6"
            component="h2"
            sx={{
              mb: 1,
              fontWeight: 700,
              color: 'text.primary',
              lineHeight: 1.4,
              fontSize: '1.125rem'
            }}
          >
            {country.name}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: 0.8,
              fontSize: '0.875rem',
              mb: 2
            }}
          >
            {country.continent.name}
          </Typography>
        </Box>

        <Stack spacing={1.5} sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
            <LocationIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
            <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500, fontSize: '0.9rem' }}>
              <strong>Capital:</strong> {country.capital || 'N/A'}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
            <CurrencyIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
            <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500, fontSize: '0.9rem' }}>
              <strong>Currency:</strong> {country.currency || 'N/A'}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
            <PhoneIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
            <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500, fontSize: '0.9rem' }}>
              <strong>Phone:</strong> +{country.phone || 'N/A'}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
            <LanguageIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                fontWeight: 500,
                fontSize: '0.9rem',
                maxWidth: '100%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
              title={formatLanguages(country.languages)}
            >
              <strong>Languages:</strong> {formatLanguages(country.languages)}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}; 