import { ContextFunction } from "@apollo/server";
import { ExpressContextFunctionArgument } from "@apollo/server/express4";
import { MiddlewareContext, IncomingUser } from "@oscar/types/apiTypes/types.js";
import { prismadb } from "@api/src/config/index.js";

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
    const incomingUser = req.headers.authorizeduser as string | undefined;

    if (!incomingUser || incomingUser === "undefined") {
      return {
        req,
        res,
      };
    }

    if (!token) {
      throw new Error("User not authorized");
    }

    const authUser: IncomingUser = JSON.parse(incomingUser);

    const dbUser = await prismadb.user.findUnique({
      where: {
        auth0sub: authUser.sub,
      },
    });

    if (!dbUser) {
      const createdDBUser = await prismadb.user.create({
        data: {
          auth0sub: authUser.sub,
          firstName: authUser.given_name || authUser.name?.split(" ")[0],
          lastName: authUser.family_name || authUser.name?.split(" ")[1],
          username: authUser.nickname || authUser.username,
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
