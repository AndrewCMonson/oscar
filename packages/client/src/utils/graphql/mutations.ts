import { gql } from "@apollo/client";

export const HandleConversationMessage = gql(`
  mutation handleConversationMessage($message: String!, $projectId: String) {
  handleConversationMessage(message: $message, projectId: $projectId) {
  content
  role
  projectId
    }
  }
`);

export const UpdateUserPreferences = gql(`
  mutation updateUserPreferences($auth0sub: String!, $preferences: UserPreferencesInput!) {
  updateUserPreferences(auth0sub: $auth0sub, preferences: $preferences) {
      userId
      tone
      responseStyle
      preferredLanguage
      chatModel
      timezone
  }
  }
`);

export const CreateProject = gql(`
  mutation createProject($name: String!, $description: String!, $type: ProjectType!) {
  createProject(name: $name, description: $description, type: $type) {
  id
  name
    }
  }
`);

export const DeleteProject = gql(`
  mutation deleteProject($id: ID!) {
  deleteProject(id: $id) 
  }
`);
