import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_API_URL || 'https://countries.trevorblades.com/',
  cache: new InMemoryCache(),
});

export default client;
