// import axios from "axios";
import { getAuth0User } from "@api/src/services/Auth0/auth0Services.js";
import { Issue, Repository } from "@api/types/generated/graphql.js";
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

  getRepository = async (
    repositoryName: string,
    nickname: string,
  ): Promise<Repository> => {
    try {
      const response = await this.request<GetRepositoryData>(
        "get",
        `repos/${nickname}/${repositoryName}`,
        {
          data: {
            repo: repositoryName,
            repo_owner: nickname,
          },
        },
      );

      if (response.status !== 200) {
        throw new Error(
          `Error fetching repository ${repositoryName}. Response status ${response.status}: ${response.statusText}`,
        );
      }

      const { data } = response;

      return {
        id: data.id,
        name: data.name,
        description: data.description ?? "",
        url: data.html_url,
        language: data.language ?? "",
        isPrivate: data.private,
        // lastPush is a placeholder until API updated
        topics: data.topics ?? [],
        forks: data.forks_count,
        lastPush: "",
        stars: data.stargazers_count,
      };
    } catch (error) {
      if (error instanceof Error) {
        console.error(
          `Error fetching repository ${repositoryName}`,
          error.message,
        );
      }
      throw new Error(`Error fetching repository ${repositoryName}`);
    }
  };

  getRepositories = async (): Promise<Repository[]> => {
    try {
      const response = await this.request<GetRepositoryData[]>("get", "repos", {
        data: {},
      });

      if (response.status !== 200) {
        throw new Error(
          `Error fetching repositories. Response status ${response.status}: ${response.statusText}`,
        );
      }

      const { data } = response;

      const repositories = data.map((repo) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description ?? "",
        url: repo.html_url,
        language: repo.language ?? "",
        isPrivate: repo.private,
        topics: repo.topics ?? [],
        forks: repo.forks_count,
        // lastPush is a placehoder until API updated
        lastPush: "",
        stars: repo.stargazers_count,
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
  ): Promise<Repository> => {
    try {
      const response = await this.request<CreateNewRepositoryData>(
        "post",
        "repos",
        {
          data: {
            name: repositoryName,
            description,
            private: privateRepo,
          },
        },
      );

      if (response.status !== 200) {
        throw new Error(
          `Error creating repository ${repositoryName}. Response status: ${response.status}: ${response.statusText}`,
        );
      }

      const { data } = response;

      return {
        id: data.id,
        name: data.name,
        description: data.description ?? "",
        url: data.html_url,
      };
    } catch (error) {
      if (error instanceof Error) {
        console.error(
          `Error creating repository ${repositoryName}`,
          error.message,
        );
      }
      throw new Error(`Error creating repository ${repositoryName}`);
    }
  };

  createNewIssue = async (
    repositoryName: string,
    nickname: string,
    issueTitle: string,
    issueBody: string,
  ): Promise<Issue> => {
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
        throw new Error(
          `Error creating issue in repository ${repositoryName}. Response status ${response.status}: ${response.statusText}`,
        );
      }

      const { data } = response;

      return {
        title: data.title,
      };
    } catch (error) {
      if (error instanceof Error) {
        console.error(
          `Error creating issue in repository ${repositoryName}`,
          error.message,
        );
      }
      throw new Error(`Error creating issue in repository ${repositoryName}`);
    }
  };
}

// const og = await OscarGit.create("github|139920681");

// og.createNewRepository("test-oscar-repo", "this is a test repo", true)
