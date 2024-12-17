import { useUserMetadata } from "@/hooks/useUserMetadata.tsx";
import { useAuth0 } from "@auth0/auth0-react";
// import { FC } from "react"

export const Profile = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();

  const { userMetadata } = useUserMetadata(getAccessTokenSilently, user);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <img src={user?.picture} alt={user?.name} />
        <h2>{user?.name}</h2>
        <p>{user?.email}</p>
        <h3>User Metadata</h3>
        {userMetadata ? (
          <p>{JSON.stringify(userMetadata, null, 2)}</p>
        ) : (
          "No user metadata defined"
        )}
      </div>
    )
  );
};
