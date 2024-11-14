import { ExpressContextFunctionArgument } from "@apollo/server/express4";
import { ContextFunction } from "@apollo/server";
import { prismadb } from "../config/index.js";
import { User } from "@prisma/client";
import { Request, Response } from "express";

interface MiddlewareContext {
  user?: User | null;
  req: Request;
  res: Response;
}

const devUser = await prismadb.user.findUnique({
  where: { email: "andrew.c.monson@gmail.com" },
});

export const middlewareContext: ContextFunction<
  [ExpressContextFunctionArgument],
  MiddlewareContext
> = async ({ req, res }: ExpressContextFunctionArgument) => {
  if (process.env.NODE_ENV === "development") {
    return {
      req,
      res,
      user: devUser,
    };
  }

  return {
    req,
    res,
    user: null,
  };
};
