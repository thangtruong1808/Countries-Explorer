/**
 * Navigation utilities used across the application
 */

/**
 * Handles navigation to home page with page refresh
 * @param navigate - React Router's navigate function
 */
export const handleHomeNavigation = (navigate: (path: string, options?: { replace?: boolean }) => void) => {
  navigate('/', { replace: true });
  window.location.reload();
};

/**
 * Creates a click handler for title navigation
 * @param navigate - React Router's navigate function
 * @returns Click handler function
 */
export const createTitleClickHandler = (navigate: (path: string, options?: { replace?: boolean }) => void) => {
  return () => {
    handleHomeNavigation(navigate);
  };
};

/**
 * Common navigation styles for clickable elements
 */
export const NAVIGATION_STYLES = {
  CLICKABLE_TITLE: {
    cursor: 'pointer',
    userSelect: 'none',
    transition: 'all 0.2s ease',
    '&:hover': {
      transform: 'translateY(-1px)',
      color: 'primary.dark'
    }
  }
} as const; 