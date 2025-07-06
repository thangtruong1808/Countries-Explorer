import React from 'react';
import { TextField, Box, InputAdornment, IconButton } from '@mui/material';
import { Clear as ClearIcon, Search as SearchIcon } from '@mui/icons-material';
import { SEARCH_PLACEHOLDER } from '../constants';
import { BORDER_RADIUS } from '../utils/styleConstants';
import { ICON_STYLES, ICON_BUTTON_STYLES } from '../utils/iconStyles';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  const handleClear = () => {
    onSearchChange('');
  };

  return (
    <Box sx={{ width: '100%' }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder={SEARCH_PLACEHOLDER}
        value={searchTerm}
        onChange={handleChange}
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ ...ICON_STYLES.SECONDARY, fontSize: 20 }} />
            </InputAdornment>
          ),
          endAdornment: searchTerm && (
            <InputAdornment position="end">
              <IconButton
                onClick={handleClear}
                edge="end"
                size="small"
                aria-label="clear search"
                sx={{ ...ICON_BUTTON_STYLES.CLEAR, padding: 0.5 }}
              >
                <ClearIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: BORDER_RADIUS.SMALL,
            height: 40,
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'primary.main',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'primary.main',
              borderWidth: 2,
            },
          },
          '& .MuiInputBase-input': {
            padding: '8px 12px',
            fontSize: '0.9rem',
          },
        }}
      />
    </Box>
  );
}; 