import { CreateProjectForm } from "@/components/CreateProjectForm.tsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type CreateProjectDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  setSelectedProject: (projectId: string | null) => void;
};

export const CreateProjectDialog = ({
  open,
  setOpen,
  setSelectedProject,
}: CreateProjectDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-zinc-900 text-white">
        <DialogHeader>
          <DialogTitle className="text-white">Create New Project</DialogTitle>
          <DialogDescription>
            Create a new project to chat with Oscar
          </DialogDescription>
          <CreateProjectForm
            setOpen={setOpen}
            setSelectedProject={setSelectedProject}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
