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

// Get countries filtered by continents only (for language filter)
export const getCountriesByContinents = (countries: Country[], selectedContinentCodes: string[]): Country[] => {
  return filterCountriesByContinents(countries, selectedContinentCodes);
};

// Check if any filters are active
export const hasActiveFilters = (
  selectedContinents: string[],
  selectedLanguages: string[],
  searchTerm: string = ''
): boolean => {
  return selectedContinents.length > 0 || 
         selectedLanguages.length > 0 || 
         searchTerm.trim().length > 0;
};

// Apply all filters (name, continent, and language)
export const applyFilters = (
  countries: Country[],
  searchTerm: string,
  selectedContinentCodes: string[],
  selectedLanguages: string[] = []
): Country[] => {
  let filteredCountries = filterCountriesByName(countries, searchTerm);
  filteredCountries = filterCountriesByContinents(filteredCountries, selectedContinentCodes);
  filteredCountries = filterCountriesByLanguages(filteredCountries, selectedLanguages);
  
  return filteredCountries;
}; 