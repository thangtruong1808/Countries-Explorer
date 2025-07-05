import type { Country } from '../types';

// Extract all unique languages from countries with counts
export const getAllLanguages = (countries: Country[]): Array<{ name: string; count: number }> => {
  const languageMap = new Map<string, number>();

  countries.forEach(country => {
    country.languages.forEach(language => {
      const currentCount = languageMap.get(language.name) || 0;
      languageMap.set(language.name, currentCount + 1);
    });
  });

  // Convert to array and sort by count (descending) then by name
  return Array.from(languageMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => {
      if (b.count !== a.count) {
        return b.count - a.count; // Sort by count descending
      }
      return a.name.localeCompare(b.name); // Then by name alphabetically
    });
};

// Find countries that speak multiple selected languages
export const getCountriesWithMultipleLanguages = (
  countries: Country[], 
  selectedLanguages: string[]
): Array<{ country: Country; languages: string[] }> => {
  if (selectedLanguages.length < 2) {
    return [];
  }

  return countries
    .filter(country => {
      const countryLanguages = country.languages.map(lang => lang.name);
      const matchingLanguages = selectedLanguages.filter(lang => 
        countryLanguages.includes(lang)
      );
      return matchingLanguages.length >= 2;
    })
    .map(country => {
      const countryLanguages = country.languages.map(lang => lang.name);
      const matchingLanguages = selectedLanguages.filter(lang => 
        countryLanguages.includes(lang)
      );
      return {
        country,
        languages: matchingLanguages
      };
    })
    .sort((a, b) => {
      // Sort by number of matching languages (descending), then by country name
      if (b.languages.length !== a.languages.length) {
        return b.languages.length - a.languages.length;
      }
      return a.country.name.localeCompare(b.country.name);
    });
}; 