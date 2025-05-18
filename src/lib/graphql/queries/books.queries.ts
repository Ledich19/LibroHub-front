import { gql } from '@apollo/client';

export const BOOKS_QUERY = gql`
  query Books {
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
  }
`;