import { RouterProvider } from "@tanstack/react-router";
import { AuthorizedApolloProvider } from "./components/AuthorizedApolloProvider.tsx";
import { useAuth0 } from "@auth0/auth0-react";
import { router } from "./router.tsx";

const InnerApp = () => {
  const { isAuthenticated, user } = useAuth0();
  return <RouterProvider router={router} context={{ user: user, auth: isAuthenticated }} />;
};

export const App = () => {
  return (
    <AuthorizedApolloProvider>
      <InnerApp />
    </AuthorizedApolloProvider>
  );
};
