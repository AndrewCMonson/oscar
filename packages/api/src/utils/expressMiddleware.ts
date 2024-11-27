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
