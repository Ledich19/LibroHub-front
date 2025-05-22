import { gql } from "@apollo/client";

export const USER_QUERY = gql`
  query User($id: Int!) {
    user(id: $id) {
      id
      email
      name
    }
    viewer {
    id
    name
  }
  }
`;
