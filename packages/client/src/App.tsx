import { Nav } from "@/components";
import { SidebarProvider } from "@/components/ui/sidebar.tsx";
import Cookies from "js-cookie";
import { Outlet } from "react-router";

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
