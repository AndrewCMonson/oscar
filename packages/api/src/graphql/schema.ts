import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { loadFilesSync } from "@graphql-tools/load-files";
import path from "path";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { fileURLToPath } from "url";
import { typeDefs as scalarTypeDefs } from "graphql-scalars";
import {
  chatResolvers,
  messageResolvers,
  projectResolvers,
  taskResolvers,
  userResolvers,
} from "./resolvers";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const typeDefs = [
  mergeTypeDefs(loadFilesSync(path.join(__dirname, "./typeDefs/*.graphql"))),
  ...scalarTypeDefs,
];

export const resolvers = mergeResolvers([
  chatResolvers,
  messageResolvers,
  projectResolvers,
  taskResolvers,
  userResolvers,
]);

export const schema = makeExecutableSchema({ typeDefs, resolvers });
