import { ContextFunction } from "@apollo/server";
import { ExpressContextFunctionArgument } from "@apollo/server/express4";
import { MiddlewareContext } from "../../types/index.js";
import { prismadb } from "../config/index.js";
import jwt from "jsonwebtoken";

export const middlewareContext: ContextFunction<
  [ExpressContextFunctionArgument],
  MiddlewareContext
> = async ({
  req,
  res,
}: ExpressContextFunctionArgument): Promise<MiddlewareContext> => {
  try {
    console.log(req.headers.authorization)

    const token = req.headers.authorization?.split(" ")[1];

    console.log(token)

    const decoded = token ? jwt.decode(token) : null;

    console.log(decoded)

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
