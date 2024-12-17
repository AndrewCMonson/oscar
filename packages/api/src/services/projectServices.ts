import { Prisma, Project, ProjectMetadata } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js";
import {
  CreateProjectParameters,
  GetProjectsParameters,
  UpdateProjectDataParameters,
} from "@api/types";
import { prismadb } from "../config/index.js";

export const createProject = async (
  createProjectParams: CreateProjectParameters,
): Promise<Project> => {
  if (!createProjectParams) {
    throw new Error("No parameters provided to create project");
  }

  const { name, userId } = createProjectParams;

  try {
    const createdProject = await prismadb.project.create({
      data: {
        name,
        userId,
      },
    });

    if (!createdProject) {
      throw new Error("Error creating the project");
    }
    return createdProject;
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      console.error(e);
      throw new Error("Database Error occured when creating project");
    } else {
      throw new Error("Error creating the project");
    }
  }
};

export const getProjects = async (
  getProjectParams: GetProjectsParameters,
): Promise<Project[]> => {
  if (!getProjectParams) {
    throw new Error("No params provided to get projects");
  }

  const { userId } = getProjectParams;

  try {
    const projects = await prismadb.project.findMany({
      where: {
        userId,
      },
    });

    if (!projects) {
      return [];
    }

    return projects;
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      throw new Error("Error with prisma DB action");
    } else {
      throw new Error("Error getting projects");
    }
  }
};

export const updateProject = async (
  updateProjectParams: UpdateProjectDataParameters,
): Promise<ProjectMetadata> => {
  if (!updateProjectParams) {
    throw new Error("Invalid parameters for updating a project");
  }

  const { status, tags, startDate, endDate, priority, id } =
    updateProjectParams;

  const newStartDate = new Date(startDate);

  try {
    const projectContext = await prismadb.projectContext.findFirst({
      where: {
        projectId: id,
      },
      include: {
        metadata: true,
      },
    });

    if (!projectContext) {
      throw new Error("Unable to find project context during project update");
    }

    const projectMetaData = await prismadb.projectMetadata.findUnique({
      where: {
        id: projectContext?.metadata?.id,
      },
    });

    return await prismadb.projectMetadata.update({
      where: {
        id: projectMetaData?.id,
      },
      data: {
        startDate: newStartDate,
        endDate:
          endDate === ""
            ? new Date(
                new Date(newStartDate).setMonth(newStartDate.getMonth()) + 6,
              )
            : new Date(endDate),
        status,
        priority,
        tags,
      },
    });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      throw new Error("Error with prisma DB updating project data");
    } else {
      throw new Error("Error updating project metadata");
    }
  }
};
