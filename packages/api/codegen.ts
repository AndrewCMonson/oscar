import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:3005/graphql",
  generates: {
    "./types/generated/graphql.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        useIndexSignature: true,
        contextType: "../types#MiddlewareContext",
      },
    },
  },
  config: {
    maybeValue: "T | undefined",
    mappers: {
      User: "@prisma/client#User as UserModel",
      Project: "@prisma/client#Project as ProjectModel",
      ProjectContext: "@prisma/client#ProjectContext as ProjectContextModel",
      ProjectMetadata: "@prisma/client#ProjectMetadata as ProjectMetadataModel",
      ProjectGoal: "@prisma/client#ProjectGoal as ProjectGoalModel",
      ProjectPreferences:
        "@prisma/client#ProjectPreferences as ProjectPreferencesModel",
      Assistant: "@prisma/client#Assistant as AssistantModel",
      GlobalContext: "@prisma/client#GlobalContext as GlobalContextModel",
      GlobalContextMessage:
        "@prisma/client#GlobalContextMessage as GlobalContextMessageModel",
      Task: "@prisma/client#Task as TaskModel",
      Message: "@prisma/client#Message as MessageModel",
      UserPreferences: "@prisma/client#UserPreferences as UserPreferencesModel",
      UserIntegration:
        "@prisma/client#UserIntegration as UserIntegrationsModel",
      NotificationSettings:
        "@prisma/client#NotificationSettings as NotificationSettingsModel",
      UserMemory: "@prisma/client#UserMemory as UserMemoryModel",
      Memory: "@prisma/client#Memory as MemoryModel",
      Conversation: "@prisma/client#Conversation as ConversationModel",
      AssistantResponse:
        "@prisma/client#AssistantResponse as AssistantResponseModel",
    },
  },
};

export default config;
