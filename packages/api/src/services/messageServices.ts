import { OpenAI } from "openai";

// takes in a role, content and name and properly types it to be sent to the OpenAI API
export const formatMessageForOpenAI = async ({
  role,
  content,
  name,
  toolCallId,
}: {
  role: string;
  content: string;
  name: string;
  toolCallId?: string;
}) => {
  if (!role || !content || !name) {
    throw new Error("Please provide a role, content, and name for the message");
  }

  const formattedMessage: OpenAI.ChatCompletionMessageParam = {
    role: role,
    content: content,
    name: name,
    tool_call_id: toolCallId
  };

  return formattedMessage;
};
