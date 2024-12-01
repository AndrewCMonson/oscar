import { createRoot } from "react-dom/client";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";
import "./index.css";
import { App } from "./App.tsx";
import { Auth0Provider } from "@auth0/auth0-react";

const link = new HttpLink({
  uri: "http://localhost:3005/graphql",
  credentials: "include",
});

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")!).render(
  <Auth0Provider
    domain="dev-bcm7n7u27bjemuzy.us.auth0.com"
    clientId="2TM21EOpBcBXkHsQ6Kwretw5ZJ3SiFqe"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
    ,
  </Auth0Provider>,
);
