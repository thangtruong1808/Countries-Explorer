import type { Continent, Country } from '../types';

/**
 * Get unique continents from a list of countries
 */
export const getUniqueContinents = (countries: Country[]): Continent[] => {
  const continentMap = new Map<string, Continent>();
  
  countries.forEach(country => {
    if (country.continent) {
      continentMap.set(country.continent.code, country.continent);
    }
  });
  
  return Array.from(continentMap.values()).sort((a, b) => a.name.localeCompare(b.name));
};

/**
 * Get continent counts from a list of countries
 */
export const getContinentCounts = (countries: Country[]): Record<string, number> => {
  const counts: Record<string, number> = {};
  
  countries.forEach(country => {
    if (country.continent) {
      const code = country.continent.code;
      counts[code] = (counts[code] || 0) + 1;
    }
  });
  
  return counts;
}; 