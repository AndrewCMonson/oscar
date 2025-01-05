// import axios from "axios";
import {
  CreateNewIssueData,
  CreateNewIssueResponse,
  CreateNewRepositoryData,
  CreateNewRepositoryResponse,
  GetRepositoriesData,
  GetRepositoriesResponse,
  GetRepositoryData,
  GetRepositoryResponse,
} from "@api/types/types";
import dotenv from "dotenv";
import { Octokit } from "octokit";
import { getAuth0User } from "../Auth0/auth0Services.js";
dotenv.config();

// /**
//  * Creates a new repository for the authenticated user.
//  *
//  * @param userId - The ID of the user for whom the repository is being created.
//  * @param repositoryName - The name of the new repository.
//  * @returns A promise that resolves to the parameters of the newly created repository.
//  * @throws Will throw an error if the repository creation fails.
//  */
// export const createNewRepository = async (
//   userId: string,
//   repositoryName: string,
// ): Promise<CreateNewRepositoryParameters> => {
//   try {
//     const { access_token } = await getAuth0User(userId);

//     const octokit = new Octokit({
//       auth: access_token,
//     });

//     return await octokit.request("POST /user/repos", {
//       name: repositoryName,
//     });
//   } catch (error) {
//     if (error instanceof Error) {
//       console.error("Error creating repository:", error.message);
//     }
//     throw new Error("Error creating repository");
//   }
// };

// /**
//  * Creates a new issue in the specified GitHub repository.
//  *
//  * @param userId - The ID of the user creating the issue.
//  * @param repositoryName - The name of the repository where the issue will be created.
//  * @param issueTitle - The title of the issue.
//  * @param issueBody - The body content of the issue.
//  * @returns A promise that resolves to the parameters of the created issue.
//  * @throws Will throw an error if there is an issue with creating the GitHub issue.
//  */
// export const createNewIssue = async (
//   userId: string,
//   repositoryName: string,
//   issueTitle: string,
//   issueBody: string,
// ): Promise<CreateNewIssueParameters> => {
//   try {
//     const { nickname, access_token } = await getAuth0User(userId);

//     const octokit = new Octokit({
//       auth: access_token,
//     });

//     return await octokit.request("POST /repos/{owner}/{repo}/issues", {
//       owner: nickname,
//       repo: repositoryName,
//       title: issueTitle,
//       body: issueBody,
//     });
//   } catch (error) {
//     if (error instanceof Error) {
//       console.error("Error creating issue:", error.message);
//     }
//     throw new Error("Error creating issue");
//   }
// };

export class GithubService {
  private octokit: Octokit;

  constructor(private auth0Sub: string) {
    this.initialize();
  }

  private initialize = async () => {
    const { githubAccessToken } = await getAuth0User(this.auth0Sub);

    this.octokit = new Octokit({
      auth: githubAccessToken,
    });
  };

  getRepository = async (
    repositoryName: string,
    nickname: string,
  ): Promise<GetRepositoryData> => {
    try {
      const response: GetRepositoryResponse = await this.octokit(
        "GET /repos/{owner}/{repo}",
        {
          owner: nickname,
          repo: repositoryName,
        },
      );

      if (response.status !== 200) {
        throw new Error("Repository not found");
      }

      const { data } = response;

      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error fetching repository:", error.message);
      }
      throw new Error("Error fetching repository");
    }
  };

  getRepositories = async (): Promise<GetRepositoriesData> => {
    try {
      const response: GetRepositoriesResponse =
        this.octokit.request("GET /user/repos");

      if (response.status !== 200) {
        throw new Error("Repositories not found");
      }

      const { data } = response;

      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error fetching repositories:", error.message);
      }
      throw new Error("Error fetching repositories");
    }
  };

  createNewRepository = async (
    repositoryName: string,
  ): Promise<CreateNewRepositoryData> => {
    try {
      const response: CreateNewRepositoryResponse = await this.octokit.request(
        "POST /user/repos",
        {
          name: repositoryName,
        },
      );

      if (response.status !== 201) {
        throw new Error("Repository not created");
      }

      const { data } = response;

      return data;
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
      const response: CreateNewIssueResponse = await this.octokit.request(
        "POST /repos/{owner}/{repo}/issues",
        {
          owner: nickname,
          repo: repositoryName,
          title: issueTitle,
          body: issueBody,
        },
      );

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
