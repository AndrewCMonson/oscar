import { useAuth0 } from "@auth0/auth0-react";
import { ReactElement } from "react";
import { Button } from "./ui/button/button.tsx";

export const LogoutButton = (): ReactElement => {
  const { logout } = useAuth0();

  return (
    <Button
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
    >
      Log Out
    </Button>
  );
};
