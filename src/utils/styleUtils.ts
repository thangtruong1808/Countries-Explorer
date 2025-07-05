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