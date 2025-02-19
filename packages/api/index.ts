import { ApolloServer, BaseContext } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import express, { Response } from "express";
import { connectDB } from "./src/config/index.js";
import { schema } from "./src/graphql/schema.js";
import { middlewareContext } from "./src/utils/index.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3005;

const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
};
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
    cors(corsOptions),
    expressMiddleware(server, {
      context: middlewareContext,
    }),
  );

  await connectDB();

  app.listen(PORT, () => {
    console.log(`app listening on ${PORT}`);
  });

  app.get("/health", (_, res: Response) => {
    res.send("Server is running");
  });
};

await startServer();
