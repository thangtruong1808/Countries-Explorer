/**
 * Common color utilities used across the application
 */

// Primary color variations
export const PRIMARY_COLORS = {
  LIGHT: 'rgba(100, 108, 255, 0.1)',
  MEDIUM: 'rgba(100, 108, 255, 0.2)',
  DARK: 'rgba(100, 108, 255, 0.3)',
} as const;

// Common background colors
export const BACKGROUND_COLORS = {
  HOVER: 'action.hover',
  SELECTED: 'action.selected',
  PAPER: 'background.paper',
  DEFAULT: 'background.default',
  TRANSPARENT: 'transparent',
  HOVER_VISIBLE: 'rgba(100, 108, 255, 0.08)',
} as const;

// Common border colors
export const BORDER_COLORS = {
  DIVIDER: 'divider',
  PRIMARY: 'primary.main',
  SECONDARY: 'text.secondary',
  HOVER: 'rgba(100, 108, 255, 0.2)',
} as const;

// Common text colors
export const TEXT_COLORS = {
  PRIMARY: 'text.primary',
  SECONDARY: 'text.secondary',
  PRIMARY_MAIN: 'primary.main',
} as const;

// Common shadow values
export const SHADOW_COLORS = {
  LIGHT: 'rgba(0, 0, 0, 0.08)',
  MEDIUM: 'rgba(0, 0, 0, 0.15)',
  HEAVY: 'rgba(0, 0, 0, 0.25)',
} as const; 