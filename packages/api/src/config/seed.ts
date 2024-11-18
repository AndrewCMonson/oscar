import { prismadb } from "./db.js";
import { ChatGPTRole, ProjectType, TaskStatus, Prisma } from "@prisma/client";
import { initialLLMPrompt } from "../utils/index.js";

const userPreferences: Prisma.JsonObject = {
  "tone": "friendly",
  "responseStyle": "detailed",
  "integrations": {
    "jira": {
      "enabled": "true",
      "apiKey": "jira-api-token",
      "baseUrl": "https://jira.com",
    },
    "github": {
      "enabled": "true",
      "apiKey": "github-api-token",
      "baseUrl": "https://github.com",
    },
    "motion": {
      "enabled": true,
      "apiKey": "motion-api-token",
      "baseUrl": "https://motion.com",
    }
  },
};

const userMemory: Prisma.JsonObject = {
  "longTermMemory": {
    "personalDetails": {
      "name": "Andrew Monson",
      "favoriteTopics": ["React", "GraphQL", "TypeScript"],
    },
    "memories": [
      {
        "date": "2022-01-01",
        "note": "User prefers concise responses for work related projects"
      },
      {
        "date": "2023-01-01",
        "note": "User prefers detailed responses for personal projects"
      },
      {
        "date": "2024-01-01",
        "note": "User mentioned he is up for promotion"
      }
    ]
  },
    "notifications": true,
    "timeZone": "America/New York",
    "language": "en"
};

const projectContext: Prisma.JsonObject = {
  "metadata": {
    "name": "CRM-ATS Application",
    "description": "Full stack applicaiton for CRM/ATS system",
    "status": TaskStatus.IN_PROGRESS,
    "type": ProjectType.CLIENT
  },
  "goals": [
    "Create a user friendly CRM/ATS system",
    "Integrate with LinkedIn and Dice",
  ],
  "preferences": {
    "communicationStyle": "detailed",
    "preferredProjectManagementTool": "Jira",
    "reportingFrequency": "weekly",
  },
  "recentUpdates": [
    {
      "date": "2022-01-01",
      "note": "Created project overview document in Notion",
    },
    {
      "date": "2022-01-02",
      "note": "Created project timeline in Jira",
    },
  ]
};

export const seed = async () => {
  const user = await prismadb.user.create({
    data: {
      email: "andrew.c.monson@gmail.com",
      firstName: "Andrew",
      lastName: "Monson",
      username: "andrewmonson",
      userPreferences,
      userMemory,
    },
  });
  const project = await prismadb.project.create({
    data: {
      name: "CRM-ATS Application",
      description: "Full stack applicaiton for CRM/ATS system",
      userId: user.id,
      projectContext,  
    },
  });
  const assistant = await prismadb.assistant.create({
    data: {
      role: ChatGPTRole.ASSISTANT,
      globalContext: initialLLMPrompt,
      model: "gpt-4",
    },
  });

  console.log(project);
  console.log(user);
  console.log(assistant);
};

seed();
