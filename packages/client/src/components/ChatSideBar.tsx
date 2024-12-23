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
import { PlusCircleIcon, Trash } from "lucide-react";
import { useMutation } from "@apollo/client";
import { DeleteProject } from "@/utils/graphql/mutations.ts";
import { useNavigate } from "react-router";

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
  const navigate = useNavigate();

  const [deleteProject] = useMutation(DeleteProject, {
    onCompleted: () => {
      navigate("/chat");
      window.location.reload();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleDeleteProject = (projectId: string) => {
    deleteProject({
      variables: {
        id: projectId,
      },
    });
  };

  return (
    <Sidebar>
      <SidebarHeader className="bg-zinc-900">
        <SidebarTrigger className="text-white" aria-label="Close the sidebar" />
      </SidebarHeader>
      <SidebarContent className="bg-zinc-900 text-white">
        <SidebarGroupLabel className="text-white text-md flex flex-row justify-between items-center">
          <p>Projects</p>
          <Button
            aria-label="Create a new project"
            onClick={() => setOpen(true)}
            className="bg-transparent hover:scale-125 text-white font-semibold hover:text-white py-1 px-2 border border-transparent rounded"
          >
            <PlusCircleIcon size={24} className="mt-1" />
          </Button>
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {projects?.map((project) => (
              <SidebarMenuItem key={project.id}>
                <SidebarMenuButton asChild variant="default">
                  <div
                    className={`flex flex-row justify-between items-center w-full cursor-pointer ${selectedProject === project.id ? "w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white hover:text-white shadow-xl  transition-transform rounded overflow-x-hidden" : ""}`}
                    onClick={() => handleProjectSelection(project.id)}
                  >
                    <p className="truncate">{project.name}</p>
                    <Button
                      className="bg-transparent hover:bg-red-500 text-white font-semibold hover:text-white py-1 px-2 border border-transparent rounded"
                      onClick={() => handleDeleteProject(project.id)}
                    >
                      <Trash size={18} className="cursor-pointer" />
                    </Button>
                  </div>
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
