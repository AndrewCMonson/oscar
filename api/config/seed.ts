import { prismadb } from "./db.js";

export const seed = async () => {
  const user = await prismadb.user.create({
    data: {
      email: "andrew.c.monson@gmail.com",
      name: "Andrew_Monson",
    },
  });
  const systemUser = await prismadb.user.create({
    data: {
      email: "test@test.com",
      name: "System",
    },
  });
  const assistantUser = await prismadb.user.create({
    data: {
      email: "assistant@test.com",
      name: "Assistant",
    },
  });

  console.log(user);
  console.log(systemUser);
  console.log(assistantUser);
};

seed()