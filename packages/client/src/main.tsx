import { Auth0Provider } from "@auth0/auth0-react";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import "./index.css";
import { router } from "./router.ts";

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

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
        <App />
      </Auth0Provider>
    </StrictMode>,
  );
}
