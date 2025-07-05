/**
 * Builds the flag image URL using country code
 * @param countryCode - The ISO country code (e.g., 'US', 'GB', 'FR')
 * @returns The complete flag image URL
 */
export const getFlagUrl = (countryCode: string): string => {
  return `https://flagcdn.com/${countryCode.toLowerCase()}.svg`;
}; 