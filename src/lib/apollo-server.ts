import { HttpLink } from "@apollo/client";
import { registerApolloClient } from "@apollo/client-integration-nextjs";
import { ApolloClient, InMemoryCache } from "@apollo/client";

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: "http://127.0.0.1:4000/graphql",
      //uri: "https://countries.trevorblades.com", // Замени на твой API
    }),
  });
});