import { AppSidebar } from "@/components/AppSidebar.tsx";
import { Outlet } from "react-router";
import { Nav } from "./components/Nav.tsx";
import { SidebarProvider } from "./components/ui/sidebar.tsx";
import Cookies from "js-cookie";

export const App = () => {
  const defaultOpen = Cookies.get("sidebar:state") === "true";

  return (
    <>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar />
        <div className="h-full w-full flex flex-col">
          <Nav />
          
          <Outlet />
        </div>
      </SidebarProvider>
    </>
  );
};
