import { gql } from "@apollo/client";

export const HandleConversationMessage = gql(`
  mutation handleConversationMessage($message: String!) {
  handleConversationMessage(message: $message) {
  content
    }
  }
`)