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

// Apply both name and continent filters
export const applyFilters = (
  countries: Country[],
  searchTerm: string,
  selectedContinentCodes: string[]
): Country[] => {
  let filteredCountries = filterCountriesByName(countries, searchTerm);
  filteredCountries = filterCountriesByContinents(filteredCountries, selectedContinentCodes);
  
  return filteredCountries;
}; 