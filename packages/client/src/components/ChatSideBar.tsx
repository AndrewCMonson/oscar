import { Button } from "@/components/ui/button.tsx";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Project } from "@/gql/graphql.ts";
import { DeleteProject } from "@/utils/graphql/mutations.ts";
import { ChatGPTMessage } from "@api/types/types.ts";
import { useMutation } from "@apollo/client";
import { PlusCircleIcon, Trash } from "lucide-react";
import { MouseEvent } from "react";
import { useNavigate } from "react-router";

interface ChatSidebarProps {
  projects: Project[];
  selectedProject: string;
  handleProjectSelection: (projectId: string | null) => void;
  setOpen: (open: boolean) => void;
  setMessages: (messages: ChatGPTMessage[]) => void;
}

export const ChatSidebar = ({
  projects,
  selectedProject,
  handleProjectSelection,
  setOpen,
  setMessages,
}: ChatSidebarProps) => {
  const navigate = useNavigate();

  const [deleteProject] = useMutation(DeleteProject, {
    onCompleted: () => {
      console.log("Project deleted");
      handleProjectSelection(null);
      setMessages([]);
      navigate("/chat");
    },
    refetchQueries: ["GetUser"],
    onError: (error) => {
      console.error(error);
    },
  });

  const handleDeleteProject = (e: MouseEvent<HTMLButtonElement>, projectId: string) => {
    e.stopPropagation();
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
                      onClick={(e) => handleDeleteProject(e, project.id)}
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
