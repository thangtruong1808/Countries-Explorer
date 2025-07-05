import { Email as EmailIcon, GitHub as GitHubIcon, Language as LanguageIcon } from '@mui/icons-material';
import { Avatar, Box, Container, Divider, Link, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import thangTruongImage from '../assets/thang-truong.jpg';
import { APP_TITLE } from '../constants';
import { BACKGROUND_COLORS, BORDER_COLORS } from '../utils/colorUtils';
import { BORDER, SPACING, TRANSFORMS, TRANSITIONS } from '../utils/styleUtils';
import { FONT_SIZES, FONT_WEIGHTS } from '../utils/typographyUtils';
import { createTitleClickHandler, NAVIGATION_STYLES } from '../utils/navigationUtils';

export const Footer: React.FC = () => {
  const navigate = useNavigate();

  const handleTitleClick = createTitleClickHandler(navigate);

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
          gap: { xs: 4, md: 3 },
          py: SPACING.LG
        }}>
          {/* Left Section - App Info */}
          <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Typography
              variant="h6"
              onClick={handleTitleClick}
              sx={{
                fontWeight: FONT_WEIGHTS.BOLD,
                color: 'primary.main',
                mb: SPACING.MD,
                fontSize: { xs: '1.1rem', sm: '1.25rem' },
                ...NAVIGATION_STYLES.CLICKABLE_TITLE
              }}
            >
              {APP_TITLE}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                maxWidth: 300,
                fontSize: FONT_SIZES.SM,
                lineHeight: 1.6,
                fontWeight: FONT_WEIGHTS.NORMAL
              }}
            >
              Discover countries around the world with detailed information about continents,
              flags, and more. Built with modern web technologies.
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
                fontWeight: FONT_WEIGHTS.SEMIBOLD,
                color: 'text.primary',
                mb: SPACING.MD,
                fontSize: { xs: '0.9rem', sm: '0.95rem' }
              }}
            >
              Quick Links
            </Typography>
            <Link
              href="https://github.com/thangtruong1808/Countries-Explorer"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                color: 'text.secondary',
                textDecoration: 'none',
                fontSize: FONT_SIZES.SM,
                fontWeight: FONT_WEIGHTS.MEDIUM,
                transition: TRANSITIONS.NORMAL,
                '&:hover': {
                  color: 'primary.main',
                  transform: TRANSFORMS.HOVER_LIFT
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
                fontSize: FONT_SIZES.SM,
                fontWeight: FONT_WEIGHTS.MEDIUM,
                transition: TRANSITIONS.NORMAL,
                '&:hover': {
                  color: 'primary.main',
                  transform: TRANSFORMS.HOVER_LIFT
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
                fontWeight: FONT_WEIGHTS.SEMIBOLD,
                color: 'text.primary',
                mb: SPACING.MD,
                fontSize: { xs: '0.9rem', sm: '0.95rem' }
              }}
            >
              Built With
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                textAlign: { xs: 'center', md: 'right' },
                fontSize: FONT_SIZES.SM,
                fontWeight: FONT_WEIGHTS.MEDIUM
              }}
            >
              React 19.1.0 • TypeScript 5.8.3
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                textAlign: { xs: 'center', md: 'right' },
                fontSize: FONT_SIZES.SM,
                fontWeight: FONT_WEIGHTS.MEDIUM
              }}
            >
              Material UI 7.2.0 • Apollo Client 3.13.8
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                textAlign: { xs: 'center', md: 'right' },
                fontSize: FONT_SIZES.SM,
                fontWeight: FONT_WEIGHTS.MEDIUM
              }}
            >
              GraphQL 16.11.0
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: SPACING.LG }} />

        {/* Bottom Section - Copyright */}
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: SPACING.MD,
          py: SPACING.MD
        }}>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: SPACING.MD,
            flexDirection: { xs: 'column', sm: 'row' }
          }}>
            <Avatar
              src={thangTruongImage}
              alt="Thang Truong"
              sx={{
                width: 40,
                height: 40,
                border: BORDER.SOLID_2,
                borderColor: 'primary.main',
                transition: TRANSITIONS.NORMAL,
                '&:hover': {
                  transform: TRANSFORMS.HOVER_LIFT,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                }
              }}
            />
            <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
              <Typography
                variant="body2"
                sx={{
                  color: 'text.primary',
                  fontWeight: FONT_WEIGHTS.MEDIUM,
                  fontSize: FONT_SIZES.MD,
                  mb: 0.5
                }}
              >
                Thang Truong
              </Typography>
              <Link
                href="mailto:thangtruong1808@gmail.com"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  color: 'text.secondary',
                  textDecoration: 'none',
                  fontSize: FONT_SIZES.SM,
                  transition: TRANSITIONS.NORMAL,
                  '&:hover': {
                    color: 'primary.main',
                    transform: TRANSFORMS.HOVER_LIFT
                  }
                }}
              >
                <EmailIcon sx={{ fontSize: 16 }} />
                thangtruong1808@gmail.com
              </Link>
            </Box>
          </Box>
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              textAlign: { xs: 'center', sm: 'right' },
              fontSize: FONT_SIZES.SM
            }}
          >
            Made with ❤️ for learning and exploration
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}; 