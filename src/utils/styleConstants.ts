/**
 * Common styling constants used across the application
 */

// Typography weights
export const FONT_WEIGHTS = {
  SEMI_BOLD: 600,
  BOLD: 700,
} as const;

// Border radius values
export const BORDER_RADIUS = {
  SMALL: 2,
  MEDIUM: 3,
  LARGE: 4,
} as const;

// Spacing values (in theme spacing units)
export const SPACING = {
  XS: 1,
  SM: 2,
  MD: 3,
  LG: 4,
  XL: 5,
} as const;

// Common transition durations
export const TRANSITIONS = {
  FAST: '0.2s ease',
  MEDIUM: '0.3s ease',
  SLOW: '0.4s cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

// Common shadow values
export const SHADOWS = {
  LIGHT: '0 4px 20px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.1)',
  MEDIUM: '0 8px 24px rgba(0, 0, 0, 0.15)',
  HEAVY: '0 20px 40px rgba(0, 0, 0, 0.15), 0 8px 16px rgba(0, 0, 0, 0.1)',
  DRAWER: '2px 0 8px rgba(0, 0, 0, 0.1)',
} as const;

// Common opacity values
export const OPACITY = {
  LIGHT: 0.7,
  MEDIUM: 0.8,
  HEAVY: 0.9,
} as const;

// Z-index values
export const Z_INDEX = {
  DRAWER: 1200,
  MODAL: 1300,
  TOOLTIP: 1500,
} as const; 