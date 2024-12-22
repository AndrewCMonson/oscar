import { useAuth0 } from "@auth0/auth0-react";
import { MouseEvent } from "react";
import { Link, useLocation } from "react-router";
import { LoginLogoutButton } from "./LoginLogoutButton.tsx";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar.tsx";
import { Button } from "./ui/button/button.tsx";

export const Nav = () => {
  const location = useLocation();

  const { isAuthenticated, user } = useAuth0();

  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>, to: string) => {
    if (location.pathname === to) {
      e.preventDefault();
    }
  };

  return (
    <div className="p-2 mr-2 flex justify-end items-center gap-2 text-white overflow-hidden">
      <div className="flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          <Button variant={"ghost"}>Home</Button>
        </Link>
        {isAuthenticated && (
          <Link
            to="/chat"
            className="[&.active]:font-bold"
            onClick={(e) => handleLinkClick(e, "/chat")}
          >
            <Button variant={"ghost"}>Chat</Button>
          </Link>
        )}
      </div>

      <div className="flex items-center gap-2">
        {!isAuthenticated ? (
          <LoginLogoutButton action={"login"} variant={"ghost"} />
        ) : (
          <LoginLogoutButton action={"logout"} variant="ghost" />
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
    </div>
  );
};
