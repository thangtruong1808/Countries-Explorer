import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Footer, ThemeToggle } from './components';
import { APP_TITLE } from './constants';
import { CountryDetailPage } from './pages/CountryDetailPage';
import { HomePage } from './pages/HomePage';
import { LAYOUT_STYLES } from './utils/layoutUtils';
import { FONT_WEIGHTS } from './utils/typographyUtils';
import { TRANSITIONS, TRANSFORMS } from './utils/styleUtils';
import { createTitleClickHandler, NAVIGATION_STYLES } from './utils/navigationUtils';

interface AppProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

const App: React.FC<AppProps> = ({ isDarkMode, onToggleTheme }) => {
  const navigate = useNavigate();

  const handleTitleClick = createTitleClickHandler(navigate);

  return (
    <Box sx={LAYOUT_STYLES.FULL_HEIGHT}>
      {/* Header */}
      <Box
        component="header"
        sx={{
          bgcolor: 'background.paper',
          borderBottom: 1,
          borderColor: 'divider',
          ...LAYOUT_STYLES.STICKY_HEADER,
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              ...LAYOUT_STYLES.SPACE_BETWEEN,
              py: 2,
            }}
          >
            <Typography
              variant="h4"
              onClick={handleTitleClick}
              sx={{
                fontWeight: FONT_WEIGHTS.BOLD,
                color: 'primary.main',
                fontSize: { xs: '1.5rem', sm: '2rem' },
                ...NAVIGATION_STYLES.CLICKABLE_TITLE
              }}
            >
              {APP_TITLE}
            </Typography>
            <ThemeToggle isDarkMode={isDarkMode} onToggle={onToggleTheme} />
          </Box>
        </Container>
      </Box>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/country/:countryCode" element={<CountryDetailPage />} />
      </Routes>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default App;
