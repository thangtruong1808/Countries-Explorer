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
