/**
 * Currency utilities used across the application
 */

import type { Country } from '../types';

/**
 * Get unique currencies from a list of countries
 * @param countries - Array of countries
 * @returns Array of unique currency codes, sorted alphabetically
 */
export const getUniqueCurrencies = (countries: Country[]): string[] => {
  const uniqueCurrencies = new Set<string>();
  
  countries.forEach(country => {
    if (country.currency && country.currency.trim()) {
      uniqueCurrencies.add(country.currency.trim());
    }
  });
  
  return Array.from(uniqueCurrencies).sort();
};

/**
 * Get countries that use a specific currency
 * @param countries - Array of countries
 * @param currency - Currency code to filter by
 * @returns Array of countries using the specified currency
 */
export const getCountriesByCurrency = (countries: Country[], currency: string): Country[] => {
  return countries.filter(country => 
    country.currency && country.currency.trim() === currency.trim()
  );
};

/**
 * Get currency count (how many countries use each currency)
 * @param countries - Array of countries
 * @returns Object with currency codes as keys and counts as values
 */
export const getCurrencyCounts = (countries: Country[]): Record<string, number> => {
  const counts: Record<string, number> = {};
  
  countries.forEach(country => {
    if (country.currency && country.currency.trim()) {
      const currency = country.currency.trim();
      counts[currency] = (counts[currency] || 0) + 1;
    }
  });
  
  return counts;
};

/**
 * Group currencies by their first letter for tabbed display
 * @param currencies - Array of currency codes
 * @returns Object with letter as key and array of currencies as value
 */
export const groupCurrenciesByLetter = (currencies: string[]): Record<string, string[]> => {
  const groups: Record<string, string[]> = {};
  
  currencies.forEach(currency => {
    const firstLetter = currency.charAt(0).toUpperCase();
    if (!groups[firstLetter]) {
      groups[firstLetter] = [];
    }
    groups[firstLetter].push(currency);
  });
  
  // Sort currencies within each group
  Object.keys(groups).forEach(letter => {
    groups[letter].sort();
  });
  
  return groups;
}; 