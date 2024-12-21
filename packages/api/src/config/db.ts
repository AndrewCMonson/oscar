import { PrismaClient } from "@prisma/client";
import { AWSSecretsRetrieval } from "../services/AWS/secretsManager.js";
import { escapeForPrisma } from "../utils/escapePrismaPw.js";

const { username, password } = await AWSSecretsRetrieval();

const escapedPassword = escapeForPrisma(password);

/**
 * An instance of PrismaClient configured to connect to a PostgreSQL database.
 * 
 * @constant
 * @type {PrismaClient}
 * @property {Object} datasources - Configuration for the database connection.
 * @property {Object} datasources.db - Database connection details.
 * @property {string} datasources.db.url - The connection URL for the PostgreSQL database, including username, password, host, port, and schema.
 */
export const prismadb = new PrismaClient({
  datasources: {
    db: {
      url: `postgresql://${username}:${escapedPassword}@${process.env.AWS_DATABASE_NAME}.us-east-1.rds.amazonaws.com:5432/postgres?schema=public`,
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
