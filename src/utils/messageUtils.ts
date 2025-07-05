/**
 * Utility functions for generating user-friendly messages
 */

import type { Country, Continent } from '../types';

// Generate specific "no results" message based on current filters
export const getNoResultsMessage = (
  searchTerm: string,
  selectedContinents: string[],
  selectedLanguages: string[],
  continents: Continent[]
): string => {
  const hasSearch = searchTerm.trim().length > 0;
  const hasContinentFilter = selectedContinents.length > 0;
  const hasLanguageFilter = selectedLanguages.length > 0;

  // If no filters are applied, show generic message
  if (!hasSearch && !hasContinentFilter && !hasLanguageFilter) {
    return 'No countries found matching your search criteria.';
  }

  // Build specific message based on active filters
  const filterParts: string[] = [];

  if (hasSearch) {
    filterParts.push(`search term "${searchTerm}"`);
  }

  if (hasContinentFilter) {
    const continentNames = selectedContinents
      .map(code => continents.find(c => c.code === code)?.name || code)
      .join(', ');
    filterParts.push(`continent${selectedContinents.length > 1 ? 's' : ''} (${continentNames})`);
  }

  if (hasLanguageFilter) {
    filterParts.push(`language${selectedLanguages.length > 1 ? 's' : ''} (${selectedLanguages.join(', ')})`);
  }

  // Create the message
  if (filterParts.length === 1) {
    return `No countries found matching ${filterParts[0]}.`;
  } else if (filterParts.length === 2) {
    return `No countries found matching both ${filterParts[0]} and ${filterParts[1]}.`;
  } else {
    const lastPart = filterParts.pop();
    return `No countries found matching ${filterParts.join(', ')}, and ${lastPart}.`;
  }
};

// Generate helpful suggestions based on current filters
export const getFilterSuggestions = (
  searchTerm: string,
  selectedContinents: string[],
  selectedLanguages: string[]
): string[] => {
  const suggestions: string[] = [];

  if (searchTerm.trim().length > 0) {
    suggestions.push('Try adjusting your search term or check for typos.');
  }

  if (selectedContinents.length > 0) {
    suggestions.push('Consider selecting different continents or clearing continent filters.');
  }

  if (selectedLanguages.length > 0) {
    suggestions.push('Try selecting different languages or clearing language filters.');
  }

  if (selectedContinents.length > 0 && selectedLanguages.length > 0) {
    suggestions.push('The combination of selected continents and languages may be too restrictive.');
  }

  return suggestions;
};

// Generate filter summary message
export const getFilterSummary = (
  selectedContinents: string[],
  selectedLanguages: string[],
  continents: Continent[]
): string => {
  const parts: string[] = [];

  if (selectedContinents.length > 0) {
    const continentNames = selectedContinents
      .map(code => continents.find(c => c.code === code)?.name || code)
      .join(', ');
    parts.push(`${selectedContinents.length} continent${selectedContinents.length > 1 ? 's' : ''} (${continentNames})`);
  }

  if (selectedLanguages.length > 0) {
    parts.push(`${selectedLanguages.length} language${selectedLanguages.length > 1 ? 's' : ''} (${selectedLanguages.join(', ')})`);
  }

  if (parts.length === 0) {
    return 'No filters applied';
  } else if (parts.length === 1) {
    return `Filtered by ${parts[0]}`;
  } else {
    return `Filtered by ${parts[0]} and ${parts[1]}`;
  }
}; 