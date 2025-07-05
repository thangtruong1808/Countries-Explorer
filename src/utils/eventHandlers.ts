// Common event handler utilities

// Generic toggle handler for filters
export const createToggleHandler = <T>(
  currentValues: T[],
  setValues: (values: T[]) => void
) => {
  return (value: T) => {
    setValues(
      currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value]
    );
  };
};

// Generic close handler for modals/drawers
export const createCloseHandler = (
  setIsOpen: (isOpen: boolean) => void
) => {
  return () => setIsOpen(false);
};

// Generic toggle handler for boolean state
export const createBooleanToggleHandler = (
  currentValue: boolean,
  setValue: (value: boolean) => void
) => {
  return () => setValue(!currentValue);
}; 