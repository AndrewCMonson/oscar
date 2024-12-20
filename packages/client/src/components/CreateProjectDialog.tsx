import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { CreateProjectForm } from "./CreateProjectForm.tsx";

type CreateProjectDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const CreateProjectDialog = ({ open, setOpen }: CreateProjectDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-zinc-900 text-white">
        <DialogHeader>
          <DialogTitle className="text-white">Create New Project</DialogTitle>
          <DialogDescription>
            Create a new project to chat with Oscar
          </DialogDescription>
          <CreateProjectForm />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
