import { Outlet } from "react-router";
import { Nav } from "./components/Nav.tsx";

export const App = () => {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
};
