import { Z_INDEX } from './styleConstants';

/**
 * Responsive positioning utilities for better UX across different screen sizes
 */
export const RESPONSIVE_POSITION_STYLES = {
  // Responsive MenuIcon positioning for SideNav toggle
  RESPONSIVE_MENU_ICON: {
    position: 'fixed' as const,
    zIndex: Z_INDEX.DRAWER,
    bgcolor: 'background.paper',
    border: 1,
    borderColor: 'divider',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      bgcolor: 'background.paper',
      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)',
      transform: 'translateY(-1px)',
    },
    // Mobile positioning (bottom right corner for thumb accessibility)
    xs: {
      bottom: 20,
      right: 20,
      top: 'auto',
      left: 'auto',
    },
    // Tablet positioning (top left, but with more spacing)
    sm: {
      top: 120,
      left: 20,
      bottom: 'auto',
      right: 'auto',
    },
    // Desktop positioning (top left with drawer consideration)
    md: {
      top: 100,
      left: 20,
      bottom: 'auto',
      right: 'auto',
    },
    // Large desktop positioning (top left with more spacing)
    lg: {
      top: 120,
      left: 30,
      bottom: 'auto',
      right: 'auto',
    },
  },
  
  // Responsive drawer positioning
  RESPONSIVE_DRAWER: {
    width: {
      xs: 280, // Smaller on mobile
      sm: 320, // Medium on tablet
      md: 340, // Standard on desktop
      lg: 360, // Larger on big screens
    },
  },
} as const; 