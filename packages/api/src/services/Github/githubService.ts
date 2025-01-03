// import axios from "axios";
import { getAuth0User } from "@api/src/services/Auth0/auth0Services";
import { CreateNewIssueParameters, CreateNewRepositoryParameters } from "@api/types/types";
import dotenv from "dotenv";
import { Octokit } from "octokit";
dotenv.config();

/**
 * Creates a new repository for the authenticated user.
 *
 * @param userId - The ID of the user for whom the repository is being created.
 * @param repositoryName - The name of the new repository.
 * @returns A promise that resolves to the parameters of the newly created repository.
 * @throws Will throw an error if the repository creation fails.
 */
export const createNewRepository = async (
  userId: string,
  repositoryName: string,
): Promise<CreateNewRepositoryParameters> => {
  try {
    const { access_token } = await getAuth0User(userId);

    const octokit = new Octokit({
      auth: access_token,
    });

    return await octokit.request("POST /user/repos", {
      name: repositoryName,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error creating repository:", error.message);
    }
    throw new Error("Error creating repository");
  }
};

/**
 * Creates a new issue in the specified GitHub repository.
 *
 * @param userId - The ID of the user creating the issue.
 * @param repositoryName - The name of the repository where the issue will be created.
 * @param issueTitle - The title of the issue.
 * @param issueBody - The body content of the issue.
 * @returns A promise that resolves to the parameters of the created issue.
 * @throws Will throw an error if there is an issue with creating the GitHub issue.
 */
export const createNewIssue = async (
  userId: string,
  repositoryName: string,
  issueTitle: string,
  issueBody: string,
): Promise<CreateNewIssueParameters> => {
  try {
    const { nickname, access_token } = await getAuth0User(userId);

    const octokit = new Octokit({
      auth: access_token,
    });

    return await octokit.request("POST /repos/{owner}/{repo}/issues", {
      owner: nickname,
      repo: repositoryName,
      title: issueTitle,
      body: issueBody,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error creating issue:", error.message);
    }
    throw new Error("Error creating issue");
  }
};
