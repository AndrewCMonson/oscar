import { ApolloServer, BaseContext } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import express, { Response } from "express";
import { connectDB } from "./src/config/db.js";
import { schema } from "./src/graphql/schema.js";
import { middlewareContext } from "./src/utils/index.js";

const PORT = process.env.PORT || 3005;

const startServer = async () => {
  const app = express();

  const server = new ApolloServer<BaseContext>({
    schema,
  });
  await server.start();

  app.use(
    "/graphql",
    express.json(),
    express.urlencoded({ extended: true }),
    cors(),
    expressMiddleware(server, {
      context: middlewareContext,
    }),
  );

  await connectDB();

  app.listen(PORT, () => {
    console.log(`app listening on ${PORT}`);
  });

  app.get("/health", (res: Response) => {
    res.send("Server is running");
  });
};

await startServer();
