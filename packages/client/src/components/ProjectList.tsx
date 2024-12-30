import { Project } from "@oscar/types/index.ts";

interface ProjectListProps {
  projects: Project[];
  selectedProject: string;
  handleProjectSelection: (projectId: string) => void;
}

export const ProjectList = ({
  projects,
  selectedProject,
  handleProjectSelection,
}: ProjectListProps) => (
  <ul>
    {projects?.map((project) => (
      <li key={project.id}>
        <p
          onClick={() => handleProjectSelection(project.id)}
          className={`cursor-pointer mt-2 p-2 ${selectedProject === project.id ? "w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white shadow-xl hover:scale-105 transition-transform rounded" : ""}`}
        >
          {project.name}
        </p>
      </li>
    ))}
  </ul>
);
