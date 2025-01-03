// import axios from "axios";
import { getAuth0User } from "@api/src/services/Auth0/auth0Services";
import dotenv from "dotenv";
import { Octokit } from "octokit";

dotenv.config();

// type CreateIssueParams = Endpoints["POST /repos/{owner}/{repo}/issues"]["parameters"];

export const createNewRepository = async (
  userId: string,
  repositoryName: string,
) => {
  try {
    const { access_token } = await getAuth0User(userId);

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
    const { nickname, access_token } = await getAuth0User(userId);

    const octokit = new Octokit({
      auth: access_token,
    });

    await octokit.request("POST /repos/{owner}/{repo}/issues", {
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

// const accessToken = await getUserGithubAccessToken('github|139920681');
// console.log(accessToken);
