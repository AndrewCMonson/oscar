import { gql } from "@apollo/client";

export const GetUserProjects = gql(`
  query user($auth0sub: String!){
    user(auth0sub: $auth0sub){
      projects{
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
  }
`);
