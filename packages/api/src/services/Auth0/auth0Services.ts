import { User } from "auth0";
import axios from "axios";
import { Auth0APIUserWithAccessToken } from "@api/types/types.js";
import dotenv from 'dotenv'

dotenv.config()

/**
 * Fetches an Auth0 user by their user ID and retrieves their GitHub access token.
 *
 * @param userId - The ID of the user to fetch.
 * @returns A promise that resolves to an Auth0 user object with an access token.
 * @throws Will throw an error if no user is found, if no GitHub access token is found, or if there is an error during the request.
 */
export const getAuth0User = async (
  userId: string,
): Promise<Auth0APIUserWithAccessToken> => {
  const domain = process.env.AUTH0_DOMAIN;
  const accessToken = await getAuth0APIKey();
  const trimmedToken = accessToken?.trim();

  try {
    const { data: userData } = await axios.get<User>(
      `https://${domain}/api/v2/users/${userId}`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${trimmedToken}`,
        },
      },
    );

    if (!userData) {
      throw new Error("No Auth0 user associated with user ID");
    }

    const githubAccessToken = userData.identities?.find(
      (identity) => identity.provider === "github",
    )?.access_token;

    if (!githubAccessToken) {
      throw new Error("No github access token associated with user");
    }

    return {
      ...userData,
      githubAccessToken,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error fetching user:",
        error.response?.data || error.message,
      );
      throw new Error("Error getting user's Auth0 user");
    } else {
      if (error instanceof Error) {
        console.error("Error fetching user:", error.message);
        throw new Error("Error getting user's Auth0 user");
      } else {
        console.error("Error fetching user:", error);
        throw new Error("Error getting user's Auth0 user");
      }
    }
  }
};

export const getAuth0APIKey = async (): Promise<string> => {
  try {
    const response = await axios.request({
      method: 'POST',
      url: 'https://dev-bcm7n7u27bjemuzy.us.auth0.com/oauth/token',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: 'PJCHAj5yS7J2L6ULXKTAVl0sQHLcAqpZ',
        client_secret: process.env.AUTH0_CLIENT_SECRET!,
        audience: 'https://dev-bcm7n7u27bjemuzy.us.auth0.com/api/v2/'
      })
    })

    const { access_token } = response.data
    
    return access_token as string
  } catch (e){
    console.log(e)
    throw new Error(`Error fetching Auth0 key: ${e.message}`)
  }
}

