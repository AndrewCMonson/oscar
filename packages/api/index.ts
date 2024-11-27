import { ApolloServer, BaseContext } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import express, { Response } from "express";
import { connectDB } from "personal_assistant_api/src/config/index.js";
import { schema } from "personal_assistant_api/src/graphql/schema.js";
import { middlewareContext } from "personal_assistant_api/src/utils/index.js";

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
