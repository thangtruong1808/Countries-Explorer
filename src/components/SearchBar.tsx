import React from 'react';
import { TextField, Box, InputAdornment, IconButton } from '@mui/material';
import { Clear as ClearIcon } from '@mui/icons-material';
import { SEARCH_PLACEHOLDER } from '../constants';

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
        size="medium"
        InputProps={{
          endAdornment: searchTerm && (
            <InputAdornment position="end">
              <IconButton
                onClick={handleClear}
                edge="end"
                size="small"
                aria-label="clear search"
              >
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}; 