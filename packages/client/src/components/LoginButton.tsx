import { useAuth0 } from "@auth0/auth0-react"
import { ReactElement } from "react"
import { Button } from "./ui/button.tsx";

export const LoginButton = (): ReactElement => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button onClick={() => loginWithRedirect()}>Log In</Button>
  )
}

