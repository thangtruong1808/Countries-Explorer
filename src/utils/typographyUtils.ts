/**
 * Common typography utilities used across the application
 */

// Common font sizes
export const FONT_SIZES = {
  XS: '0.65rem',
  SM: '0.75rem',
  MD: '0.85rem',
  LG: '0.9rem',
  XL: '0.95rem',
  XXL: '1.1rem',
} as const;

// Common font weights
export const FONT_WEIGHTS = {
  LIGHT: 300,
  NORMAL: 400,
  MEDIUM: 500,
  SEMIBOLD: 600,
  BOLD: 700,
} as const;

// Common line heights
export const LINE_HEIGHTS = {
  TIGHT: 1.2,
  NORMAL: 1.4,
  RELAXED: 1.6,
} as const;

// Common letter spacing
export const LETTER_SPACING = {
  TIGHT: '0.5px',
  NORMAL: '0.8px',
  WIDE: '1.2px',
} as const; 