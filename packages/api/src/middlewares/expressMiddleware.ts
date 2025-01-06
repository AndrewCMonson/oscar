import { prismadb } from "@api/src/config/index.js";
import { getAuth0User } from "@api/src/services/Auth0/auth0Services.js";
import { MiddlewareContext } from "@api/types/types.js";
import { ContextFunction } from "@apollo/server";
import { ExpressContextFunctionArgument } from "@apollo/server/express4";
import { verifyToken } from "@api/src/utils/index.js";
import { createUserInitialLogin } from "@api/src/services/index.js";
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

    if (!token) {
      return {
        req,
        res,
      };
    }

    const decodedToken = await verifyToken(token);

    if (!decodedToken) {
      throw new Error("User not authorized");
    }

    if (!decodedToken?.sub) {
      throw new Error("No authorized user found");
    }

    const { githubAccessToken, nickname, email } = await getAuth0User(
      decodedToken.sub,
    );

    const dbUser = await prismadb.user.findUnique({
      where: {
        auth0sub: decodedToken.sub,
      },
    });

    if (!dbUser) {
      const createdUser = await createUserInitialLogin({
        email,
        githubAccessToken,
        nickname,
        sub: decodedToken.sub,
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
          auth0sub: decodedToken.sub,
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
