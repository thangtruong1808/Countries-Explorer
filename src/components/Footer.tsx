import React from 'react';
import { Box, Container, Typography, Link, Divider } from '@mui/material';
import { GitHub as GitHubIcon, Language as LanguageIcon } from '@mui/icons-material';
import { BACKGROUND_COLORS, BORDER_COLORS, TEXT_COLORS } from '../utils/colorUtils';
import { BORDER } from '../utils/styleUtils';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: BACKGROUND_COLORS.PAPER,
        borderTop: BORDER.SOLID_1,
        borderColor: BORDER_COLORS.DIVIDER,
        mt: 'auto',
        py: 4
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'center', md: 'flex-start' },
          gap: 3
        }}>
          {/* Left Section - App Info */}
          <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: 'primary.main',
                mb: 1,
                fontSize: '1.25rem'
              }}
            >
              🌍 Countries Explorer
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                maxWidth: 300,
                fontSize: '0.9rem',
                lineHeight: 1.6
              }}
            >
              Discover countries around the world with detailed information about continents,
              flags, and more. Built with React, TypeScript, and Material UI.
            </Typography>
          </Box>

          {/* Center Section - Quick Links */}
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: { xs: 'center', md: 'flex-start' },
            gap: 1
          }}>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 600,
                color: 'text.primary',
                mb: 1,
                fontSize: '0.95rem'
              }}
            >
              Quick Links
            </Typography>
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                color: 'text.secondary',
                textDecoration: 'none',
                '&:hover': {
                  color: 'primary.main'
                }
              }}
            >
              <GitHubIcon sx={{ fontSize: 16 }} />
              GitHub
            </Link>
            <Link
              href="https://react.dev"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                color: 'text.secondary',
                textDecoration: 'none',
                '&:hover': {
                  color: 'primary.main'
                }
              }}
            >
              <LanguageIcon sx={{ fontSize: 16 }} />
              React Documentation
            </Link>
          </Box>

          {/* Right Section - Technologies */}
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: { xs: 'center', md: 'flex-end' },
            gap: 1
          }}>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 600,
                color: 'text.primary',
                mb: 1,
                fontSize: '0.95rem'
              }}
            >
              Built With
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                textAlign: { xs: 'center', md: 'right' },
                fontSize: '0.9rem'
              }}
            >
              React • TypeScript • Material UI
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                textAlign: { xs: 'center', md: 'right' },
                fontSize: '0.9rem'
              }}
            >
              Apollo Client • GraphQL
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Bottom Section - Copyright */}
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2
        }}>
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              textAlign: { xs: 'center', sm: 'left' },
              fontSize: '0.875rem'
            }}
          >
            © {currentYear} Countries Explorer. All rights reserved.
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              textAlign: { xs: 'center', sm: 'right' },
              fontSize: '0.875rem'
            }}
          >
            Made with ❤️ for learning and exploration
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}; 