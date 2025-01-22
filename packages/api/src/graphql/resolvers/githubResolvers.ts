import { prismadb } from "@api/src/config/index.js";
import { OscarGit } from "@api/src/services/Github/githubService.js";
import { Resolvers } from "@api/types/generated/graphql.js";

export const githubResolvers: Resolvers = {
  Query: {
    getRepository: async (_, { repositoryName }, { user }) => {
      if (!user) {
        throw new Error("User not authenticated");
      }

      if (!user.username) {
        throw new Error("Username required to fetch repository");
      }

      const og = await OscarGit.create(user.auth0sub);

      const repository = await og.getRepository(repositoryName, user.username);

      return repository;
    },
    getRepositories: async (_, __, { user }) => {
      if (!user) {
        throw new Error("User not authenticated");
      }

      if (!user.username) {
        throw new Error("Username required to fetch repositories");
      }

      const og = await OscarGit.create(user.auth0sub);

      const repositories = await og.getRepositories(user.username);

      const projects = await prismadb.project.findMany();

      const reposWithProjectIds = repositories.map((repo) => {
        const project = projects.find(
          (project) => project.repositoryId === repo.id,
        );
        return {
          ...repo,
          projectId: project?.id,
        };
      });

      return { repositories: reposWithProjectIds };
    },
  },
  Mutation: {
    createNewRepository: async (
      _,
      { repositoryName, description, privateRepo },
      { user },
    ) => {
      if (!user) {
        throw new Error("User not authenticated");
      }

      const og = await OscarGit.create(user.auth0sub);

      const createdNewRepository = await og.createNewRepository(
        repositoryName,
        description,
        privateRepo,
      );

      return createdNewRepository;
    },
    createNewIssue: async (
      _,
      { repositoryName, issueTitle, issueBody },
      { user },
    ) => {
      if (!user) {
        throw new Error("User not authenticated");
      }

      const og = await OscarGit.create(user.auth0sub);

      if (!user.username) {
        throw new Error("Username required to create issue");
      }

      const createdNewIssue = await og.createNewIssue(
        user.username,
        repositoryName,
        issueTitle,
        issueBody,
      );

      return createdNewIssue;
    },
  },
};
