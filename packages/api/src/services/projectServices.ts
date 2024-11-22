import { Prisma, Project } from "@prisma/client";
import { prismadb } from "@api/src/config/index.js";
import { CreateProjectParameters } from "@api/types/types.js";

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
