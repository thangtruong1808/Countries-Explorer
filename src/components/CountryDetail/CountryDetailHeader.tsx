import { Box, DialogTitle, IconButton, Typography } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import React from 'react';
import type { Country } from '../../types';
import { getFlagUrl } from '../../utils/flagUtils';

interface CountryDetailHeaderProps {
  country: Country;
  onClose: () => void;
}

/**
 * Header component for the CountryDetail modal with flag, country name, and close button.
 */
export const CountryDetailHeader: React.FC<CountryDetailHeaderProps> = ({
  country,
  onClose
}) => {
  return (
    <DialogTitle sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      pb: 1,
      borderBottom: '1px solid',
      borderColor: 'divider',
      background: 'linear-gradient(135deg, rgba(100, 108, 255, 0.05) 0%, rgba(83, 91, 242, 0.05) 100%)',
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box
          component="img"
          src={getFlagUrl(country.code)}
          alt={`Flag of ${country.name}`}
          sx={{
            width: 60,
            height: 40,
            borderRadius: 2,
            border: '2px solid',
            borderColor: 'divider',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          }}
        />
        <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary' }}>
          {country.name}
        </Typography>
      </Box>
      <IconButton
        onClick={onClose}
        sx={{
          color: 'text.secondary',
          '&:hover': {
            color: 'text.primary',
            background: 'action.hover',
          }
        }}
      >
        <CloseIcon />
      </IconButton>
    </DialogTitle>
  );
}; 