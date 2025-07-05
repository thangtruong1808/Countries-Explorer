import { gql } from '@apollo/client';

export const GET_COUNTRIES = gql`
  query {
    countries {
      code
      name
      emoji
      capital
      currency
      languages {
        name
        native
        rtl
      }
      phone
      continent {
        code
        name
      }
    }
    continents {
      code
      name
    }
  }
`;

// Introspection query to explore available fields
export const GET_COUNTRY_SCHEMA = gql`
  query IntrospectionQuery {
    __schema {
      types {
        name
        fields {
          name
          type {
            name
            kind
            ofType {
              name
              kind
            }
          }
        }
      }
    }
  }
`;
