import { gql } from "@apollo/client";

export const HandleConversationMessage = gql(`
  mutation handleConversationMessage($message: String!, $projectId: String!) {
  handleConversationMessage(message: $message, projectId: $projectId) {
  content
  role
    }
  }
`);
