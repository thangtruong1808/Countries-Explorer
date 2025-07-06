import { Box, Paper, Skeleton, Typography } from '@mui/material';
import { Info as InfoIcon } from '@mui/icons-material';
import React from 'react';
import type { Country } from '../../types';
import { ICON_STYLES } from '../../utils/styleUtils';

interface CountryDescriptionSectionProps {
  country: Country;
  description: string;
  loadingDescription: boolean;
}

/**
 * Displays the country description with loading skeleton.
 */
export const CountryDescriptionSection: React.FC<CountryDescriptionSectionProps> = ({
  country,
  description,
  loadingDescription
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        background: 'background.default',
        mb: 3,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <InfoIcon sx={ICON_STYLES.PRIMARY} />
        <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
          About {country.name}
        </Typography>
      </Box>

      {loadingDescription ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Skeleton variant="text" width="100%" height={20} />
          <Skeleton variant="text" width="90%" height={20} />
          <Skeleton variant="text" width="95%" height={20} />
          <Skeleton variant="text" width="85%" height={20} />
        </Box>
      ) : (
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            lineHeight: 1.7,
            fontSize: '0.95rem',
            textAlign: 'justify'
          }}
        >
          {description}
        </Typography>
      )}
    </Paper>
  );
}; 