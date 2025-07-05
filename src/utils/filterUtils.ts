import type { Country } from '../types';

// Filter countries by name (case-insensitive search)
export const filterCountriesByName = (countries: Country[], searchTerm: string): Country[] => {
  if (!searchTerm.trim()) {
    return countries;
  }
  
  return countries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
  );
};

// Filter countries by selected continent codes
export const filterCountriesByContinents = (countries: Country[], selectedContinentCodes: string[]): Country[] => {
  if (selectedContinentCodes.length === 0) {
    return countries;
  }
  
  return countries.filter((country) =>
    selectedContinentCodes.includes(country.continent.code)
  );
};

// Filter countries by selected languages
export const filterCountriesByLanguages = (countries: Country[], selectedLanguages: string[]): Country[] => {
  if (selectedLanguages.length === 0) {
    return countries;
  }
  
  return countries.filter((country) =>
    country.languages.some((language) =>
      selectedLanguages.includes(language.name)
    )
  );
};

// Filter countries by selected currencies
export const filterCountriesByCurrencies = (countries: Country[], selectedCurrencies: string[]): Country[] => {
  if (selectedCurrencies.length === 0) {
    return countries;
  }
  
  return countries.filter((country) =>
    country.currency && selectedCurrencies.includes(country.currency)
  );
};

// Get countries filtered by continents only (for language filter)
export const getCountriesByContinents = (countries: Country[], selectedContinentCodes: string[]): Country[] => {
  return filterCountriesByContinents(countries, selectedContinentCodes);
};

// Check if any filters are active
export const hasActiveFilters = (
  selectedContinents: string[],
  selectedLanguages: string[],
  selectedCurrencies: string[] = [],
  searchTerm: string = ''
): boolean => {
  return selectedContinents.length > 0 || 
         selectedLanguages.length > 0 || 
         selectedCurrencies.length > 0 ||
         searchTerm.trim().length > 0;
};

// Apply all filters (name, continent, language, and currency)
export const applyFilters = (
  countries: Country[],
  searchTerm: string,
  selectedContinentCodes: string[],
  selectedLanguages: string[] = [],
  selectedCurrencies: string[] = []
): Country[] => {
  let filteredCountries = filterCountriesByName(countries, searchTerm);
  filteredCountries = filterCountriesByContinents(filteredCountries, selectedContinentCodes);
  filteredCountries = filterCountriesByLanguages(filteredCountries, selectedLanguages);
  filteredCountries = filterCountriesByCurrencies(filteredCountries, selectedCurrencies);
  
  return filteredCountries;
};

/**
 * Get countries filtered by both continents and languages
 * Returns countries that match both continent AND language filters
 */
export const getCountriesByContinentsAndLanguages = (
  countries: Country[], 
  continentCodes: string[], 
  languageNames: string[]
): Country[] => {
  let filteredCountries = countries;
  
  // First filter by continents
  if (continentCodes.length > 0) {
    filteredCountries = filterCountriesByContinents(filteredCountries, continentCodes);
  }
  
  // Then filter by languages
  if (languageNames.length > 0) {
    filteredCountries = filterCountriesByLanguages(filteredCountries, languageNames);
  }
  
  return filteredCountries;
};

/**
 * Get countries filtered by currencies
 * Returns countries that use any of the selected currencies
 */
export const getCountriesByCurrencies = (countries: Country[], currencyCodes: string[]): Country[] => {
  if (currencyCodes.length === 0) {
    return countries;
  }
  return filterCountriesByCurrencies(countries, currencyCodes);
};

/**
 * Get countries filtered by continents and currencies
 * Returns countries that match both continent AND currency filters
 */
export const getCountriesByContinentsAndCurrencies = (
  countries: Country[], 
  continentCodes: string[], 
  currencyCodes: string[]
): Country[] => {
  let filteredCountries = countries;
  
  // First filter by continents
  if (continentCodes.length > 0) {
    filteredCountries = filterCountriesByContinents(filteredCountries, continentCodes);
  }
  
  // Then filter by currencies
  if (currencyCodes.length > 0) {
    filteredCountries = filterCountriesByCurrencies(filteredCountries, currencyCodes);
  }
  
  return filteredCountries;
};

/**
 * Get countries filtered by languages and currencies
 * Returns countries that match both language AND currency filters
 */
export const getCountriesByLanguagesAndCurrencies = (
  countries: Country[], 
  languageNames: string[], 
  currencyCodes: string[]
): Country[] => {
  let filteredCountries = countries;
  
  // First filter by languages
  if (languageNames.length > 0) {
    filteredCountries = filterCountriesByLanguages(filteredCountries, languageNames);
  }
  
  // Then filter by currencies
  if (currencyCodes.length > 0) {
    filteredCountries = filterCountriesByCurrencies(filteredCountries, currencyCodes);
  }
  
  return filteredCountries;
}; 