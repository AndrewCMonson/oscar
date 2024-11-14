import { ChatGPTRole } from "@prisma/client";

export const convertEnums = (role: ChatGPTRole) => {
  switch (role) {
    case ChatGPTRole.USER:
      return "user";
    case ChatGPTRole.ASSISTANT:
      return "assistant";
    case ChatGPTRole.SYSTEM:
      return "system";
    case ChatGPTRole.FUNCTION:
      return "function";
    default:
      return "user";
  }
};
