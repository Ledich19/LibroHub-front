import { gql } from '@apollo/client';

export const BOOKS_WITH_FILTER_QUERY = gql`
  query BooksWithFilters {
    books(limit: 20, offset: 0) {
      coverUrl
      description
      downloadUrl
      id
      isbn
      languageCode
      pageCount
      previewUrl
      publishedDate
      publisher
      rating
      seriesId
      seriesIndex
      slug
      title
      totalReviews
      authors {
        birthDate
        id
        firstName
        middleName
        lastName
        penName
        slug
        photoUrl
      }
    }
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