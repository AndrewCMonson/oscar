import { User } from "auth0";
import axios from "axios";
import { Auth0UserWithAccessToken } from "@api/types/types.js";

/**
 * Fetches an Auth0 user by their user ID and retrieves their GitHub access token.
 *
 * @param userId - The ID of the user to fetch.
 * @returns A promise that resolves to an Auth0 user object with an access token.
 * @throws Will throw an error if no user is found, if no GitHub access token is found, or if there is an error during the request.
 */
export const getAuth0User = async (
  userId: string,
): Promise<Auth0UserWithAccessToken> => {
  const domain = process.env.AUTH0_DOMAIN;
  const token = process.env.AUTH0_MANAGEMENT_API_TOKEN;
  const trimmedToken = token?.trim();

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

    const access_token = userData.identities?.find(
      (identity) => identity.provider === "github",
    )?.access_token;

    if (!access_token) {
      throw new Error("No github access token associated with user");
    }

    return {
      ...userData,
      access_token,
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
