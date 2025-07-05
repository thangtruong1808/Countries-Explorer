import { BORDER_COLORS } from './colorUtils';
import { BORDER } from './styleUtils';
import { FONT_WEIGHTS } from './typographyUtils';

/**
 * Consistent NavBar styles for both light and dark modes
 */
export const NAVBAR_STYLES = {
  // Main AppBar styling - using subtle background
  APP_BAR: {
    background: 'transparent',
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
} as const; 