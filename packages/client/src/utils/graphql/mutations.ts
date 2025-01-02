import { graphql } from "../../gql";

export const HandleConversationMessage = graphql(`
  mutation handleConversationMessage($message: String!, $projectId: String) {
    handleConversationMessage(message: $message, projectId: $projectId) {
      content
      role
      projectId
    }
  }
`);

export const UpdateUserPreferences = graphql(`
  mutation updateUserPreferences(
    $auth0sub: String!
    $preferences: UserPreferencesInput!
  ) {
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

export const CreateProject = graphql(`
  mutation createProject(
    $name: String!
    $description: String!
    $type: ProjectType!
  ) {
    createProject(name: $name, description: $description, type: $type) {
      id
      name
    }
  }
`);

export const DeleteProject = graphql(`
  mutation deleteProject($id: ID!) {
    deleteProject(id: $id)
  }
`);
