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
