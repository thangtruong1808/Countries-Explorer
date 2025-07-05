import React from 'react';
import { IconButton, Tooltip, Box } from '@mui/material';
import { LightMode as LightModeIcon, DarkMode as DarkModeIcon } from '@mui/icons-material';
import { BACKGROUND_COLORS, BORDER_COLORS } from '../utils/colorUtils';
import { BORDER, BOX_SHADOWS } from '../utils/styleUtils';

interface ThemeToggleProps {
  isDarkMode: boolean;
  onToggle: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDarkMode, onToggle }) => {
  return (
    <Tooltip title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
      <IconButton
        onClick={onToggle}
        sx={{
          bgcolor: BACKGROUND_COLORS.PAPER,
          border: BORDER.SOLID_1,
          borderColor: BORDER_COLORS.DIVIDER,
          '&:hover': {
            bgcolor: BACKGROUND_COLORS.HOVER,
          },
          boxShadow: BOX_SHADOWS.MATERIAL_2,
        }}
        aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {isDarkMode ? (
          <LightModeIcon sx={{ color: 'warning.main' }} />
        ) : (
          <DarkModeIcon sx={{ color: 'primary.main' }} />
        )}
      </IconButton>
    </Tooltip>
  );
}; 