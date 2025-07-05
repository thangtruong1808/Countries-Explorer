import { FONT_WEIGHTS } from './typographyUtils';

/**
 * Common style utilities used across the application
 */

// Common border radius values
export const BORDER_RADIUS = {
  SMALL: 1,
  MEDIUM: 2,
  LARGE: 3,
  ROUND: '50%',
} as const;

// Common transition values
export const TRANSITIONS = {
  FAST: 'all 0.15s ease',
  NORMAL: 'all 0.2s ease',
  SLOW: 'all 0.3s ease',
  BACKGROUND: 'background-color 0.2s ease',
} as const;

// Common spacing values
export const SPACING = {
  XS: 0.5,
  SM: 1,
  MD: 2,
  LG: 3,
  XL: 4,
} as const;

// Common box shadow values
export const BOX_SHADOWS = {
  LIGHT: '0 1px 3px rgba(0, 0, 0, 0.12)',
  MEDIUM: '0 2px 8px rgba(0, 0, 0, 0.15)',
  HEAVY: '0 4px 12px rgba(0, 0, 0, 0.25)',
  MATERIAL_2: 2,
  MATERIAL_4: 4,
  MATERIAL_8: 8,
  MATERIAL_16: 16,
  MATERIAL_24: 24,
} as const;

// Common transform values
export const TRANSFORMS = {
  HOVER_LIFT: 'translateY(-1px)',
  HOVER_SCALE: 'scale(1.02)',
  HOVER_ROTATE: 'rotate(5deg)',
} as const;

// Common cursor values
export const CURSORS = {
  POINTER: 'pointer',
  DEFAULT: 'default',
  NOT_ALLOWED: 'not-allowed',
  GRAB: 'grab',
  GRABBING: 'grabbing',
} as const;

// Common display values
export const DISPLAY = {
  NONE: 'none',
  BLOCK: 'block',
  FLEX: 'flex',
  INLINE: 'inline',
  INLINE_BLOCK: 'inline-block',
  GRID: 'grid',
} as const;

// Common flex values
export const FLEX = {
  GROW_1: 1,
  SHRINK_0: 0,
  BASIS_AUTO: 'auto',
} as const;

// Common border values
export const BORDER = {
  SOLID_1: '1px solid',
  SOLID_2: '2px solid',
  SOLID_3: '3px solid',
  DASHED_1: '1px dashed',
  DOTTED_1: '1px dotted',
} as const;

/**
 * Common badge and chip styling patterns
 */
export const BADGE_STYLES = {
  // Primary badge styling
  PRIMARY: {
    bgcolor: 'primary.light',
    color: 'primary.contrastText',
    px: 2,
    py: 0.5,
    borderRadius: 2,
    fontWeight: 600,
  },
  
  // Secondary badge styling
  SECONDARY: {
    bgcolor: 'background.paper',
    color: 'text.secondary',
    px: 2,
    py: 0.5,
    borderRadius: 2,
    fontWeight: 500,
    border: 1,
    borderColor: 'divider',
  },
  
  // Small badge styling
  SMALL: {
    px: 1.5,
    py: 0.25,
    borderRadius: 1,
    fontSize: '0.75rem',
  },
  
  // Large badge styling
  LARGE: {
    px: 3,
    py: 1,
    borderRadius: 3,
    fontSize: '1rem',
  },
} as const;

/**
 * Common button styling patterns
 */
export const BUTTON_STYLES = {
  // Outlined button styling
  OUTLINED: {
    borderRadius: BORDER_RADIUS.MEDIUM,
    textTransform: 'none',
    fontWeight: FONT_WEIGHTS.MEDIUM,
  },
  
  // Primary button styling
  PRIMARY: {
    borderRadius: BORDER_RADIUS.MEDIUM,
    textTransform: 'none',
    fontWeight: FONT_WEIGHTS.SEMIBOLD,
    px: 3,
    py: 1.5,
  },
} as const;

/**
 * Common icon styling patterns
 */
export const ICON_STYLES = {
  // Primary icon styling
  PRIMARY: {
    color: 'primary.main',
    fontSize: 20,
  },
  
  // Secondary icon styling
  SECONDARY: {
    color: 'text.secondary',
    fontSize: 18,
  },
  
  // Small icon styling
  SMALL: {
    fontSize: 16,
  },
  
  // Large icon styling
  LARGE: {
    fontSize: 24,
  },
  
  // Extra large icon styling
  XLARGE: {
    fontSize: 32,
  },
} as const; 