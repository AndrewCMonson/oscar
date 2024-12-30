import { Chat, OscarLandingPage, Profile } from "@/components";
import { Auth0Provider } from "@auth0/auth0-react";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { App } from "./App.tsx";
import { AuthorizedApolloProvider } from "./components/AuthorizedApolloProvider.tsx";
import "./index.css";

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <Auth0Provider
        domain={import.meta.env.VITE_AUTH0_DOMAIN}
        clientId={import.meta.env.VITE_AUTH0_CLIENTID}
        authorizationParams={{
          redirect_uri: "http://localhost:5173/chat",
          audience: `${import.meta.env.VITE_AUTH0_API_AUDIENCE}`,
          scope:
            "read:current_user update:current_user_metadata email profile openid",
        }}
        useRefreshTokens
        cacheLocation="localstorage"
      >
        <AuthorizedApolloProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<App />}>
                <Route index element={<OscarLandingPage />} />
                <Route path="chat" element={<Chat />} />
                <Route path="/profile" element={<Profile />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthorizedApolloProvider>
      </Auth0Provider>
    </StrictMode>,
  );
}
