import { prismadb } from "./db.js";
import {
  Tone,
  ResponseStyle,
  IntegrationType,
  ProjectStatus,
  ProjectPriority,
  ReportingFrequency,
} from "@prisma/client";
import { initialLLMPrompt } from "../utils/index.js";

export const seed = async () => {
  const user = await prismadb.user.create({
    data: {
      email: "andrew.c.monson@gmail.com",
      firstName: "Andrew",
      lastName: "Monson",
      username: "andrewmonson",
      notificationSettings: {
        create: {
          email: true,
          sms: false,
          inApp: false,
        },
      },
    },
  });
  const project = await prismadb.project.create({
    data: {
      name: "CRM-ATS Application",
      description: "Full stack applicaiton for CRM/ATS system",
      userId: user.id,
      projectContext: {
        create: {
          metadata: {
            create: {
              status: ProjectStatus.ACTIVE,
              startDate: new Date("2024-01-28"),
              endDate: new Date("2024-12-28"),
              priority: ProjectPriority.LOW,
            },
          },
          goals: {
            create: [
              {
                goal: "Create a user friendly CRM/ATS system",
              },
              {
                goal: "Integrate with LinkedIn and Dice",
              },
            ],
          },
          preferences: {
            create: {
              responseStyle: ResponseStyle.CONVERSATIONAL,
              reportingFrequency: ReportingFrequency.WEEKLY,
            },
          },
          updates: {
            create: [
              {
                content: "Created project overview document in Notion",
              },
              {
                content: "Created project timeline in Jira",
              },
            ],
          },
        },
      },
    },
  });
  const assistant = await prismadb.assistant.create({
    data: {
      role: "assistant",
      model: "gpt-4",
      globalContext: {
        create: {
          contextData: {
            create: {
              name: "system",
              content: initialLLMPrompt,
              role: "system",
            },
          },
        },
      },
    },
  });
  const userPreferences = await prismadb.userPreferences.create({
    data: {
      tone: Tone.CONCISE,
      responseStyle: ResponseStyle.CONVERSATIONAL,
      userId: user.id,
      timeZone: "America/New York",
      integrations: {
        create: {
          type: IntegrationType.JIRA,
          enabled: true,
          apiToken: "jira-api",
          baseUrl: "https://jira.com",
        },
      },
    },
  });
  const userMemory = await prismadb.userMemory.create({
    data: {
      userId: user.id,
      memories: {
        createMany: {
          data: [
            {
              note: "I need to finish the CRM/ATS project by the end of the year",
            },
            {
              note: "I have a meeting with the team on Monday to discuss the project timeline",
            },
          ],
        },
      },
    },
  });

  console.log(project);
  console.log(user);
  console.log(userMemory);
  console.log(assistant);
  console.log(userPreferences);
};

seed();
