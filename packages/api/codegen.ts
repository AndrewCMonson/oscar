import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:3005/graphql",
  generates: {
    "types/generated/graphql.ts": {
      plugins: [
        "typescript",
        "typescript-resolvers",
        "typescript-document-nodes",
      ],
      config: {
        useIndexSignature: true,
        contextType: "@api/types/index#MiddlewareContext",
      }
    },
  },
  config: {
    maybeValue: "T | undefined",
    mappers: {
      User: "@prisma/client/index.d#User as UserModel",
      Chat: "@prisma/client/index.d#Chat as ChatModel",
      Project: "@prisma/client/index.d#Project as ProjectModel",
      Task: "@prisma/client/index.d#Task as TaskModel",
      Message: "@prisma/client/index.d#Message as MessageModel",
    },
  },
};

export default config;
