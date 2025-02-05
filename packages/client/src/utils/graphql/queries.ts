import { graphql } from "../../gql";

export const GetUser = graphql(`
  query user($auth0Sub: String!) {
    user(auth0Sub: $auth0Sub) {
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
      preferences {
        chatModel
        tone
        responseStyle
        preferredLanguage
        timezone
      }
    }
  }
`);

export const GetProjectsByUserId = graphql(`
  query GetProjectsByUserId($auth0Sub: String!) {
    getProjectsByUserId(auth0Sub: $auth0Sub) {
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

export const GetProject = graphql(`
  query getProject($projectId: ID!) {
    project(id: $projectId) {
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

export const GetRepositories = graphql(`
  query getRepositories {
    getRepositories {
      repositories {
        id
        name
        description
        url
        language
        isPrivate
        forks
        topics
        lastPush
        stars
        latestActivityDate
        latestActivityBranch
        projectId
      }
    }
  }
`);
