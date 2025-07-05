import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Footer, ThemeToggle } from './components';
import { APP_TITLE } from './constants';
import { CountryDetailPage } from './pages/CountryDetailPage';
import { HomePage } from './pages/HomePage';
import { LAYOUT_STYLES } from './utils/layoutUtils';
import { createTitleClickHandler, NAVIGATION_STYLES } from './utils/navigationUtils';
import { FONT_WEIGHTS } from './utils/typographyUtils';

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
      {/* NavBar and theme toggle are now handled in HomePage */}

      {/* Routes */}
      <Routes>
        <Route path="/" element={<HomePage isDarkMode={isDarkMode} onToggleTheme={onToggleTheme} />} />
        <Route path="/country/:countryCode" element={<CountryDetailPage />} />
      </Routes>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default App;
