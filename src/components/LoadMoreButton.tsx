import React from 'react';
import { Button, Box, CircularProgress } from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { PRIMARY_COLORS, BACKGROUND_COLORS, BORDER_COLORS } from '../utils/colorUtils';
import { SPACING, BORDER_RADIUS, TRANSITIONS, TRANSFORMS, BORDER } from '../utils/styleUtils';
import { FONT_SIZES, FONT_WEIGHTS } from '../utils/typographyUtils';

interface LoadMoreButtonProps {
  onLoadMore: () => void;
  isLoading: boolean;
  hasMore: boolean;
  totalLoaded: number;
  totalAvailable: number;
}

export const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({
  onLoadMore,
  isLoading,
  hasMore,
  totalLoaded,
  totalAvailable
}) => {
  if (!hasMore) {
    return (
      <Box sx={{
        textAlign: 'center',
        py: SPACING.LG,
        color: 'text.secondary',
        fontSize: FONT_SIZES.MD,
        fontWeight: FONT_WEIGHTS.MEDIUM
      }}>
        All {totalAvailable} countries have been loaded
      </Box>
    );
  }

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      py: SPACING.XL
    }}>
      <Button
        variant="outlined"
        onClick={onLoadMore}
        disabled={isLoading}
        startIcon={
          isLoading ? (
            <CircularProgress size={20} color="primary" />
          ) : (
            <ExpandMoreIcon />
          )
        }
        sx={{
          px: SPACING.XL,
          py: SPACING.LG,
          borderRadius: BORDER_RADIUS.LARGE,
          border: BORDER.SOLID_2,
          borderColor: 'primary.main',
          color: 'primary.main',
          background: BACKGROUND_COLORS.PAPER,
          fontSize: FONT_SIZES.XL,
          fontWeight: FONT_WEIGHTS.BOLD,
          textTransform: 'none',
          minWidth: 180,
          height: 56,
          transition: TRANSITIONS.NORMAL,
          '&:hover': {
            background: PRIMARY_COLORS.LIGHT,
            borderColor: 'primary.dark',
            transform: TRANSFORMS.HOVER_LIFT,
            boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
          },
          '&:disabled': {
            borderColor: BORDER_COLORS.DIVIDER,
            color: 'text.disabled',
            background: BACKGROUND_COLORS.DEFAULT,
          },
        }}
      >
        {isLoading ? 'Loading...' : 'Load More'}
      </Button>
    </Box>
  );
}; 