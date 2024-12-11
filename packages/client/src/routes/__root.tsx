import { Nav } from "@/components/Nav.tsx";
import { User } from "@auth0/auth0-react";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

interface RouterContext {
  user?: User
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <Nav />
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
