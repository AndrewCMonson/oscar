import { Project } from "@/__generated__/graphql.ts";

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
          className={`cursor-pointer ${selectedProject === project.id ? "text-blue-400" : ""}`}
        >
          {project.name}
        </p>
      </li>
    ))}
  </ul>
);
