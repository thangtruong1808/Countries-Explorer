import { BACKGROUND_COLORS, BORDER_COLORS } from './colorUtils';
import { BORDER } from './styleUtils';
import { FONT_WEIGHTS } from './typographyUtils';

/**
 * Consistent NavBar styles for both light and dark modes
 */
export const NAVBAR_STYLES = {
  // Main AppBar styling - using same background as Footer
  APP_BAR: {
    bgcolor: BACKGROUND_COLORS.PAPER,
    backdropFilter: 'blur(8px)',
    borderBottom: BORDER.SOLID_1,
    borderColor: BORDER_COLORS.DIVIDER,
    zIndex: 1000,
    boxShadow: 'none',
  },
  
  // Toolbar styling
  TOOLBAR: {
    px: 0, // Remove padding since Container handles alignment
    minHeight: { xs: 64, md: 72 }, // Responsive height
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  // Left section styling
  LEFT_SECTION: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    '@media (max-width: 600px)': {
      gap: 1,
    },
  },
  
  // Right section styling
  RIGHT_SECTION: {
    display: 'flex',
    alignItems: 'center',
  },
  
  // Title styling
  TITLE: {
    fontWeight: FONT_WEIGHTS.BOLD,
    color: 'primary.main',
    fontSize: { xs: '1.25rem', md: '1.5rem' },
    display: 'block', // Ensure it's always visible
  },
  
  // Filter button styling (formerly menu button)
  FILTER_BUTTON: {
    color: 'text.secondary',
    backgroundColor: 'transparent',
    border: 'none',
    textTransform: 'none',
    fontWeight: FONT_WEIGHTS.MEDIUM,
    fontSize: '0.875rem',
    px: 2,
    py: 1,
    minHeight: 'inherit', // Match toolbar height
    borderRadius: 0, // Remove border radius for full height hover
    '&:hover': {
      backgroundColor: 'action.hover',
      color: 'primary.main',
    },
    '& .MuiButton-startIcon': {
      mr: 1,
    },
  },
  
  // Tabs container styling
  TABS_CONTAINER: {
    flexGrow: 1,
  },
  
  // Tabs styling
  TABS: {
    '& .MuiTabs-indicator': {
      backgroundColor: 'primary.main',
    },
  },
  
  // Individual tab styling
  TAB: {
    minWidth: 120,
    textTransform: 'none',
    fontWeight: FONT_WEIGHTS.MEDIUM,
    color: 'text.secondary',
    fontSize: '0.875rem',
    '&.Mui-selected': {
      color: 'primary.main',
      fontWeight: FONT_WEIGHTS.SEMIBOLD,
    },
    '&:hover': {
      color: 'primary.main',
      backgroundColor: 'action.hover',
    },
    '@media (max-width: 600px)': {
      minWidth: 80,
      fontSize: '0.8rem',
    },
  },
  
  // Tabs indicator styling
  TABS_INDICATOR: {
    backgroundColor: 'primary.main',
  },
  
  // Mobile menu button styling
  MENU_BUTTON: {
    color: 'text.secondary',
    '&:hover': {
      backgroundColor: 'action.hover',
      color: 'primary.main',
    },
  },
  
  // Mobile drawer styling
  MOBILE_DRAWER: {
    '& .MuiDrawer-paper': {
      top: 0,
      left: 0,
      right: 0,
      height: 'auto',
      maxHeight: '80vh',
      borderBottom: BORDER.SOLID_1,
      borderColor: BORDER_COLORS.DIVIDER,
      background: 'background.paper',
      backdropFilter: 'blur(8px)',
    },
  },
  
  // Mobile drawer list styling
  MOBILE_DRAWER_LIST: {
    pt: 1,
    pb: 1,
  },
  
  // Mobile drawer item styling
  MOBILE_DRAWER_ITEM: {
    py: 2,
    px: 3,
    '&.Mui-selected': {
      backgroundColor: 'action.selected',
      color: 'primary.main',
      '&:hover': {
        backgroundColor: 'action.selected',
      },
    },
    '&:hover': {
      backgroundColor: 'action.hover',
    },
  },
  
  // Mobile drawer icon styling
  MOBILE_DRAWER_ICON: {
    color: 'inherit',
    minWidth: 40,
  },
  
  // Mobile drawer text styling
  MOBILE_DRAWER_TEXT: {
    '& .MuiListItemText-primary': {
      fontWeight: FONT_WEIGHTS.MEDIUM,
      fontSize: '1rem',
    },
  },
} as const; 