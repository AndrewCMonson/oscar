import { useAuth0 } from "@auth0/auth0-react";
import { forwardRef } from "react";
import { Button, ButtonProps } from "./ui/button/button.tsx";

interface LoginLogoutButtonProps extends ButtonProps {
  variant: ButtonProps["variant"];
  action: "login" | "logout";
}

export const LoginLogoutButton = forwardRef<
  HTMLButtonElement,
  LoginLogoutButtonProps
>(({ variant, action }, ref) => {
  const { logout, loginWithRedirect } = useAuth0();

  const handleLogoutClick = () =>
    logout({ logoutParams: { returnTo: window.location.origin } });
  const handleLoginClick = () => loginWithRedirect();

  return (
    <Button
      onClick={action === "login" ? handleLoginClick : handleLogoutClick}
      variant={variant}
      ref={ref}
    >
      {action === "login" ? <span>Login</span> : <span>Logout</span>}
    </Button>
  );
});
