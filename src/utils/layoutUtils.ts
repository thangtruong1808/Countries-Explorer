/**
 * Layout utilities used across the application
 */

// Z-index values for layering
export const Z_INDEX = {
  HEADER: 1000,
  DRAWER: 1200,
  MODAL: 1300,
  TOOLTIP: 1400,
  SNACKBAR: 1500,
} as const;

// Layout dimensions
export const LAYOUT = {
  HEADER_HEIGHT: 64,
  DRAWER_WIDTH: 280,
  CONTAINER_MAX_WIDTH: 'xl',
} as const;

// Position values
export const POSITION = {
  STICKY: 'sticky',
  FIXED: 'fixed',
  ABSOLUTE: 'absolute',
  RELATIVE: 'relative',
  STATIC: 'static',
} as const;

// Common layout styles
export const LAYOUT_STYLES = {
  FULL_HEIGHT: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  CENTERED: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  SPACE_BETWEEN: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  STICKY_HEADER: {
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
} as const; 