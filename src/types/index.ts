export interface Continent {
  code: string;
  name: string;
}

export interface Language {
  name: string;
}

export interface Country {
  code: string;
  name: string;
  emoji: string;
  capital: string;
  currency: string;
  languages: Language[];
  phone: string;
  continent: {
    code: string;
    name: string;
  };
}

export interface CountriesData {
  countries: Country[];
  continents: Continent[];
} 