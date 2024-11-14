import { ExpressContextFunctionArgument } from "@apollo/server/express4";
import { ContextFunction } from "@apollo/server";
import { prismadb } from "../config/index.js";
import { MiddlewareContext } from "@api/types";

export const middlewareContext: ContextFunction<
  [ExpressContextFunctionArgument],
  MiddlewareContext
> = async ({ req, res }: ExpressContextFunctionArgument): Promise<MiddlewareContext> => {

  try {
    const user = await prismadb.user.findUnique({
      where: { email: "andrew.c.monson@gmail.com" },
    });

    if (!user) {
      throw new Error("User not found");
    }
    return {
      req,
      res,
      user,
    };
  } catch (e) {
    console.error(e);
    throw new Error("An error occurred while fetching the user");
  }
};
