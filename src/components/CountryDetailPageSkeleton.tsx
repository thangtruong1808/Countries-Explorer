import {
  Box,
  Container,
  Paper,
  Skeleton
} from '@mui/material';
import React from 'react';
import { BACKGROUND_COLORS, BORDER_COLORS } from '../utils/colorUtils';
import { BORDER, BORDER_RADIUS, SPACING } from '../utils/styleUtils';
import { NavBar } from './NavBar';

interface CountryDetailPageSkeletonProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onFiltersToggle?: () => void;
}

/**
 * Skeleton component that mimics the CountryDetailPage layout structure.
 */
export const CountryDetailPageSkeleton: React.FC<CountryDetailPageSkeletonProps> = ({
  currentTab,
  onTabChange,
  isDarkMode,
  onToggleTheme,
  onFiltersToggle
}) => {
  return (
    <>
      <NavBar
        currentTab={currentTab}
        onTabChange={onTabChange}
        isDarkMode={isDarkMode}
        onToggleTheme={onToggleTheme}
        onFiltersToggle={onFiltersToggle}
      />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Country Header Skeleton */}
        <Paper
          elevation={0}
          sx={{
            p: SPACING.XL,
            mb: SPACING.XL,
            borderRadius: BORDER_RADIUS.LARGE,
            border: BORDER.SOLID_1,
            borderColor: BORDER_COLORS.DIVIDER,
            background: BACKGROUND_COLORS.PAPER
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: SPACING.LG, mb: SPACING.LG }}>
            {/* Flag Skeleton */}
            <Skeleton
              variant="rounded"
              width={220}
              height={140}
              sx={{
                borderRadius: BORDER_RADIUS.MEDIUM,
                flexShrink: 0,
                width: { xs: 140, sm: 180, md: 220 },
                height: { xs: 90, sm: 120, md: 140 }
              }}
            />
            <Box sx={{ flex: 1 }}>
              {/* Country Name Skeleton */}
              <Skeleton
                variant="text"
                width="80%"
                height={40}
                sx={{ mb: 1 }}
              />
              {/* Emoji Skeleton */}
              <Skeleton
                variant="text"
                width="40%"
                height={32}
              />
            </Box>
          </Box>

          {/* Description Skeleton */}
          <Box sx={{ mb: SPACING.LG }}>
            <Skeleton variant="text" width="100%" height={20} sx={{ mb: 1 }} />
            <Skeleton variant="text" width="95%" height={20} sx={{ mb: 1 }} />
            <Skeleton variant="text" width="90%" height={20} sx={{ mb: 1 }} />
            <Skeleton variant="text" width="85%" height={20} />
          </Box>
        </Paper>

        {/* Country Details and Map Section Skeleton */}
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
          gap: SPACING.LG,
          mb: SPACING.LG,
          minHeight: { lg: 600 }
        }}>
          {/* Country Details Skeleton */}
          <Paper
            elevation={0}
            sx={{
              p: SPACING.LG,
              borderRadius: BORDER_RADIUS.LARGE,
              border: BORDER.SOLID_1,
              borderColor: BORDER_COLORS.DIVIDER,
              background: BACKGROUND_COLORS.PAPER,
              flex: { lg: '0 0 400px' },
              minHeight: { lg: 600 },
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            }}
          >
            {/* Information Title Skeleton */}
            <Skeleton
              variant="text"
              width="60%"
              height={40}
              sx={{
                mb: SPACING.LG,
                mx: 'auto',
                pb: SPACING.MD
              }}
            />

            <Box sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: '1fr' },
              gap: SPACING.MD,
              flex: 1,
              overflow: 'auto',
              pr: { lg: SPACING.SM },
              pt: SPACING.SM,
              pb: SPACING.SM,
              alignContent: 'start'
            }}>
              {/* Information Cards Skeleton */}
              {Array.from({ length: 6 }).map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: SPACING.MD,
                    p: SPACING.MD,
                    borderRadius: BORDER_RADIUS.MEDIUM,
                    background: BACKGROUND_COLORS.HOVER,
                    border: BORDER.SOLID_1,
                    borderColor: BORDER_COLORS.DIVIDER,
                    minHeight: 80,
                  }}
                >
                  {/* Icon Skeleton */}
                  <Skeleton
                    variant="rounded"
                    width={48}
                    height={48}
                    sx={{
                      borderRadius: BORDER_RADIUS.MEDIUM,
                      flexShrink: 0
                    }}
                  />
                  <Box sx={{ flex: 1 }}>
                    {/* Label Skeleton */}
                    <Skeleton
                      variant="text"
                      width="60%"
                      height={16}
                      sx={{ mb: 0.5 }}
                    />
                    {/* Value Skeleton */}
                    <Skeleton
                      variant="text"
                      width="80%"
                      height={20}
                    />
                  </Box>
                </Box>
              ))}
            </Box>
          </Paper>

          {/* Map Section Skeleton */}
          <Paper
            elevation={0}
            sx={{
              p: SPACING.LG,
              borderRadius: BORDER_RADIUS.LARGE,
              border: BORDER.SOLID_1,
              borderColor: BORDER_COLORS.DIVIDER,
              background: BACKGROUND_COLORS.PAPER,
              flex: 1,
              minHeight: { lg: 600 },
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            }}
          >
            {/* Map Title Skeleton */}
            <Skeleton
              variant="text"
              width="50%"
              height={40}
              sx={{
                mb: SPACING.LG,
                mx: 'auto',
                pb: SPACING.MD
              }}
            />

            {/* Map Container Skeleton */}
            <Box
              sx={{
                width: '100%',
                flex: 1,
                borderRadius: BORDER_RADIUS.MEDIUM,
                overflow: 'hidden',
                border: BORDER.SOLID_1,
                borderColor: BORDER_COLORS.DIVIDER,
                position: 'relative',
                background: BACKGROUND_COLORS.PAPER,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              }}
            >
              <Skeleton
                variant="rectangular"
                width="100%"
                height="100%"
                sx={{ minHeight: 400 }}
              />
            </Box>

            {/* Map Caption Skeleton */}
            <Skeleton
              variant="text"
              width="70%"
              height={16}
              sx={{
                mt: SPACING.SM,
                mx: 'auto'
              }}
            />
          </Paper>
        </Box>
      </Container>

      {/* Back Button Skeleton */}
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            mt: SPACING.SM,
            mb: SPACING.LG
          }}
        >
          <Skeleton
            variant="rounded"
            width={160}
            height={48}
            sx={{ borderRadius: BORDER_RADIUS.MEDIUM }}
          />
        </Box>
      </Container>
    </>
  );
}; 