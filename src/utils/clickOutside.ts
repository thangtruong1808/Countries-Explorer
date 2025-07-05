import { useEffect } from 'react';
import type { RefObject } from 'react';

/**
 * Custom hook for detecting clicks outside of a specified element
 * @param ref - Reference to the element to monitor
 * @param isActive - Whether the hook should be active
 * @param onOutsideClick - Callback function when click outside is detected
 * @param excludeSelectors - Array of CSS selectors to exclude from outside click detection
 */
export const useClickOutside = (
  ref: RefObject<HTMLElement | null>,
  isActive: boolean,
  onOutsideClick: () => void,
  excludeSelectors: string[] = []
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!isActive || !ref.current) return;

      const target = event.target as Element;
      
      // Check if click is inside the ref element
      if (ref.current.contains(target)) return;

      // Check if click is on any excluded elements
      const isExcluded = excludeSelectors.some(selector => 
        target.closest(selector)
      );
      
      if (isExcluded) return;

      onOutsideClick();
    };

    if (isActive) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, isActive, onOutsideClick, excludeSelectors]);
}; 