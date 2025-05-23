import { HttpLink } from "@apollo/client";
import { registerApolloClient } from "@apollo/client-integration-nextjs";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { cookies } from "next/headers";

export const { getClient } = registerApolloClient(() => {
  const authLink = setContext(async (_, { req }) => {
    // Проверяем, есть ли req (серверная сторона с getServerSideProps)
    const sessionCookie = req
      ? req.headers.cookie || "" // Куки из req
      : (await cookies()).get("session")?.value
        ? `session=${(await cookies()).get("session")!.value}` // Куки из cookies()
        : "";

    return {
      headers: {
        cookie: sessionCookie,
      },
    };
  });

  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPH_QL_URL,
    credentials: "include", // Для кросс-доменных запросов
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
  });
});