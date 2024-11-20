import { PrismaClient } from "@prisma/client";

export const prismadb = new PrismaClient();


export const connectDB = async (): Promise<void> => {
  try {
    await prismadb.$connect();
    console.log("Connected to the Prisma ORM");
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
};
