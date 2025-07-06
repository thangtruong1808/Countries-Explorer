import { Box } from '@mui/material';
import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Footer } from './components';
import { CountryDetailPage } from './pages/CountryDetailPage';
import { HomePage } from './pages/HomePage';
import { LAYOUT_STYLES } from './utils/layoutUtils';
import { createTitleClickHandler } from './utils/navigationUtils';

interface AppProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

const App: React.FC<AppProps> = ({ isDarkMode, onToggleTheme }) => {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState('home');
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  const handleTitleClick = createTitleClickHandler(navigate);

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
    // If we're on a country detail page, navigate back to home with the selected tab
    if (window.location.pathname.includes('/country/')) {
      navigate('/', { state: { selectedTab: tab } });
    }
  };

  const handleFiltersToggle = () => {
    setIsSideNavOpen(!isSideNavOpen);
  };

  return (
    <Box sx={LAYOUT_STYLES.FULL_HEIGHT}>
      {/* Header */}
      {/* NavBar and theme toggle are now handled in HomePage */}

      {/* Routes */}
      <Routes>
        <Route path="/" element={<HomePage isDarkMode={isDarkMode} onToggleTheme={onToggleTheme} />} />
        <Route path="/country/:countryCode" element={
          <CountryDetailPage
            currentTab={currentTab}
            onTabChange={handleTabChange}
            isDarkMode={isDarkMode}
            onToggleTheme={onToggleTheme}
            onFiltersToggle={handleFiltersToggle}
          />
        } />
      </Routes>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default App;
