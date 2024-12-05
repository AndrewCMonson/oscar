import { ContextFunction } from "@apollo/server";
import { ExpressContextFunctionArgument } from "@apollo/server/express4";
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

    if (!incomingUser) {
      return {
        req,
        res,
      };
    }

    if (!token) {
      throw new Error("User not authorized");
    }

    const authUser = JSON.parse(incomingUser);

    const dbUser = await prismadb.user.findUnique({
      where: {
        auth0sub: authUser.sub,
      },
    });

    if (!dbUser) {
      const createdDBUser = await prismadb.user.create({
        data: {
          auth0sub: authUser.sub,
        },
      });

      return {
        req,
        res,
        user: createdDBUser,
      };
    }

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
