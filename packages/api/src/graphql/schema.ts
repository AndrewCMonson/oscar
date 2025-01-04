import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { loadFilesSync } from "@graphql-tools/load-files";
import path from "path";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { fileURLToPath } from "url";
import { typeDefs as scalarTypeDefs } from "graphql-scalars";
import {
  conversationResolvers,
  messageResolvers,
  projectResolvers,
  taskResolvers,
  userResolvers,
  assistantResolvers,
  githubResolvers,
} from "./resolvers/index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const typeDefs = [
  mergeTypeDefs(loadFilesSync(path.join(__dirname, "./typeDefs/*.graphql"))),
  ...scalarTypeDefs,
];

export const resolvers = mergeResolvers([
  conversationResolvers,
  messageResolvers,
  projectResolvers,
  taskResolvers,
  userResolvers,
  assistantResolvers,
  githubResolvers,
]);

export const schema = makeExecutableSchema({ typeDefs, resolvers });
