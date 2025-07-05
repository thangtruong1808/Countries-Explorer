import React from 'react';
import { FormGroup, FormControlLabel, Checkbox, Box, Typography, Chip } from '@mui/material';
import type { Continent } from '../types';

interface ContinentFilterProps {
  continents: Continent[];
  selectedContinents: string[]; // Array of selected continent codes
  onContinentToggle: (code: string) => void;
}

export const ContinentFilter: React.FC<ContinentFilterProps> = ({
  continents,
  selectedContinents,
  onContinentToggle
}) => {
  // Handle checkbox toggle for continent selection
  const handleToggle = (code: string) => {
    onContinentToggle(code);
  };

  return (
    <Box>
      <Typography
        variant="body2"
        sx={{
          mb: 2,
          color: 'text.secondary',
          fontWeight: 600,
          fontSize: '0.95rem'
        }}
      >
        Filter by continent
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {continents.map((continent) => (
          <Chip
            key={continent.code}
            label={continent.name}
            onClick={() => handleToggle(continent.code)}
            variant={selectedContinents.includes(continent.code) ? "filled" : "outlined"}
            color={selectedContinents.includes(continent.code) ? "primary" : "default"}
            sx={{
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: selectedContinents.includes(continent.code)
                  ? 'primary.main'
                  : 'grey.100'
              }
            }}
          />
        ))}
      </Box>
    </Box>
  );
}; 