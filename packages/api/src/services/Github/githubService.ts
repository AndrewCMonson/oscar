// import axios from "axios";
import { CreateNewIssueData } from "@api/types/types";
import dotenv from "dotenv";
// import { Octokit } from "octokit";
import { getAuth0User } from "@api/src/services/Auth0/auth0Services.js";
import { Octokit } from "@octokit/rest";
dotenv.config();

export class GithubService {
  private octokit!: Octokit;

  constructor(private auth0Sub: string) {}

  static create = async (auth0Sub: string) => {
    const githubService = new GithubService(auth0Sub);

    await githubService.initialize();

    return githubService;
  };

  private initialize = async () => {
    const { githubAccessToken } = await getAuth0User(this.auth0Sub);

    this.octokit = new Octokit({
      auth: githubAccessToken,
    });
  };

  getRepository = async (repositoryName: string, nickname: string) => {
    try {
      const response = await this.octokit.rest.repos.get({
        owner: nickname,
        repo: repositoryName,
      });

      if (response.status !== 200) {
        throw new Error("Repository not found");
      }

      const { data } = response;

      return {
        name: data.name,
        description: data.description ?? "",
        url: data.html_url,
      };
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error fetching repository:", error.message);
      }
      throw new Error("Error fetching repository");
    }
  };

  getRepositories = async () => {
    try {
      const response = await this.octokit.rest.repos.listForAuthenticatedUser();

      if (response.status !== 200) {
        throw new Error("Repositories not found");
      }

      const repositories = response.data.map((repo) => ({
        name: repo.name,
        description: repo.description ?? "",
        url: repo.html_url,
      }));

      return repositories;
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error fetching repositories:", error.message);
      }
      throw new Error("Error fetching repositories");
    }
  };

  createNewRepository = async (repositoryName: string) => {
    try {
      const response = await this.octokit.rest.repos.createForAuthenticatedUser(
        {
          name: repositoryName,
        },
      );

      if (response.status !== 201) {
        throw new Error("Repository not created");
      }

      const { data } = response;

      return {
        name: data.name,
        description: data.description ?? "",
        url: data.html_url,
      };
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error creating repository:", error.message);
      }
      throw new Error("Error creating repository");
    }
  };

  createNewIssue = async (
    nickname: string,
    repositoryName: string,
    issueTitle: string,
    issueBody: string,
  ): Promise<CreateNewIssueData> => {
    try {
      const response = await this.octokit.rest.issues.create({
        owner: nickname,
        repo: repositoryName,
        title: issueTitle,
        body: issueBody,
      });

      if (response.status !== 201) {
        throw new Error("Issue not created");
      }

      const { data } = response;

      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error creating issue:", error.message);
      }
      throw new Error("Error creating issue");
    }
  };
}
