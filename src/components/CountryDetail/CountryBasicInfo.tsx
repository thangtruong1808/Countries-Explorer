import { Box, Paper, Typography } from '@mui/material';
import { Flag as FlagIcon, LocationOn as LocationIcon } from '@mui/icons-material';
import React from 'react';
import type { Country } from '../../types';
import { ICON_STYLES } from '../../utils/styleUtils';

interface CountryBasicInfoProps {
  country: Country;
}

/**
 * Displays basic country information including capital and country code.
 */
export const CountryBasicInfo: React.FC<CountryBasicInfoProps> = ({ country }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        background: 'background.default',
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
        Basic Information
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3 }}>
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <LocationIcon sx={ICON_STYLES.PRIMARY} />
            <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
              Capital:
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 600 }}>
            {country.capital || 'N/A'}
          </Typography>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <FlagIcon sx={ICON_STYLES.PRIMARY} />
            <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
              Country Code:
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 600 }}>
            {country.code}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}; 