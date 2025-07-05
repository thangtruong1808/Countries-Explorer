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

/**
 * Common responsive layout patterns used across components
 */
export const RESPONSIVE_LAYOUT = {
  // Common container patterns
  FULL_HEIGHT_CONTAINER: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column'
  },
  
  FLEX_GROW_CONTAINER: {
    flex: 1
  },
  
  CENTER_CONTAINER: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  
  // Common flex patterns
  FLEX_COLUMN: {
    display: 'flex',
    flexDirection: 'column'
  },
  
  FLEX_ROW: {
    display: 'flex',
    flexDirection: 'row'
  },
  
  FLEX_CENTER: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  
  FLEX_ALIGN_CENTER: {
    display: 'flex',
    alignItems: 'center'
  },
  
  FLEX_JUSTIFY_CENTER: {
    display: 'flex',
    justifyContent: 'center'
  },
  
  // Common spacing patterns
  MARGIN_BOTTOM_SM: {
    mb: 2
  },
  
  MARGIN_BOTTOM_MD: {
    mb: 3
  },
  
  MARGIN_TOP_SM: {
    mt: 2
  },
  
  MARGIN_TOP_MD: {
    mt: 3
  },
  
  PADDING_MD: {
    p: 2
  },
  
  PADDING_LG: {
    p: 3
  },
  
  // Common text alignment
  TEXT_CENTER: {
    textAlign: 'center'
  },
  
  TEXT_LEFT: {
    textAlign: 'left'
  },
  
  // Common responsive patterns
  RESPONSIVE_FLEX: {
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' }
  },
  
  RESPONSIVE_GAP: {
    gap: { xs: 2, sm: 3 }
  },
  
  // Common card/content patterns
  CARD_CONTENT: {
    p: 3
  },
  
  DIALOG_CONTENT: {
    p: 4
  },
  
  // Common icon container patterns
  ICON_CONTAINER: {
    display: 'flex',
    alignItems: 'center',
    gap: 1
  },
  
  ICON_CONTAINER_LARGE: {
    display: 'flex',
    alignItems: 'center',
    gap: 2
  }
} as const; 