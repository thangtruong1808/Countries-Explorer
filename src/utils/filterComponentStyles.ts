import { BACKGROUND_COLORS, BORDER_COLORS, PRIMARY_COLORS } from './colorUtils';
import { BORDER_RADIUS, SPACING } from './styleUtils';
import { FONT_WEIGHTS } from './typographyUtils';

/**
 * Common styles for filter components to ensure consistency and reduce duplication
 */
export const FILTER_COMPONENT_STYLES = {
  // Compact header style for filter components
  COMPACT_HEADER: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    mb: 1.5, // Reduced from 2
  },
  
  // Compact container for filter chips/checkboxes
  COMPACT_CONTAINER: {
    mb: 2, // Reduced from 3
  },
  
  // Compact selected summary box
  COMPACT_SELECTED_SUMMARY: {
    mt: SPACING.XS, // Reduced from SM
    p: SPACING.XS, // Reduced from SM
    borderRadius: BORDER_RADIUS.MEDIUM,
    background: BACKGROUND_COLORS.HOVER,
    border: 1,
    borderColor: BORDER_COLORS.DIVIDER,
  },
  
  // Compact paper wrapper for SideNav
  COMPACT_PAPER: {
    p: SPACING.MD, // Reduced from LG
    borderRadius: BORDER_RADIUS.LARGE,
    border: 1,
    borderColor: BORDER_COLORS.DIVIDER,
    background: BACKGROUND_COLORS.DEFAULT,
    mb: SPACING.MD, // Reduced from LG
  },
  
  // Compact divider spacing
  COMPACT_DIVIDER: {
    my: SPACING.MD, // Reduced from LG
  },
  
  // Compact scrollable container
  COMPACT_SCROLLABLE: {
    maxHeight: 150, // Reduced from 200
    overflowY: 'auto' as const,
    mb: 1.5, // Reduced from 2
    border: 1,
    borderColor: BORDER_COLORS.DIVIDER,
    borderRadius: BORDER_RADIUS.SMALL,
    p: SPACING.SM,
    background: BACKGROUND_COLORS.PAPER,
  },
  
  // Compact active filters container
  COMPACT_ACTIVE_FILTERS: {
    p: SPACING.SM, // Reduced from MD
    borderRadius: BORDER_RADIUS.LARGE,
    border: 1,
    borderColor: BORDER_COLORS.DIVIDER,
    background: BACKGROUND_COLORS.DEFAULT,
    mb: SPACING.SM, // Reduced from MD
  },
  
  // Compact selected summary typography
  COMPACT_SELECTED_TYPOGRAPHY: {
    color: 'text.secondary',
    fontWeight: FONT_WEIGHTS.MEDIUM,
    mb: 0.5, // Reduced from 1
    fontSize: '0.875rem', // Slightly smaller
  },
  
  // Compact selected summary chips
  COMPACT_SELECTED_CHIP: {
    background: PRIMARY_COLORS.LIGHT,
    color: 'primary.main',
    border: 1,
    borderColor: 'primary.main',
    fontSize: '0.75rem', // Smaller font
    height: 20, // Reduced from 24
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      background: PRIMARY_COLORS.MEDIUM,
      transform: 'translateY(-1px)',
    },
  },
} as const; 