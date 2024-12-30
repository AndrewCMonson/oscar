import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useAuth0 } from "@auth0/auth0-react";
import { ReactNode } from "react";

interface AuthorizedApolloProviderProps {
  children: ReactNode;
}

/**
 * AuthorizedApolloProvider is a React component that sets up an Apollo Client
 * with authentication and provides it to its children components.
 *
 * @param {AuthorizedApolloProviderProps} props - The props for the component.
 * @param {React.ReactNode} props.children - The child components that will have access to the Apollo Client.
 *
 * @returns {JSX.Element} The ApolloProvider component with the configured Apollo Client.
 *
 * This component uses the useAuth0 hook to get the authenticated user and access token.
 * It sets up an Apollo Client with an HTTP link to the GraphQL server and an authentication link
 * that adds the access token and user information to the request headers.
 */
export const AuthorizedApolloProvider = ({
  children,
}: AuthorizedApolloProviderProps): JSX.Element => {
  const { user, getAccessTokenSilently } = useAuth0();

  const httpLink = new HttpLink({
    uri: "http://localhost:3005/graphql",
    credentials: "include",
  });

  const authLink = setContext(async () => {
    const token = await getAccessTokenSilently();
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        AuthorizedUser: user ? `${JSON.stringify(user)}` : undefined,
      },
    };
  });

  const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    connectToDevTools: true,
  });

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};
