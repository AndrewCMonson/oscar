import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "@tanstack/react-router";
import { LoginLogoutButton } from "./LoginLogoutButton.tsx";
import { Button } from "./ui/button/button.tsx";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar.tsx";

export const Nav = () => {
  const { user } = useAuth0();

  return (
    <div className="p-2 flex gap-2 justify-center">
      <Link to="/" className="[&.active]:font-bold">
        <Button variant={"ghost"}>Home</Button>
      </Link>{" "}
      {user && (
        <Link to="/chat" className="[&.active]:font-bold">
          <Button variant={"ghost"}>Chat</Button>
        </Link>
      )}
      {!user ? (
        <LoginLogoutButton
          action={"login"}
          variant={"ghost"}
        ></LoginLogoutButton>
      ) : (
        <LoginLogoutButton
          action={"logout"}
          variant="ghost"
        ></LoginLogoutButton>
      )}
      {user && (
        <Link to="/profile">
          <Avatar>
            <AvatarImage src={user?.picture} />
            <AvatarFallback>O</AvatarFallback>
          </Avatar>
        </Link>
      )}
    </div>
  );
};
