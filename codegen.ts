import { CodegenConfig } from "@graphql-codegen/cli";
import { } from "./packages/api/node_modules/@prisma/client/index.d";

const config: CodegenConfig = {
  schema: "http://localhost:3005/graphql",
  documents: ["./packages/client/src/**/*.{ts,tsx}"],
  overwrite: true,
  generates: {
    "./packages/types/src/__generatedTypes__/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
  config: {
    maybeValue: "T | undefined",
    mappers: {
      User: "./packages/api/node_modules/@prisma/client/index.d#User as UserModel",
      Project: "./packages/api/node_modules/@prisma/client/index.d#Project as ProjectModel",
      ProjectContext:
        "./packages/api/node_modules/@prisma/client/index.d#ProjectContext as ProjectContextModel",
      ProjectMetadata:
        "./packages/api/node_modules/@prisma/client/index.dProjectMetadata as ProjectMetadataModel",
      ProjectGoal: "./packages/api/node_modules/@prisma/client/index.d#ProjectGoal as ProjectGoalModel",
      ProjectPreferences:
        "./packages/api/node_modules/@prisma/client/index.d#ProjectPreferences as ProjectPreferencesModel",
      Assistant: "./packages/api/node_modules/@prisma/client/index.d#Assistant as AssistantModel",
      GlobalContext:
        "./packages/api/node_modules/@prisma/client/index.d#GlobalContext as GlobalContextModel",
      GlobalContextMessage:
        "./packages/api/node_modules/@prisma/client/index.d#GlobalContextMessage as GlobalContextMessageModel",
      Task: "./packages/api/node_modules/@prisma/client/index.d#Task as TaskModel",
      Message: "./packages/api/node_modules/@prisma/client/index.d#Message as MessageModel",
      UserPreferences:
        "./packages/api/node_modules/@prisma/client/index.d#UserPreferences as UserPreferencesModel",
      UserIntegration:
        "./packages/api/node_modules/@prisma/client/index.d#UserIntegration as UserIntegrationsModel",
      NotificationSettings:
        "./packages/api/node_modules/@prisma/client/index.d#NotificationSettings as NotificationSettingsModel",
      UserMemory: "./packages/api/node_modules/@prisma/client/index.d#UserMemory as UserMemoryModel",
      Memory: "./packages/api/node_modules/@prisma/client/index.d#Memory as MemoryModel",
      Conversation: "./packages/api/node_modules/@prisma/client/index.d#Conversation as ConversationModel",
      AssistantResponse:
        "./packages/api/node_modules/@prisma/client/index.d#AssistantResponse as AssistantResponseModel",
    },
  },
  ignoreNoDocuments: true,
};

export default config;
