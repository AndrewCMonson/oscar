import { Auth0Provider } from "@auth0/auth0-react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import { AuthorizedApolloProvider } from "./components/AuthorizedApolloProvider.tsx";
import "./index.css";

// const link = new HttpLink({
//   uri: "http://localhost:3005/graphql",
//   credentials: "include",
// });

// const client = new ApolloClient({
//   link: link,
//   cache: new InMemoryCache(),
// });

console.log(import.meta.env.VITE_AUTH0_DOMAIN);

createRoot(document.getElementById("root")!).render(
  <Auth0Provider
    domain={import.meta.env.VITE_AUTH0_DOMAIN}
    clientId={import.meta.env.VITE_AUTH0_CLIENTID}
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: `${import.meta.env.VITE_AUTH0_API_AUDIENCE}`,
      scope:
        "read:current_user update:current_user_metadata email profile openid",
    }}
    useRefreshTokens
    cacheLocation="localstorage"
  >
    <AuthorizedApolloProvider>
      <App />
    </AuthorizedApolloProvider>
    ,
  </Auth0Provider>,
);
