import { prismadb } from "./db.js";
import { ChatGPTRole } from "@prisma/client";

export const seed = async () => {
  const user = await prismadb.user.create({
    data: {
      email: "andrew.c.monson@gmail.com",
      firstName: "Andrew",
      lastName: "Monson",
      username: "andrewmonson",
    },
  });
  const systemUser = await prismadb.user.create({
    data: {
      email: "test@test.com",
      username: "System",
      role: ChatGPTRole.SYSTEM,
    },
  });
  const assistantUser = await prismadb.user.create({
    data: {
      email: "assistant@test.com",
      username: "Assistant",
      role: ChatGPTRole.ASSISTANT,
    },
  });

  console.log(user);
  console.log(systemUser);
  console.log(assistantUser);
};

seed();
