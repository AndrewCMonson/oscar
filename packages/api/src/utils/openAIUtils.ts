import { z } from 'zod'

export const openAIStructuredOutput = z.object({
  role: z.string(),
  name: z.string(),
  content: z.string(),
  contextData: z.object({
    action: z.string(),
    actionName: z.string(),
    description: z.string(),
    metadata: z.object({
      status: z.string(),
      priority: z.string(),
      startDate: z.string(),
      endDate: z.string(),
      tags: z.array(z.string()),
    }),
  }),
})

