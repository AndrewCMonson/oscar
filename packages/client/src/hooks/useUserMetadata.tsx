import {
  User,
  GetTokenSilentlyOptions,
  AuthenticationError,
} from "@auth0/auth0-react";
import { useState, useEffect, useRef } from "react";

type GetAccessTokenSilentlyType = (
  options?: GetTokenSilentlyOptions,
) => Promise<string>;

interface UseUserMetadataReturn {
  userMetadata: UserMetadata | null;
  loading: boolean;
  error: object | null;
}

interface UserMetadata {
  chatModel: string;
  integrations: string;
  preferredLanguage: string;
  responseStyle: string;
  timezone: string;
  tone: string;
}

export const useUserMetadata = (
  getAccessTokenSilently: GetAccessTokenSilentlyType,
  user: User | undefined,
): UseUserMetadataReturn => {
  const [userMetadata, setUserMetadata] = useState<UserMetadata>({
    chatModel: "",
    integrations: "",
    preferredLanguage: "",
    responseStyle: "",
    timezone: "",
    tone: "",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<AuthenticationError | null>(null);
  const lastFetchedUser = useRef<User | undefined>(user);

  useEffect(() => {
    if (lastFetchedUser.current?.sub === user?.sub) {
      return;
    }

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
