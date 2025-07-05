/**
 * Common icon styling utilities
 */

// Icon sizes
export const ICON_SIZES = {
  SMALL: 16,
  MEDIUM: 20,
  LARGE: 24,
  XLARGE: 32,
} as const;

// Common icon styles
export const ICON_STYLES = {
  // Primary colored icons
  PRIMARY: {
    color: 'primary.main',
    fontSize: ICON_SIZES.MEDIUM,
  },
  
  // Secondary colored icons
  SECONDARY: {
    color: 'text.secondary',
    fontSize: ICON_SIZES.MEDIUM,
  },
  
  // Large primary icons
  PRIMARY_LARGE: {
    color: 'primary.main',
    fontSize: ICON_SIZES.LARGE,
  },
  
  // Small secondary icons
  SECONDARY_SMALL: {
    color: 'text.secondary',
    fontSize: ICON_SIZES.SMALL,
  },
  
  // Hover effects for interactive icons
  HOVER_EFFECTS: {
    '&:hover': {
      color: 'text.primary',
      background: 'action.hover',
    },
  },
} as const;

// Common icon button styles
export const ICON_BUTTON_STYLES = {
  CLEAR: {
    color: 'text.secondary',
    '&:hover': {
      color: 'text.primary',
      background: 'action.hover',
    },
  },
  
  PRIMARY: {
    color: 'primary.main',
    '&:hover': {
      color: 'primary.dark',
      background: 'action.hover',
    },
  },
} as const; 