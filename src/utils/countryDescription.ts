// Utility function to fetch country descriptions from Wikipedia API
export const fetchCountryDescription = async (countryName: string): Promise<string | null> => {
  try {
    // Use Wikipedia API to get country description
    const searchUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(countryName)}`;
    
    const response = await fetch(searchUrl);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Extract the extract (description) from the response
    if (data.extract) {
      return data.extract;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching country description:', error);
    return null;
  }
};

// Alternative: Use a simpler approach with country-specific descriptions
export const getCountryDescription = (countryName: string): string => {
  const descriptions: Record<string, string> = {
    'United States': 'The United States of America is a federal republic consisting of 50 states, a federal district, five major territories, and various minor islands. It is the world\'s third-largest country by total area and population.',
    'Canada': 'Canada is a country in North America. Its ten provinces and three territories extend from the Atlantic to the Pacific and northward into the Arctic Ocean, covering 9.98 million square kilometres, making it the world\'s second-largest country by total area.',
    'United Kingdom': 'The United Kingdom of Great Britain and Northern Ireland, commonly known as the United Kingdom or Britain, is a sovereign country in Europe, off the north-western coast of the continental mainland.',
    'France': 'France, officially the French Republic, is a country primarily located in Western Europe. It also includes overseas regions and territories in the Americas and the Atlantic, Pacific and Indian Oceans.',
    'Germany': 'Germany, officially the Federal Republic of Germany, is a country in Central Europe. It is the second-most populous country in Europe after Russia, and the most populous member state of the European Union.',
    'Japan': 'Japan is an island country in East Asia, located in the northwest Pacific Ocean. It is bordered on the west by the Sea of Japan, and extends from the Sea of Okhotsk in the north toward the East China Sea and Taiwan in the south.',
    'Australia': 'Australia, officially the Commonwealth of Australia, is a sovereign country comprising the mainland of the Australian continent, the island of Tasmania, and numerous smaller islands.',
    'Brazil': 'Brazil, officially the Federative Republic of Brazil, is the largest country in both South America and Latin America. At 8.5 million square kilometres and with over 217 million people, Brazil is the world\'s fifth-largest country by area and the seventh most populous.',
    'India': 'India, officially the Republic of India, is a country in South Asia. It is the seventh-largest country by area, the second-most populous country, and the most populous democracy in the world.',
    'China': 'China, officially the People\'s Republic of China, is a country in East Asia. It is the world\'s most populous country, with a population exceeding 1.4 billion, slightly ahead of India.',
    'Russia': 'Russia, or the Russian Federation, is a transcontinental country spanning Eastern Europe and Northern Asia. It is the largest country in the world by area, covering over 17,125,191 square kilometres.',
    'South Africa': 'South Africa, officially the Republic of South Africa, is the southernmost country in Africa. It is bounded to the south by 2,798 kilometres of coastline that stretches along the South Atlantic and Indian Oceans.',
    'Mexico': 'Mexico, officially the United Mexican States, is a country in the southern portion of North America. It is bordered to the north by the United States; to the south and west by the Pacific Ocean; to the southeast by Guatemala, Belize, and the Caribbean Sea.',
    'Argentina': 'Argentina, officially the Argentine Republic, is a country in the southern half of South America. Argentina covers an area of 2,780,400 km², making it the second-largest country in South America after Brazil.',
    'Italy': 'Italy, officially the Italian Republic, is a country in Southern and Western Europe. Located in the middle of the Mediterranean Sea, Italy consists of a peninsula delimited by the Alps and surrounded by several islands.',
    'Spain': 'Spain, or the Kingdom of Spain, is a country primarily located in southwestern Europe with parts of territory in the Atlantic Ocean and across the Mediterranean Sea.',
    'Netherlands': 'The Netherlands, informally Holland, is a country located in northwestern Europe with overseas territories in the Caribbean. It is the largest of four constituent countries of the Kingdom of the Netherlands.',
    'Sweden': 'Sweden, officially the Kingdom of Sweden, is a Nordic country in Northern Europe. It borders Norway to the west and north, Finland to the east, and is connected to Denmark in the southwest by a bridge-tunnel across the Öresund.',
    'Norway': 'Norway, officially the Kingdom of Norway, is a Nordic country in Northern Europe, the mainland territory of which comprises the western and northernmost portion of the Scandinavian Peninsula.',
    'Denmark': 'Denmark, officially the Kingdom of Denmark, is a Nordic country in Northern Europe. Denmark proper, which is the southernmost of the Scandinavian countries, consists of a peninsula, Jutland, and an archipelago of 443 named islands.',
  };

  return descriptions[countryName] || `Discover the rich culture, history, and geography of ${countryName}. This diverse nation offers unique experiences and fascinating insights into its people and traditions.`;
}; 