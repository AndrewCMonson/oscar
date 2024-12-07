import { Nav } from "@/components/Nav.tsx";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <Nav />
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
