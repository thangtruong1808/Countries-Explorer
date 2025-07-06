import {
  Box,
  Card,
  CardContent,
  Container,
  Paper,
  Skeleton
} from '@mui/material';
import React from 'react';
import { RESPONSIVE_LAYOUT } from '../utils/layoutUtils';

/**
 * Skeleton component that mimics the HomePage layout structure.
 */
export const LoadingSpinner: React.FC = () => {
  return (
    <Box sx={RESPONSIVE_LAYOUT.FULL_HEIGHT_CONTAINER}>
      {/* NavBar Skeleton */}
      <Box sx={{
        borderBottom: 1,
        borderColor: 'divider',
        bgcolor: 'background.paper',
        position: 'sticky',
        top: 0,
        zIndex: 1100
      }}>
        <Container maxWidth="xl">
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            py: 2,
            gap: 2
          }}>
            {/* Logo/Title */}
            <Skeleton variant="text" width={200} height={32} />

            {/* Navigation Tabs */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} variant="rounded" width={80} height={36} />
              ))}
            </Box>

            {/* Theme Toggle */}
            <Skeleton variant="circular" width={40} height={40} />
          </Box>
        </Container>
      </Box>

      {/* Main Content */}
      <Box sx={RESPONSIVE_LAYOUT.FLEX_GROW_CONTAINER}>
        <Container maxWidth="xl" sx={{ py: 3 }}>
          {/* Search and Filter Section Skeleton */}
          <Paper
            elevation={0}
            sx={{
              p: 2,
              mb: 2,
              borderRadius: 3,
              border: 1,
              borderColor: 'divider',
              bgcolor: 'background.paper'
            }}
          >
            <Skeleton variant="text" width={180} height={32} sx={{ mb: 2 }} />
            <Skeleton variant="rounded" width="100%" height={56} sx={{ mb: 2 }} />
            <Skeleton variant="text" width={300} height={20} />
          </Paper>

          {/* Results Header Skeleton */}
          <Box sx={{
            mb: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2
          }}>
            <Skeleton variant="text" width={120} height={32} />
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Skeleton variant="rounded" width={100} height={28} />
              <Skeleton variant="rounded" width={120} height={28} />
            </Box>
          </Box>

          {/* Country Grid Skeleton */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(auto-fit, minmax(280px, 1fr))',
                sm: 'repeat(auto-fit, minmax(300px, 1fr))',
                md: 'repeat(3, 1fr)',
                lg: 'repeat(4, 1fr)',
                xl: 'repeat(5, 1fr)'
              },
              gap: 3,
              width: '100%'
            }}
          >
            {Array.from({ length: 12 }).map((_, index) => (
              <Box key={index}>
                <Card
                  sx={{
                    height: 280,
                    borderRadius: 3,
                    border: 1,
                    borderColor: 'divider',
                    bgcolor: 'background.paper',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 4
                    }
                  }}
                >
                  <CardContent sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    {/* Flag Skeleton */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Skeleton variant="rounded" width={60} height={40} sx={{ mr: 2 }} />
                      <Box sx={{ flex: 1 }}>
                        <Skeleton variant="text" width="80%" height={24} />
                        <Skeleton variant="text" width="60%" height={16} />
                      </Box>
                    </Box>

                    {/* Country Info Skeleton */}
                    <Box sx={{ flex: 1 }}>
                      <Skeleton variant="text" width="90%" height={16} sx={{ mb: 1 }} />
                      <Skeleton variant="text" width="70%" height={16} sx={{ mb: 1 }} />
                      <Skeleton variant="text" width="85%" height={16} sx={{ mb: 1 }} />
                      <Skeleton variant="text" width="60%" height={16} />
                    </Box>

                    {/* Tags Skeleton */}
                    <Box sx={{ display: 'flex', gap: 0.5, mt: 2 }}>
                      <Skeleton variant="rounded" width={60} height={24} />
                      <Skeleton variant="rounded" width={50} height={24} />
                      <Skeleton variant="rounded" width={70} height={24} />
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>

          {/* Load More Button Skeleton */}
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Skeleton variant="rounded" width={120} height={40} sx={{ mx: 'auto' }} />
          </Box>
        </Container>
      </Box>
    </Box>
  );
}; 