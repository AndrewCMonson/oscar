import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:3005/graphql",
  generates: {
    "../types/src/apiTypes/generated/graphql.ts": {
      plugins: [
        "typescript",
        "typescript-resolvers",
        "typescript-document-nodes",
      ],
      config: {
        useIndexSignature: true,
        contextType: "../index#MiddlewareContext",
      },
    },
  },
  config: {
    maybeValue: "T | undefined",
    mappers: {
      User: "@prisma#User as UserModel",
      Project: "@prisma#Project as ProjectModel",
      ProjectContext:
        "@prisma#ProjectContext as ProjectContextModel",
      ProjectMetadata:
        "@prisma#ProjectMetadata as ProjectMetadataModel",
      ProjectGoal: "@prisma#ProjectGoal as ProjectGoalModel",
      ProjectPreferences:
        "@prisma#ProjectPreferences as ProjectPreferencesModel",
      Assistant: "@prisma#Assistant as AssistantModel",
      GlobalContext:
        "@prisma#GlobalContext as GlobalContextModel",
      GlobalContextMessage:
        "@prisma#GlobalContextMessage as GlobalContextMessageModel",
      Task: "@prisma#Task as TaskModel",
      Message: "@prisma#Message as MessageModel",
      UserPreferences:
        "@prisma#UserPreferences as UserPreferencesModel",
      UserIntegration:
        "@prisma#UserIntegration as UserIntegrationsModel",
      NotificationSettings:
        "@prisma#NotificationSettings as NotificationSettingsModel",
      UserMemory: "@prisma#UserMemory as UserMemoryModel",
      Memory: "@prisma#Memory as MemoryModel",
      Conversation: "@prisma#Conversation as ConversationModel",
      AssistantResponse:
        "@prisma#AssistantResponse as AssistantResponseModel",
    },
  },
};

export default config;