import { Box, Chip } from '@mui/material';
import React from 'react';
import { BORDER } from '../../utils/styleUtils';
import { FONT_WEIGHTS } from '../../utils/typographyUtils';

interface ExpandableChipsProps {
  items: string[];
  isExpanded: boolean;
  onToggleExpanded: () => void;
  color: 'secondary' | 'warning' | 'success';
  maxVisible: number;
}

export const ExpandableChips: React.FC<ExpandableChipsProps> = ({
  items,
  isExpanded,
  onToggleExpanded,
  color,
  maxVisible
}) => {
  const getChipStyles = (isToggleButton: boolean = false) => {
    const baseStyles = {
      fontSize: '0.65rem',
      height: 20,
      fontWeight: FONT_WEIGHTS.MEDIUM,
      border: BORDER.SOLID_1,
      transition: 'all 0.2s ease',
      '&:hover': {
        transform: 'scale(1.05)'
      }
    };

    if (isToggleButton) {
      return {
        ...baseStyles,
        background: `linear-gradient(135deg, rgba(76,175,80,0.1) 0%, rgba(76,175,80,0.05) 100%)`,
        color: 'success.main',
        borderColor: 'success.main',
        cursor: 'pointer',
        '&:hover': {
          ...baseStyles['&:hover'],
          background: 'linear-gradient(135deg, rgba(76,175,80,0.2) 0%, rgba(76,175,80,0.1) 100%)',
          boxShadow: '0 2px 8px rgba(76,175,80,0.3)'
        }
      };
    }

    return {
      ...baseStyles,
      background: `linear-gradient(135deg, rgba(${color === 'secondary' ? '156,39,176' : '255,152,0'},0.1) 0%, rgba(${color === 'secondary' ? '156,39,176' : '255,152,0'},0.05) 100%)`,
      color: `${color}.main`,
      borderColor: `${color}.main`,
      '&:hover': {
        ...baseStyles['&:hover'],
        background: `linear-gradient(135deg, rgba(${color === 'secondary' ? '156,39,176' : '255,152,0'},0.2) 0%, rgba(${color === 'secondary' ? '156,39,176' : '255,152,0'},0.1) 100%)`
      }
    };
  };

  const visibleItems = isExpanded ? items : items.slice(0, maxVisible);
  const hasMore = items.length > maxVisible;

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.25 }}>
      {visibleItems.map((item, index) => (
        <Chip
          key={index}
          label={item}
          size="small"
          sx={getChipStyles()}
        />
      ))}
      {hasMore && (
        <Chip
          label={isExpanded ? 'Show Less' : `+${items.length - maxVisible}`}
          size="small"
          onClick={onToggleExpanded}
          sx={getChipStyles(true)}
        />
      )}
    </Box>
  );
}; 