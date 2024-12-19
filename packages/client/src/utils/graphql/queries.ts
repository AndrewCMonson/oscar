import { gql } from "../../__generated__/gql";

export const GetUser = gql(`
  query GetUser($auth0Sub: String!){
    user(auth0Sub: $auth0Sub){
      id
      username
      email
      projects {
        id
        name
        conversation {
          id
          messages {
            id
            content
            role
            createdAt
            name
          }
        }
      }
    }
  }
`);

export const GetProjectsByUserId = gql(`
  query GetProjectsByUserId($auth0Sub: String!){
    getProjectsByUserId(auth0Sub: $auth0Sub){
      id
      name
      description
      type
      conversation {
        id
        messages {
          id
          content
          createdAt
          role
          user {
            id
            username
          }
        }
      }
    }
  }
`);

export const GetProject = gql(`
  query GetProject($projectId: ID!){
    project(id: $projectId){
      id
      name
      description
      type
      conversation {
        id
        messages {
          id
          content
          createdAt
          role
          user {
            id
            username
          }
        }
      }
    }
  }
`);
