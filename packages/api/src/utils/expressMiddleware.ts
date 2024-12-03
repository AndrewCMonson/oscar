import { ContextFunction } from "@apollo/server";
import { ExpressContextFunctionArgument } from "@apollo/server/express4";
import jwt from "jsonwebtoken";
import { MiddlewareContext } from "../../types/index.js";
import { prismadb } from "../config/index.js";

export const middlewareContext: ContextFunction<
  [ExpressContextFunctionArgument],
  MiddlewareContext
> = async ({
  req,
  res,
}: ExpressContextFunctionArgument): Promise<MiddlewareContext> => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const incomingUser = req.headers.authorizeduser as string | undefined;

    if(!incomingUser || !token){
      return {
        req,
        res,
      }
    }

    const decoded = token ? jwt.decode(token) : null;
    const authUser = JSON.parse(incomingUser)
    console.log("authorizedUser", authUser)
    console.log("Decoded Token", decoded);
    const domain = `${process.env.AUTH0_DOMAIN}`

    const dbUser = await prismadb.user.findUnique({
      where: {
        auth0sub: authUser.sub
      }
    })

    console.log("DBUSER", dbUser)

    if(!dbUser){
      const createdDBUser = await prismadb.user.create({
        data: {
          auth0sub: authUser.sub
        }
      })

      console.log("CREATEDUSER", createdDBUser)

      return {
        req,
        res,
        user: createdDBUser,
      }
    }

    const userDetailsByIdUrl = `https://${domain}/api/v2/users/${authUser.sub}`;

    const metadataResponse = await fetch(userDetailsByIdUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { user_metadata } = await metadataResponse.json();
    console.log("Metadata", user_metadata);


    return {
      req,
      res,
      user: dbUser,
    };
  } catch (e) {
    console.error(e);
    throw new Error("An error occurred while fetching the user");
  }
};
