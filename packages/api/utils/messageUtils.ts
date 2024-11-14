import { UserRole } from "@prisma/client";

export const convertEnums = (role: UserRole) => {
  switch (role) {
    case UserRole.USER:
      return "user";
    case UserRole.ASSISTANT:
      return "assistant";
    case UserRole.SYSTEM:
      return "system";
    case UserRole.FUNCTION:
      return "function";
    default:
      return "user";
  }
};
