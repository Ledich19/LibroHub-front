import { getClient } from "@/lib/apollo-server";
import { gql } from "@apollo/client";

const BOOKS_QUERY = gql`
 query BooksQuery {
  books(limit: 10, offset: 10) {
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
      lastName
      firstNames
      slug
    }
  }
}
`;

const Books = async () => {

  const { data } = await getClient().query({ query: BOOKS_QUERY });
  console.log(data);
  // можно отрисовать данные, если нужно

  return <div>Welcome to the App section</div>;
};

export default Books;
