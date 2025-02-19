import { AWSSecretsRetrieval } from "@api/src/services/AWS/secretsManager.js";
import { escapeForPrisma } from "@api/src/utils/escapePrismaPw.js";
import { PrismaClient } from "@prisma/client";

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
export const prismadb: PrismaClient = new PrismaClient({
  datasources: {
    db: {
      url: `postgresql://${username}:${escapedPassword}@${process.env.AWS_DB_ENDPOINT}:5432/postgres?schema=public`,
    },
  },
});

export const connectDB = async (): Promise<void> => {
  try {
    await prismadb.$connect();
    console.log("Connected to the Prisma ORM");
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
};
