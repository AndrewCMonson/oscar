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
      },
    },
  },
  config: {
    maybeValue: "T | undefined",
    mappers: {
      User: "@prisma/client/index.d#User as UserModel",
      Project: "@prisma/client/index.d#Project as ProjectModel",
      ProjectContext: "@prisma/client/index.d#ProjectContext as ProjectContextModel",
      ProjectMetadata: "@prisma/client/index.d#ProjectMetadata as ProjectMetadataModel",
      ProjectGoal: "@prisma/client/index.d#ProjectGoal as ProjectGoalModel",
      ProjectPreferences: "@prisma/client/index.d#ProjectPreferences as ProjectPreferencesModel",
      Assistant: "@prisma/client/index.d#Assistant as AssistantModel",
      GlobalContext: "@prisma/client/index.d#GlobalContext as GlobalContextModel",
      GlobalContextMessage: "@prisma/client/index.d#GlobalContextMessage as GlobalContextMessageModel",
      Task: "@prisma/client/index.d#Task as TaskModel",
      Message: "@prisma/client/index.d#Message as MessageModel",
      UserPreferences: "@prisma/client/index.d#UserPreferences as UserPreferencesModel",
      UserIntegration: "@prisma/client/index.d#UserIntegration as UserIntegrationsModel",
      NotificationSettings: "@prisma/client/index.d#NotificationSettings as NotificationSettingsModel",
      UserMemory: "@prisma/client/index.d#UserMemory as UserMemoryModel",
      Memory: "@prisma/client/index.d#Memory as MemoryModel",
      Conversation: "@prisma/client/index.d#Conversation as ConversationModel",
      AssistantResponse: "@prisma/client/index.d#AssistantResponse as AssistantResponseModel",

    },
  },
};

export default config;
