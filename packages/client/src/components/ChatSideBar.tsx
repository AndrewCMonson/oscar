import { Project } from "@/__generated__/graphql.ts";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenu,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button.tsx";
import { PlusCircleIcon } from "lucide-react";

interface ChatSidebarProps {
  projects: Project[];
  selectedProject: string;
  handleProjectSelection: (projectId: string) => void;
  setOpen: (open: boolean) => void;
}

export const ChatSidebar = ({
  projects,
  selectedProject,
  handleProjectSelection,
  setOpen,
}: ChatSidebarProps) => {
  return (
    <Sidebar>
      {/* <SidebarTrigger /> */}
      <SidebarHeader className="bg-zinc-900">
        <SidebarTrigger className="text-white" aria-label="Close the sidebar" />
      </SidebarHeader>
      <SidebarContent className="bg-zinc-900 text-white">
        <SidebarGroupLabel className="text-white text-md flex flex-row justify-between items-center">
          <p>Projects</p>
          <Button aria-label="Create a new project" onClick={() => setOpen(true)}>
            <PlusCircleIcon size={24} className="mt-1" />
          </Button>
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {projects?.map((project) => (
              <SidebarMenuItem key={project.id}>
                <SidebarMenuButton asChild>
                  <p
                    onClick={() => handleProjectSelection(project.id)}
                    className={`cursor-pointer p-2 ${selectedProject === project.id ? "w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white shadow-xl  transition-transform rounded overflow-x-hidden" : ""}`}
                  >
                    {project.name}
                  </p>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter className="bg-zinc-900" />
    </Sidebar>
  );
};
