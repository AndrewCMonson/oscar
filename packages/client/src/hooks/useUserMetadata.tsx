import {
  AuthenticationError,
  GetTokenSilentlyOptions,
  User,
} from "@auth0/auth0-react";
import { ResponseStyle, Tone } from "@oscar/types/index.ts";
import { useEffect, useState } from "react";

type GetAccessTokenSilentlyType = (
  options?: GetTokenSilentlyOptions,
) => Promise<string>;

interface UseUserMetadataReturn {
  userMetadata: UserMetadata | null;
  loading: boolean;
  error: object | null;
}

export interface UserMetadata {
  chatModel: string;
  integrations: string[];
  preferredLanguage: string;
  responseStyle: ResponseStyle;
  timezone: string;
  tone: Tone;
}

export const useUserMetadata = (
  getAccessTokenSilently: GetAccessTokenSilentlyType,
  user: User | undefined,
): UseUserMetadataReturn => {
  const [userMetadata, setUserMetadata] = useState<UserMetadata>({
    chatModel: "",
    integrations: [],
    preferredLanguage: "",
    responseStyle: ResponseStyle.Conversational,
    timezone: "",
    tone: Tone.Concise,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<AuthenticationError | null>(null);

  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = `${import.meta.env.VITE_AUTH0_DOMAIN}`;

      const audience = `https://dev-bcm7n7u27bjemuzy.us.auth0.com/api/v2/`;

      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: audience,
            scope: "read:current_user",
          },
        });

        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user?.sub}`;

        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const { user_metadata } = await metadataResponse.json();

        setUserMetadata(user_metadata);
        setLoading(false);
      } catch (e) {
        if (e instanceof AuthenticationError) {
          setError(e);
        }
        setLoading(false);
      }
    };

    if (user?.sub) {
      getUserMetadata();
    }
  }, [getAccessTokenSilently, user?.sub]);

  return { userMetadata, loading, error };
};
