import Cookies from "js-cookie";
import { Outlet } from "react-router";
import { Nav } from "./components/Nav.tsx";
import { SidebarProvider } from "./components/ui/sidebar.tsx";

export const App = () => {
  const defaultOpen = Cookies.get("sidebar:state") === "true";

  return (
    <>
      <SidebarProvider defaultOpen={defaultOpen}>
        <div className="w-full h-full">
          <Nav />
          <Outlet />
        </div>
      </SidebarProvider>
    </>
  );
};
