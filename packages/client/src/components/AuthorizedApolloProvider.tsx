import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useAuth0 } from '@auth0/auth0-react';
import { FC, ReactNode } from "react";

interface AuthorizedApolloProviderProps {
  children: ReactNode
}

export const AuthorizedApolloProvider: FC<AuthorizedApolloProviderProps> = ({ children }) => {
  const { getAccessTokenSilently } = useAuth0();

  const httpLink = new HttpLink({
    uri: "http://localhost:3005/graphql",
    credentials: "include",
  });

  const authLink = setContext(async () => {
    const token = await getAccessTokenSilently();
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  })

  const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    connectToDevTools: true,
  });

  return (
    <ApolloProvider client={apolloClient}>
      {children}
    </ApolloProvider>
  )
}
