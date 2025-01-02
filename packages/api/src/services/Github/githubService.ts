import axios from "axios";
import dotenv from "dotenv";
import { Octokit } from "octokit";
import { getAuth0User } from "@api/src/services/Auth0/auth0Services";
import { Auth0Identity } from "@api/types/types.js";
// import { Endpoints } from "@octokit/types";

dotenv.config();

// type CreateIssueParams = Endpoints["POST /repos/{owner}/{repo}/issues"]["parameters"];

export const getUserGithubAccessToken = async (
  userId: string,
): Promise<string> => {
  const domain = process.env.AUTH0_DOMAIN; // e.g., 'your-tenant.auth0.com'
  const token = process.env.AUTH0_MANAGEMENT_API_TOKEN; // Replace with your generated token

  const trimmedToken = token?.trim();

  try {
    const response = await axios.get(
      `https://${domain}/api/v2/users/${userId}`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${trimmedToken}`,
        },
      },
    );

    const identities = response.data.identities as Auth0Identity[];

    const access_token = identities.find(
      (identity) => identity.provider === "github",
    )?.access_token;

    if (!access_token) {
      throw new Error("User does not have a Github access token");
    }

    return access_token;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error fetching user:",
        error.response?.data || error.message,
      );
    }
    if (error instanceof Error) {
      console.error("Error fetching user:", error.message);
    }
    throw new Error("Error getting user's Github access token");
  }
};

export const createNewRepository = async (
  userId: string,
  repositoryName: string,
) => {
  try {
    const user = await getAuth0User(userId);

    const identities = user.identities as Auth0Identity[];

    const access_token = identities.find(
      (identity) => identity.provider === "github",
    )?.access_token;

    const octokit = new Octokit({
      auth: access_token,
    });

    await octokit.request("POST /user/repos", {
      name: repositoryName,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error creating repository:", error.message);
    }
    throw new Error("Error creating repository");
  }
};

export const createNewIssue = async (
  userId: string,
  repositoryName: string,
  issueTitle: string,
  issueBody: string,
) => {
  try {
    const user = await getAuth0User(userId);

    const identities = user.identities as Auth0Identity[];

    const access_token = identities.find(
      (identity) => identity.provider === "github",
    )?.access_token;

    console.log(access_token);

    const octokit = new Octokit({
      auth: access_token,
    });

    await octokit.request("POST /repos/{owner}/{repo}/issues", {
      owner: user.nickname,
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

// const accessToken = await getUserGithubAccessToken('github|139920681');
// console.log(accessToken);
