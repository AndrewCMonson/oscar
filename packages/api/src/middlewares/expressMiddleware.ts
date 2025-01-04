import { prismadb } from "@api/src/config/index.js";
import { getAuth0User } from "@api/src/services/Auth0/auth0Services.js";
import { auth0UserSchema } from "@api/src/utils/Zod/schemas.js";
import { MiddlewareContext } from "@api/types/types.js";
import { ContextFunction } from "@apollo/server";
import { ExpressContextFunctionArgument } from "@apollo/server/express4";
import { createUserInitialLogin } from "../services/userServices.js";
/**
 * Middleware context function to handle user authentication and context creation.
 *
 * @param {ExpressContextFunctionArgument} param0 - The Express context function argument containing the request and response objects.
 * @returns {Promise<MiddlewareContext>} - A promise that resolves to the middleware context containing the request, response, and optionally the authenticated user.
 * @throws {Error} - Throws an error if the user is not authorized or if an error occurs while fetching the user.
 *
 * @example
 * // Example usage in an Express middleware
 * app.use(async (req, res, next) => {
 *   try {
 *     const context = await middlewareContext({ req, res });
 *     req.context = context;
 *     next();
 *   } catch (error) {
 *     res.status(401).send(error.message);
 *   }
 * });
 */


export const middlewareContext: ContextFunction<
  [ExpressContextFunctionArgument],
  MiddlewareContext
> = async ({
  req,
  res,
}: ExpressContextFunctionArgument): Promise<MiddlewareContext> => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const auth0UserJSON = req.headers.authorizeduser as string | null;
    
    if (!token) {
      return {
        req,
        res,
      };
    }

    if (!auth0UserJSON) {
      throw new Error("No authorized user found");
    }

    const authorizedUser = auth0UserSchema.parse(auth0UserJSON ? JSON.parse(auth0UserJSON) : null);

    if(!authorizedUser.sub) {
      throw new Error("User not authorized");
    }

    const { githubAccessToken } = await getAuth0User(authorizedUser.sub);

    const dbUser = await prismadb.user.findUnique({
      where: {
        auth0sub: authorizedUser.sub,
      },
    });

    if (!dbUser) {
      const createdUser = await createUserInitialLogin({
        ...authorizedUser,
        githubAccessToken,
      });

      return {
        req,
        res,
        user: createdUser,
      };
    }

    if (githubAccessToken !== dbUser.githubAccessToken) {
      const updatedUser = await prismadb.user.update({
        where: {
          auth0sub: authorizedUser.sub,
        },
        data: {
          githubAccessToken,
        },
      });

      return {
        req,
        res,
        user: updatedUser,
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
