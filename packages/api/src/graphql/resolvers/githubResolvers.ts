import { GithubService } from "@api/src/services/Github/githubServiceCopy.js";
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

      const githubService = await GithubService.create(user.auth0sub);

      const repository = await githubService.getRepository(
        repositoryName,
        user.username,
      );

      return repository;
    },
    getRepositories: async (_, __, { user }) => {
      if (!user) {
        throw new Error("User not authenticated");
      }

      const githubService = await GithubService.create(user.auth0sub);

      const repositories = await githubService.getRepositories();

      return { repositories };
    },
  },
  Mutation: {
    createNewRepository: async (_, { repositoryName }, { user }) => {
      if (!user) {
        throw new Error("User not authenticated");
      }

      const githubService = await GithubService.create(user.auth0sub);

      const createdNewRepository =
        await githubService.createNewRepository(repositoryName);

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

      const githubService = await GithubService.create(user.auth0sub);

      if (!user.username) {
        throw new Error("Username required to create issue");
      }

      const createdNewIssue = await githubService.createNewIssue(
        user.username,
        repositoryName,
        issueTitle,
        issueBody,
      );

      return createdNewIssue;
    },
  },
};
