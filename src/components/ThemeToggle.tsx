import React from 'react';
import { IconButton, Tooltip, Box } from '@mui/material';
import { LightMode as LightModeIcon, DarkMode as DarkModeIcon } from '@mui/icons-material';

interface ThemeToggleProps {
  isDarkMode: boolean;
  onToggle: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDarkMode, onToggle }) => {
  return (
    <Box sx={{ position: 'fixed', top: 20, right: 20, zIndex: 1001 }}>
      <Tooltip title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
        <IconButton
          onClick={onToggle}
          sx={{
            bgcolor: 'background.paper',
            border: 1,
            borderColor: 'divider',
            '&:hover': {
              bgcolor: 'action.hover',
            },
            boxShadow: 2,
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
    </Box>
  );
}; 