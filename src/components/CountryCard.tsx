import React from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { LocationOn as LocationIcon } from '@mui/icons-material';
import type { Country } from '../types';
import { getFlagUrl } from '../utils/flagUtils';
import { PRIMARY_COLORS, BACKGROUND_COLORS, BORDER_COLORS } from '../utils/colorUtils';
import { BORDER_RADIUS, SPACING, TRANSITIONS, TRANSFORMS, CURSORS } from '../utils/styleUtils';
import { FONT_WEIGHTS } from '../utils/typographyUtils';

interface CountryCardProps {
  country: Country;
  onClick?: (country: Country) => void;
}

export const CountryCard: React.FC<CountryCardProps> = ({ country, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(country);
    }
  };

  return (
    <Card
      onClick={handleClick}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        borderRadius: BORDER_RADIUS.LARGE,
        border: 'none',
        background: 'background.paper',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.1)',
        position: 'relative',
        overflow: 'hidden',
        cursor: CURSORS.POINTER,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #646cff 0%, #535bf2 100%)',
          opacity: 0,
          transition: 'opacity 0.3s ease',
        },
        '&:hover': {
          transform: 'translateY(-8px) scale(1.02)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15), 0 8px 16px rgba(0, 0, 0, 0.1)',
          '&::before': {
            opacity: 1,
          },
          '& .flag-container': {
            transform: 'scale(1.08)',
          },
          '& .country-name': {
            color: 'primary.main',
          },
        },
      }}
      data-testid={`country-card-${country.code}`}
    >
      <CardContent sx={{
        textAlign: 'center',
        flexGrow: 1,
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        zIndex: 1,
      }}>
        <Box>
          <Box
            className="flag-container"
            sx={{
              mb: 2.5,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              p: 1,
            }}
          >
            <Box
              component="img"
              src={getFlagUrl(country.code)}
              alt={`Flag of ${country.name}`}
              sx={{
                width: '100%',
                maxWidth: 110,
                height: 75,
                borderRadius: BORDER_RADIUS.LARGE,
                border: '3px solid',
                borderColor: 'divider',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15), 0 2px 8px rgba(0, 0, 0, 0.1)',
                objectFit: 'cover',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15))',
                '&:hover': {
                  filter: 'drop-shadow(0 6px 20px rgba(0, 0, 0, 0.25)) brightness(1.05)',
                },
              }}
            />
          </Box>

          <Typography
            variant="h6"
            component="h2"
            className="country-name"
            sx={{
              mb: 1.5,
              fontWeight: FONT_WEIGHTS.BOLD,
              color: 'text.primary',
              lineHeight: 1.3,
              fontSize: '1.1rem',
              transition: 'color 0.3s ease',
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
              wordBreak: 'break-word',
              hyphens: 'auto',
            }}
          >
            {country.name}
          </Typography>

          <Chip
            label={country.continent.name}
            size="small"
            sx={{
              mb: 2.5,
              fontWeight: FONT_WEIGHTS.SEMIBOLD,
              textTransform: 'uppercase',
              letterSpacing: 0.8,
              fontSize: '0.7rem',
              height: 22,
              background: PRIMARY_COLORS.LIGHT,
              color: 'primary.main',
              border: '1px solid',
              borderColor: 'primary.main',
              '&:hover': {
                background: PRIMARY_COLORS.MEDIUM,
                color: 'primary.main',
              },
            }}
          />
        </Box>

        {/* Essential Information - Capital Only */}
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          justifyContent: 'center',
          p: 1.5,
          borderRadius: BORDER_RADIUS.MEDIUM,
          background: BACKGROUND_COLORS.HOVER,
          border: '1px solid',
          borderColor: BORDER_COLORS.DIVIDER,
          transition: TRANSITIONS.SLOW,
          '&:hover': {
            background: BACKGROUND_COLORS.SELECTED,
            transform: 'translateX(4px)',
          },
        }}>
          <LocationIcon sx={{
            fontSize: 18,
            color: 'primary.main',
            filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))',
          }} />
          <Typography variant="body2" sx={{
            color: 'text.secondary',
            fontWeight: FONT_WEIGHTS.MEDIUM,
            fontSize: '0.9rem',
          }}>
            <strong>Capital:</strong> {country.capital || 'N/A'}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}; 