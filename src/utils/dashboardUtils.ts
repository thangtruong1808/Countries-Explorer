import type { Country, Continent } from '../types';

export interface ContinentStats {
  continent: Continent;
  countryCount: number;
  languages: string[];
  uniqueLanguages: number;
  currencies: string[];
  uniqueCurrencies: number;
  population?: number;
}

export interface LanguageDistribution {
  language: string;
  count: number;
  percentage: number;
}

export interface ContinentChartData {
  continent: string;
  countryCount: number;
  color: string;
}

/**
 * Get statistics for each continent
 */
export const getContinentStats = (countries: Country[], continents: Continent[]): ContinentStats[] => {
  const stats: ContinentStats[] = [];

  continents.forEach(continent => {
    const continentCountries = countries.filter(country => 
      country.continent?.code === continent.code
    );

    const languages = continentCountries.flatMap(country => 
      country.languages?.map(lang => lang.name) || []
    );

    const currencies = continentCountries
      .map(country => country.currency)
      .filter(Boolean) as string[];

    stats.push({
      continent,
      countryCount: continentCountries.length,
      languages,
      uniqueLanguages: new Set(languages).size,
      currencies,
      uniqueCurrencies: new Set(currencies).size,
    });
  });

  return stats.sort((a, b) => b.countryCount - a.countryCount);
};

/**
 * Get language distribution data for pie chart
 */
export const getLanguageDistribution = (countries: Country[]): LanguageDistribution[] => {
  const languageCounts: Record<string, number> = {};
  let totalCountries = 0;

  countries.forEach(country => {
    if (country.languages) {
      country.languages.forEach(language => {
        languageCounts[language.name] = (languageCounts[language.name] || 0) + 1;
        totalCountries++;
      });
    }
  });

  const distribution = Object.entries(languageCounts)
    .map(([language, count]) => ({
      language,
      count,
      percentage: (count / totalCountries) * 100
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10); // Top 10 languages

  return distribution;
};

/**
 * Get continent chart data for bar chart
 */
export const getContinentChartData = (continentStats: ContinentStats[]): ContinentChartData[] => {
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
    '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
  ];

  return continentStats.map((stat, index) => ({
    continent: stat.continent.name,
    countryCount: stat.countryCount,
    color: colors[index % colors.length]
  }));
};

/**
 * Get currency diversity statistics
 */
export const getCurrencyDiversity = (countries: Country[]) => {
  const currencyCounts: Record<string, number> = {};
  
  countries.forEach(country => {
    if (country.currency) {
      currencyCounts[country.currency] = (currencyCounts[country.currency] || 0) + 1;
    }
  });

  const currencies = Object.entries(currencyCounts)
    .map(([currency, count]) => ({ currency, count }))
    .sort((a, b) => b.count - a.count);

  return {
    totalCurrencies: currencies.length,
    mostCommonCurrency: currencies[0]?.currency || 'N/A',
    mostCommonCount: currencies[0]?.count || 0,
    currencyDistribution: currencies.slice(0, 10) // Top 10 currencies
  };
}; 