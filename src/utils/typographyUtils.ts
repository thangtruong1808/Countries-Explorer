/**
 * Common typography utilities used across the application
 */

// Common font sizes
export const FONT_SIZES = {
  XS: '0.75rem',
  SM: '0.875rem',
  MD: '1rem',
  LG: '1.125rem',
  XL: '1.25rem',
  XXL: '1.5rem',
  XXXL: '1.75rem',
  DISPLAY: '2rem',
} as const;

// Common font weights
export const FONT_WEIGHTS = {
  LIGHT: 300,
  NORMAL: 400,
  MEDIUM: 500,
  SEMIBOLD: 600,
  BOLD: 700,
  EXTRABOLD: 800,
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

/**
 * Common responsive font sizes used across components
 */
export const RESPONSIVE_FONT_SIZES = {
  // Small text responsive
  SMALL: { xs: '0.8rem', sm: '0.85rem' },
  SMALL_MEDIUM: { xs: '0.85rem', sm: '0.9rem' },
  MEDIUM: { xs: '0.9rem', sm: '0.95rem' },
  
  // Body text responsive
  BODY: { xs: '1rem', sm: '1.125rem' },
  BODY_LARGE: { xs: '1.1rem', sm: '1.25rem' },
  
  // Heading text responsive
  HEADING_SMALL: { xs: '1.25rem', sm: '1.375rem' },
  HEADING_MEDIUM: { xs: '1.25rem', sm: '1.5rem' },
  HEADING_LARGE: { xs: '1.5rem', sm: '1.75rem' },
  HEADING_XLARGE: { xs: '1.5rem', sm: '2rem' },
  
  // Display text responsive
  DISPLAY_SMALL: { xs: '1.75rem', sm: '2rem' },
  DISPLAY_LARGE: { xs: '2rem', sm: '2.125rem' },
} as const; 