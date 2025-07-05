import { BarChart as ChartIcon, Dashboard as DashboardIcon, FilterList as FilterIcon, Home as HomeIcon } from '@mui/icons-material';
import { AppBar, Box, Button, Container, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { NAVBAR_STYLES } from '../utils/navBarStyles';

interface NavBarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  onMenuToggle: () => void;
  showMenuButton?: boolean;
}

export const NavBar: React.FC<NavBarProps> = ({
  currentTab,
  onTabChange,
  onMenuToggle,
  showMenuButton = false
}) => {
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    onTabChange(newValue);
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={NAVBAR_STYLES.APP_BAR}
    >
      <Container maxWidth="xl">
        <Toolbar sx={NAVBAR_STYLES.TOOLBAR}>
          {/* Left side - Filter Button and Title */}
          <Box sx={NAVBAR_STYLES.LEFT_SECTION}>
            {/* Filter Button - Only show on Home tab */}
            {showMenuButton && (
              <Button
                onClick={onMenuToggle}
                startIcon={<FilterIcon />}
                sx={NAVBAR_STYLES.FILTER_BUTTON}
                aria-label="Toggle advanced filters"
                data-navbar-menu
              >
                Filters
              </Button>
            )}

          </Box>

          {/* Right side - Navigation Tabs */}
          <Box sx={NAVBAR_STYLES.RIGHT_SECTION}>
            <Tabs
              value={currentTab}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={NAVBAR_STYLES.TABS}
            >
              <Tab
                label="Home"
                value="home"
                icon={<HomeIcon />}
                iconPosition="start"
                sx={NAVBAR_STYLES.TAB}
              />
              <Tab
                label="Continent Dashboard"
                value="dashboard"
                icon={<DashboardIcon />}
                iconPosition="start"
                sx={NAVBAR_STYLES.TAB}
              />
              <Tab
                label="Data Visualization"
                value="charts"
                icon={<ChartIcon />}
                iconPosition="start"
                sx={NAVBAR_STYLES.TAB}
              />
            </Tabs>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}; 