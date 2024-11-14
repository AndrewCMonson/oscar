// import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./src/config";
import { router } from "./src/controllers/index.js";
import { ApolloServer, BaseContext } from '@apollo/server';
import { schema } from './src/graphql/schema';
import cors from "cors";

const PORT = process.env.PORT || 3005;

const startSever = async () => {
  const app = express();

  const server = new ApolloServer<BaseContext>({
    schema,
  });

  await server.start();
  
  app.use("/api", router);

  app.use(
    "/graphql",
    express.json(),
    express.urlencoded({ extended: true }),
    cors(),
  )

  connectDB();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}



startSever();

