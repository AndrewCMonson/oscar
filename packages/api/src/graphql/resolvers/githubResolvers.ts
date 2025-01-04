import { Resolvers } from "@api/types/generated/graphql.js";
import { GithubService } from "@api/src/services/Github/githubService.js";
import { getAuth0User } from "@api/src/services/Auth0/auth0Services.js";

export const githubResolvers: Resolvers = {
  Query: {
    getRepository: async (_, { repositoryName }, { user }) => {
      if (!user) {
        throw new Error("User not authenticated");
      }

      if(!user.username) {
        throw new Error("Username required to fetch repository");
      }

      const githubService = new GithubService(user.auth0sub)

      const { name, description, url } = await githubService.getRepository(repositoryName, user.username);

      return {
        name,
        description: description ?? undefined,
        url,
      };
    },
    getRepositories: async (_, __, { user }) => {
      if (!user) {
        throw new Error("User not authenticated");
      }

      const githubService = new GithubService(user.auth0sub)

      const repositories = await githubService.getRepositories();

      const strippedRepositories = repositories.map(({ name, description, url }) => ({
        name,
        description: description ?? undefined,
        url,
      }));

      return strippedRepositories;
    },
  },
  Mutation: {
    createNewRepository: async (_, { repositoryName }, { user }) => {
      if (!user) {
        throw new Error("User not authenticated");
      }

      const githubService = new GithubService(user.auth0sub)

      const repo = githubService.createNewRepository(repositoryName);

      return repo;
    },
    createNewIssue: async (_, { repositoryName, issueTitle, issueBody }, { user }) => {
      if (!user) {
        throw new Error("User not authenticated");
      }

      const { nickname } = await getAuth0User(user)

      if (!nickname) {
        throw new Error("User not found");
      }

      const githubService = new GithubService(user.sub)

      return githubService.createNewIssue(user.username, repositoryName, issueTitle, issueBody);
    },
  }
};
