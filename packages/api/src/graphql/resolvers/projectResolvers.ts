import { prismadb } from "@api/src/config/db.js";

export const projectResolvers = {
  Query: {
    projects: async () => {
      const projects = await prismadb.project.findMany();
      return projects;
    },
    project: async (_, { id }) => {
      const project = await prismadb.project.findUnique({
        where: {
          id: id,
        },
      });
      return project;
    },
  },
  Mutation: {
    createProject: async (_, { data }) => {
      const project = await prismadb.project.create({
        data: {
          ...data,
        },
      });
      return project;
    },
    updateProject: async (_, { id, data }) => {
      const project = await prismadb.project.update({
        where: {
          id: id,
        },
        data: {
          ...data,
        },
      });
      return project;
    },
    deleteProject: async (_, { id }) => {
      const project = await prismadb.project.delete({
        where: {
          id: id,
        },
      });
      return project
  },
  },
};