import { gql } from "@apollo/client";

export const BOOKS_FILTERS_QUERY = gql`
  query BookFilters {
    booksFilters {
      ... on FilterRange {
        type
        max
        min
        name
        presets
      }
      ... on FilterSearch {
        type
        name
        placeholder
      }
      ... on FilterSelect {
        isMulti
        isSearchable
        name
        type
        options {
          label
          value
        }
      }
    }
  }
`;
