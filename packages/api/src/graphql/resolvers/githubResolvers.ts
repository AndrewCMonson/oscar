import { Resolvers } from "@api/types/generated/graphql.js";
import { GithubService } from "@api/src/services/Github/githubService.js";
import { getAuth0User } from "@api/src/services/Auth0/auth0Services.js";

export const githubResolvers: Resolvers = {
  Query: {
    getRepository: async (_, { repositoryName }, { user }) => {
      if (!user) {
        throw new Error("User not authenticated");
      }

      const githubService = new GithubService(user.sub)

      const { name, description, html_url } = await githubService.getRepository(repositoryName, user.nickname);

      return {
        name,
        description,
        url: html_url,
      }
    },
    getRepositories: async (_, __, { user }) => {
      if (!user) {
        throw new Error("User not authenticated");
      }

      const githubService = new GithubService(user.sub)

      const repositoryData = await githubService.getRepositories();

      const strippedRepositoryData = repositoryData.map((repository) => {
        return {
          name: repository.name,
          description: repository.description,
          url: repository.html_url,
        };
      });

      return strippedRepositoryData;
    },
  },
  Mutation: {
    createNewRepository: async (_, { repositoryName }, { user }) => {
      if (!user) {
        throw new Error("User not authenticated");
      }

      const githubService = new GithubService(user.sub)

      return githubService.createNewRepository(repositoryName);
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
