// import axios from "axios";
import { getAuth0User } from "@api/src/services/Auth0/auth0Services.js";
import {
  CreateNewIssueData,
  CreateNewRepositoryData,
  GetRepositoryData,
} from "@api/types/types";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import dotenv from "dotenv";
dotenv.config();

export class OscarGit {
  private githubAccessToken!: string;
  private client!: AxiosInstance;

  constructor(
    private auth0Sub: string,
    private githubServiceURL = process.env.OSCAR_GITHUB_SERVICE_URL!,
  ) {}

  static create = async (auth0Sub: string) => {
    const githubService = new OscarGit(auth0Sub);
    await githubService.initialize();
    return githubService;
  };

  private initialize = async () => {
    const { githubAccessToken } = await getAuth0User(this.auth0Sub);
    this.githubAccessToken = githubAccessToken;

    this.client = axios.create({
      baseURL: this.githubServiceURL,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.githubAccessToken}`,
        "OSCAR-API-KEY": process.env.OSCAR_GITHUB_SERVICE_API_KEY,
      },
    });
  };

  private request = async <T>(
    method: "get" | "post" | "put" | "delete",
    endpoint: string,
    config: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> => {
    const { data, ...restConfig } = config;

    return this.client.request<T>({
      ...restConfig,
      ...(data !== undefined && { data }),
      method,
      url: `${this.githubServiceURL}/${endpoint}`,
    });
  };

  getRepository = async (repositoryName: string, nickname: string) => {
    try {
      const response = await this.request<GetRepositoryData>("get", "repo", {
        data: {
          repo: repositoryName,
          repo_owner: nickname,
        },
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
      const response = await this.request<GetRepositoryData[]>("get", "repos", {
        data: {},
      });

      if (response.status !== 200) {
        throw new Error("Repositories not found");
      }

      const { data } = response;

      const repositories = data.map((repo) => ({
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

  createNewRepository = async (
    repositoryName: string,
    description: string,
    privateRepo: boolean,
  ) => {
    try {
      const response = await this.request<CreateNewRepositoryData>(
        "post",
        "/create-repo",
        {
          data: {
            name: repositoryName,
            description,
            private: privateRepo,
          },
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
      console.error(error);
      throw new Error("Error creating repository");
    }
  };

  createNewIssue = async (
    repositoryName: string,
    nickname: string,
    issueTitle: string,
    issueBody: string,
  ) => {
    try {
      const response = await this.request<CreateNewIssueData>(
        "post",
        "create-issue",
        {
          data: {
            repo: repositoryName,
            repo_owner: nickname,
            title: issueTitle,
            body: issueBody,
          },
        },
      );

      if (response.status !== 200) {
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

// const githubService = await GithubService.create("github|139920681");

// githubService.createNewIssue("test-new-repository", "AndrewCMonson", "Test from node", "test body");
