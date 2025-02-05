import { prismadb } from "@api/src/config/db.js";
import { initialLLMPrompt } from "@api/src/utils/index.js";
import {
  ProjectPriority,
  ProjectStatus,
  ReportingFrequency,
  ResponseStyle,
  Tone
} from "@prisma/client";

export const seed = async (): Promise<void> => {
  try {
    const user = await prismadb.user.create({
      data: {
        auth0sub: "github|123456789",
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
    const project = await prismadb.project.create({
      data: {
        name: "CRM-ATS Application",
        description: "Full stack applicaiton for CRM/ATS system",
        userId: user.id,
        conversation: {
          create: {
            assistantId: assistant.id,
            userId: user.id,
            messages: {
              create: [
                {
                  userId: user.id,
                  name: "System",
                  content: "This project is called CRM-ATS Application",
                  role: "system",
                },
              ],
            },
          },
        },
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
            preferences: {
              create: {
                responseStyle: ResponseStyle.CONVERSATIONAL,
                reportingFrequency: ReportingFrequency.WEEKLY,
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
        timezone: "America/New York",
      },
    });

    console.log("Seeded project", project);
    console.log("Seeded user", user);
    console.log("Seeded assistant", assistant);
    console.log("Seeded userPreferences", userPreferences);
  } catch (e) {
    console.error(e);
    throw new Error("Error seeding the database");
  }
};

await seed();
