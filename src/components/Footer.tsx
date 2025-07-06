import { Email as EmailIcon, GitHub as GitHubIcon, Facebook as FacebookIcon, LinkedIn as LinkedInIcon } from '@mui/icons-material';
import { Avatar, Box, Container, Divider, Link, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import thangTruongImage from '../assets/thang-truong.jpg';
import { APP_TITLE } from '../constants';
import { BACKGROUND_COLORS, BORDER_COLORS } from '../utils/colorUtils';
import { BORDER, BORDER_RADIUS, SPACING, TRANSFORMS, TRANSITIONS } from '../utils/styleUtils';
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
        py: 2
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'center', md: 'flex-start' },
          gap: { xs: 2, md: 2 },
          py: SPACING.MD
        }}>
          {/* Left Section - App Info */}
          <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Typography
              variant="h6"
              onClick={handleTitleClick}
              sx={{
                fontWeight: FONT_WEIGHTS.BOLD,
                color: 'primary.main',
                mb: SPACING.SM,
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
                lineHeight: 1.5,
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
            gap: 0.5
          }}>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: FONT_WEIGHTS.SEMIBOLD,
                color: 'text.primary',
                mb: SPACING.SM,
                fontSize: { xs: '0.9rem', sm: '0.95rem' }
              }}
            >
              Quick Links
            </Typography>
            <Link
              href={import.meta.env.VITE_GITHUB_URL || "#"}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.75,
                color: 'text.secondary',
                textDecoration: 'none',
                fontSize: FONT_SIZES.SM,
                fontWeight: FONT_WEIGHTS.MEDIUM,
                padding: '8px 12px',
                borderRadius: BORDER_RADIUS.MEDIUM,
                background: 'transparent',
                border: BORDER.SOLID_1,
                borderColor: 'transparent',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  color: 'primary.main',
                  background: 'rgba(25, 118, 210, 0.08)',
                  borderColor: 'primary.main',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(25, 118, 210, 0.15)',
                  '& .MuiSvgIcon-root': {
                    transform: 'scale(1.1)',
                    filter: 'drop-shadow(0 2px 4px rgba(25, 118, 210, 0.3))'
                  }
                }
              }}
            >
              <GitHubIcon sx={{
                fontSize: 18,
                color: '#333',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }} />
              GitHub
            </Link>
            <Link
              href={import.meta.env.VITE_FB_URL || "#"}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.75,
                color: 'text.secondary',
                textDecoration: 'none',
                fontSize: FONT_SIZES.SM,
                fontWeight: FONT_WEIGHTS.MEDIUM,
                padding: '8px 12px',
                borderRadius: BORDER_RADIUS.MEDIUM,
                background: 'transparent',
                border: BORDER.SOLID_1,
                borderColor: 'transparent',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  color: '#1877f2',
                  background: 'rgba(24, 119, 242, 0.08)',
                  borderColor: '#1877f2',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(24, 119, 242, 0.15)',
                  '& .MuiSvgIcon-root': {
                    transform: 'scale(1.1)',
                    filter: 'drop-shadow(0 2px 4px rgba(24, 119, 242, 0.3))'
                  }
                }
              }}
            >
              <FacebookIcon sx={{
                fontSize: 18,
                color: '#1877f2',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }} />
              Facebook
            </Link>
            <Link
              href={import.meta.env.VITE_LINKEDIN_URL || import.meta.env.VITE_LinkedIn_URL || "#"}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.75,
                color: 'text.secondary',
                textDecoration: 'none',
                fontSize: FONT_SIZES.SM,
                fontWeight: FONT_WEIGHTS.MEDIUM,
                padding: '8px 12px',
                borderRadius: BORDER_RADIUS.MEDIUM,
                background: 'transparent',
                border: BORDER.SOLID_1,
                borderColor: 'transparent',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  color: '#0077b5',
                  background: 'rgba(0, 119, 181, 0.08)',
                  borderColor: '#0077b5',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(0, 119, 181, 0.15)',
                  '& .MuiSvgIcon-root': {
                    transform: 'scale(1.1)',
                    filter: 'drop-shadow(0 2px 4px rgba(0, 119, 181, 0.3))'
                  }
                }
              }}
            >
              <LinkedInIcon sx={{
                fontSize: 18,
                color: '#0077b5',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }} />
              LinkedIn
            </Link>
          </Box>

          {/* Right Section - Technologies */}
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: { xs: 'center', md: 'flex-end' },
            gap: 0.5
          }}>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: FONT_WEIGHTS.SEMIBOLD,
                color: 'text.primary',
                mb: SPACING.SM,
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
              GraphQL 16.11.0 • React Router 7.6.3
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
              Chart.js 4.5.0 • Zustand 5.0.6
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
              Emotion 11.14.0 • Vite 7.0.0
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: SPACING.MD }} />

        {/* Bottom Section - Copyright */}
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: SPACING.SM,
          py: SPACING.SM
        }}>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: SPACING.SM,
            flexDirection: { xs: 'column', sm: 'row' }
          }}>
            <Avatar
              src={thangTruongImage}
              alt="Thang Truong"
              sx={{
                width: 60,
                height: 60,
                border: BORDER.SOLID_2,
                borderColor: 'primary.main',
                transition: TRANSITIONS.NORMAL,
                '&:hover': {
                  transform: TRANSFORMS.HOVER_LIFT,
                  boxShadow: '0 6px 16px rgba(0,0,0,0.2)'
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