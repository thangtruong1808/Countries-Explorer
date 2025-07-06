import { BarChart as ChartIcon, DarkMode as DarkModeIcon, Dashboard as DashboardIcon, FilterList as FilterIcon, Home as HomeIcon, LightMode as LightModeIcon, Menu as MenuIcon } from '@mui/icons-material';
import { AppBar, Box, Container, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Tab, Tabs, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { APP_TITLE } from '../constants';
import { NAVBAR_STYLES } from '../utils/navBarStyles';

interface NavBarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onFiltersToggle?: () => void;
}

export const NavBar: React.FC<NavBarProps> = ({
  currentTab,
  onTabChange,
  isDarkMode,
  onToggleTheme,
  onFiltersToggle
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    if (newValue === 'theme') {
      onToggleTheme();
      return;
    }

    // Special handling for Filters tab - can reopen SideNav even if already selected
    if (newValue === 'filters' && currentTab === 'filters' && onFiltersToggle) {
      onFiltersToggle();
      return;
    }

    onTabChange(newValue);
    if (isMobile) {
      setDrawerOpen(false);
    }
  };

  const handleFiltersTabClick = (event: React.MouseEvent) => {
    // If already on filters tab, toggle the SideNav
    if (currentTab === 'filters' && onFiltersToggle) {
      event.preventDefault();
      onFiltersToggle();
    }
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleDrawerItemClick = (tab: string) => {
    if (tab === 'theme') {
      onToggleTheme();
    } else if (tab === 'filters' && currentTab === 'filters' && onFiltersToggle) {
      onFiltersToggle();
    } else {
      onTabChange(tab);
    }
    setDrawerOpen(false);
  };

  const tabItems = [
    { label: 'Home', value: 'home', icon: <HomeIcon /> },
    { label: 'Filters', value: 'filters', icon: <FilterIcon /> },
    { label: 'Continent Dashboard', value: 'dashboard', icon: <DashboardIcon /> },
    { label: 'Data Visualization', value: 'charts', icon: <ChartIcon /> },
    { label: 'Theme', value: 'theme', icon: isDarkMode ? <DarkModeIcon /> : <LightModeIcon /> }
  ];

  return (
    <AppBar position="sticky" sx={NAVBAR_STYLES.APP_BAR}>
      <Container maxWidth="xl">
        <Toolbar sx={NAVBAR_STYLES.TOOLBAR}>
          {/* Logo + Title */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Typography
              variant="h6"
              sx={NAVBAR_STYLES.TITLE}
            >
              {APP_TITLE}
            </Typography>
          </Box>

          {/* Desktop Navigation Tabs */}
          {!isMobile && (
            <Box sx={NAVBAR_STYLES.RIGHT_SECTION}>
              <Tabs
                value={currentTab}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={NAVBAR_STYLES.TABS}
              >
                {tabItems.map((item) => (
                  <Tab
                    key={item.value}
                    label={item.label}
                    value={item.value}
                    icon={item.icon}
                    iconPosition="start"
                    sx={NAVBAR_STYLES.TAB}
                    onClick={item.value === 'filters' ? handleFiltersTabClick : undefined}
                  />
                ))}
              </Tabs>
            </Box>
          )}

          {/* Mobile Menu Icon */}
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open navigation menu"
              onClick={handleDrawerToggle}
              sx={NAVBAR_STYLES.MENU_BUTTON}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </Container>

      {/* Mobile Navigation Drawer */}
      {isMobile && (
        <Drawer
          anchor="top"
          open={drawerOpen}
          onClose={handleDrawerToggle}
          sx={NAVBAR_STYLES.MOBILE_DRAWER}
        >
          <List sx={NAVBAR_STYLES.MOBILE_DRAWER_LIST}>
            {tabItems.map((item) => (
              <ListItem key={item.value} disablePadding>
                <ListItemButton
                  onClick={() => handleDrawerItemClick(item.value)}
                  selected={currentTab === item.value}
                  sx={NAVBAR_STYLES.MOBILE_DRAWER_ITEM}
                >
                  <ListItemIcon sx={NAVBAR_STYLES.MOBILE_DRAWER_ICON}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    sx={NAVBAR_STYLES.MOBILE_DRAWER_TEXT}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      )}
    </AppBar>
  );
}; 