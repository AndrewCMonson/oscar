import { Prisma, Project } from "@prisma/client";
import { prismadb } from "@api/src/config/index.js";
import {
  CreateProjectParameters,
  GetProjectsParams,
} from "@api/types/types.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js";

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
  getProjectParams: GetProjectsParams,
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
