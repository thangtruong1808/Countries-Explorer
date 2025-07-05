import { useQuery } from '@apollo/client';
import { GET_COUNTRIES } from '../graphql/queries';
import type { CountriesData } from '../types';

export const useCountries = () => {
  const { data, loading, error } = useQuery<CountriesData>(GET_COUNTRIES);
  
  return {
    countries: data?.countries || [],
    continents: data?.continents || [],
    totalCount: data?.countries?.length || 0,
    loading,
    error
  };
}; 