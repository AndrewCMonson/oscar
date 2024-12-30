import { Project, ProjectMetadata } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js";
import {
  GetProjectsParameters,
  UpdateProjectDataParameters,
} from "@oscar/types/apiTypes/types.js";
import { prismadb } from "@api/src/config/index.js";

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
