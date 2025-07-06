import { ExpandMore as ExpandMoreIcon, TrendingUp as TrendingUpIcon } from '@mui/icons-material';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import React from 'react';
import { BACKGROUND_COLORS } from '../utils/colorUtils';
import { BORDER, BORDER_RADIUS, SPACING } from '../utils/styleUtils';
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
        mt: SPACING.XL,
        textAlign: 'center',
        py: SPACING.LG,
        px: SPACING.LG,
        borderRadius: BORDER_RADIUS.LARGE,
        background: (theme) => theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, rgba(76,175,80,0.08) 0%, rgba(76,175,80,0.04) 100%)'
          : 'linear-gradient(135deg, rgba(76,175,80,0.05) 0%, rgba(76,175,80,0.02) 100%)',
        border: BORDER.SOLID_1,
        borderColor: 'success.main',
        mx: 'auto',
        maxWidth: 400,
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: 'linear-gradient(90deg, #4caf50 0%, #66bb6a 100%)'
        }} />
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
          <TrendingUpIcon sx={{
            color: 'success.main',
            mr: 1,
            fontSize: 20,
            filter: 'drop-shadow(0 1px 2px rgba(76,175,80,0.3))'
          }} />
          <Typography variant="h6" sx={{
            color: 'success.main',
            fontWeight: FONT_WEIGHTS.BOLD,
            fontSize: FONT_SIZES.LG
          }}>
            All Countries Loaded
          </Typography>
        </Box>
        <Typography variant="body2" sx={{
          color: 'text.secondary',
          fontSize: FONT_SIZES.MD,
          fontWeight: FONT_WEIGHTS.MEDIUM
        }}>
          {/* All {totalAvailable} {totalAvailable === 1 ? 'country' : 'countries'} have been loaded successfully */}
          {totalAvailable === 1 ? `Only ${totalAvailable} country has been loaded 
          successfully` : `All ${totalAvailable} countries have been loaded 
          successfully`}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      py: SPACING.XL,
      gap: 2
    }}>
      {/* Progress indicator */}
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        mb: 1
      }}>

        <Box sx={{
          width: `${(totalLoaded / totalAvailable) * 100}%`,
          height: '100%',
          background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)',
          borderRadius: 2,
          transition: 'width 0.3s ease-in-out'
        }} />
      </Box>

      {/* Load More Button */}
      <Button
        variant="contained"
        onClick={onLoadMore}
        disabled={isLoading}
        startIcon={
          isLoading ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            <ExpandMoreIcon sx={{ fontSize: 20 }} />
          )
        }
        sx={{
          px: SPACING.MD,
          py: SPACING.MD,
          borderRadius: BORDER_RADIUS.LARGE,
          background: (theme) => theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)'
            : 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
          color: 'white',
          fontSize: FONT_SIZES.LG,
          fontWeight: FONT_WEIGHTS.BOLD,
          textTransform: 'none',
          minWidth: 160,
          height: 45,
          boxShadow: (theme) => theme.palette.mode === 'dark'
            ? '0 4px 20px rgba(25,118,210,0.4)'
            : '0 4px 20px rgba(25,118,210,0.3)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
            transition: 'left 0.5s ease-in-out'
          },
          '&:hover': {
            transform: 'translateY(-2px) scale(1.02)',
            boxShadow: (theme) => theme.palette.mode === 'dark'
              ? '0 8px 30px rgba(25,118,210,0.5)'
              : '0 8px 30px rgba(25,118,210,0.4)',
            background: (theme) => theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, #1565c0 0%, #1976d2 100%)'
              : 'linear-gradient(135deg, #1565c0 0%, #1976d2 100%)',
            '&::before': {
              left: '100%'
            }
          },
          '&:active': {
            transform: 'translateY(0) scale(0.98)',
            transition: 'all 0.1s ease-in-out'
          },
          '&:disabled': {
            background: BACKGROUND_COLORS.DEFAULT,
            color: 'text.disabled',
            boxShadow: 'none',
            transform: 'none',
            '&::before': {
              display: 'none'
            }
          },
          '& .MuiButton-startIcon': {
            mr: 1
          }
        }}
      >
        {isLoading ? 'Loading Countries...' : `Load More`}
      </Button>

      {/* Additional info */}
      <Typography variant="caption" sx={{
        color: 'text.secondary',
        fontSize: FONT_SIZES.SM,
        textAlign: 'center',
        maxWidth: 300
      }}>
        {isLoading ? 'Fetching more countries...' : `${totalAvailable - totalLoaded} countries remaining`}
      </Typography>
    </Box>
  );
}; 