import { PrismaClient } from "@prisma/client";
import { AWSSecretsRetrieval } from "../services/AWS/secretsManager.js";
import { escapeForPrisma } from "../utils/escapePrismaPw.js";

const { username, password } = await AWSSecretsRetrieval();

const escapedPassword = escapeForPrisma(password);

export const prismadb = new PrismaClient({
  datasources: {
    db: {
      url: `postgresql://${username}:${escapedPassword}@linkedin-automation.czceykye0ffg.us-east-1.rds.amazonaws.com:5432/postgres?schema=public`,
    },
  }
});

export const connectDB = async (): Promise<void> => {
  try {
    await prismadb.$connect();
    console.log("Connected to the Prisma ORM");
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
};
